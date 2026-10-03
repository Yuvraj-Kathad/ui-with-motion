"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { createClient } from "@/lib/supabase/browser";

type CustomizationContextType = {
  getOverrides: (componentId: string) => Record<string, string>;
  setOverrides: (componentId: string, overrides: Record<string, string>) => void;
  saveOverrides: (componentId: string, overrides: Record<string, string>) => void;
};

const CustomizationContext = createContext<CustomizationContextType>({
  getOverrides: () => ({}),
  setOverrides: () => {},
  saveOverrides: () => {},
});

export function CustomizationProvider({ children }: { children: React.ReactNode }) {
  const [overridesState, setOverridesState] = useState<Record<string, Record<string, string>>>({});
  const supabase = createClient();
  const [userId, setUserId] = useState<string | null>(null);
  
  // Track previous to prevent redundant DB writes
  const previousDbState = useRef<Record<string, Record<string, string>>>({});

  // Load from DB if signed in
  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        const { data } = await supabase.from("user_component_customizations").select("component_id, overrides");
        if (data) {
          const loaded: Record<string, Record<string, string>> = {};
          data.forEach(item => {
            loaded[item.component_id] = item.overrides as Record<string, string>;
          });
          setOverridesState(loaded);
          previousDbState.current = JSON.parse(JSON.stringify(loaded));
        }
      }
    }
    init();
    
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === "SIGNED_IN" || event === "INITIAL_SESSION") {
            if (session?.user?.id !== userId) {
              init();
            }
        } else if (event === "SIGNED_OUT") {
            setUserId(null);
            setOverridesState({});
            previousDbState.current = {};
        }
    });
    
    return () => {
        authListener.subscription.unsubscribe();
    }
  }, [supabase, userId]);

  const getOverrides = useCallback((componentId: string) => {
    return overridesState[componentId] || {};
  }, [overridesState]);

  const setOverridesAction = useCallback((componentId: string, overrides: Record<string, string>) => {
    setOverridesState(prev => ({ ...prev, [componentId]: overrides }));
  }, []);

  const saveOverridesAction = useCallback(async (componentId: string, overrides: Record<string, string>) => {
    setOverridesState(prev => ({ ...prev, [componentId]: overrides }));
    
    if (userId) {
      const prevString = JSON.stringify(previousDbState.current[componentId] || {});
      const newString = JSON.stringify(overrides);
      if (prevString === newString) return; // Unchanged
      
      previousDbState.current[componentId] = JSON.parse(newString);
      
      if (Object.keys(overrides).length === 0) {
        await supabase.from("user_component_customizations").delete().eq("component_id", componentId).eq("user_id", userId);
      } else {
        await supabase.from("user_component_customizations").upsert({
          user_id: userId,
          component_id: componentId,
          overrides: overrides
        });
      }
    }
  }, [userId, supabase]);

  return (
    <CustomizationContext.Provider value={{ getOverrides, setOverrides: setOverridesAction, saveOverrides: saveOverridesAction }}>
      {children}
    </CustomizationContext.Provider>
  );
}

export function useCustomization() {
  return useContext(CustomizationContext);
}
