"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type SourceType = "react" | "html_css" | "both";

export interface ComponentSnippets {
  html?: string;
  css?: string;
  react?: string;
}

export interface ComponentBuilderState {
  id?: string;
  title: string;
  description: string;
  registry_id: string;
  source_type: SourceType;
  snippets: ComponentSnippets;
  schema_definition: any[];
  currentStep: number;
  status: "draft" | "published" | "archived";
}

interface BuilderContextType {
  state: ComponentBuilderState;
  updateState: (updates: Partial<ComponentBuilderState>) => void;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
  isSaving: boolean;
  setIsSaving: (saving: boolean) => void;
}

const defaultState: ComponentBuilderState = {
  title: "",
  description: "",
  registry_id: "",
  source_type: "react",
  snippets: { html: "", css: "", react: "" },
  schema_definition: [],
  currentStep: 1,
  status: "draft"
};

const BuilderContext = createContext<BuilderContextType | null>(null);

export function BuilderProvider({ 
  children, 
  initialState 
}: { 
  children: ReactNode; 
  initialState?: Partial<ComponentBuilderState>;
}) {
  const [state, setState] = useState<ComponentBuilderState>({
    ...defaultState,
    ...initialState
  });
  const [isSaving, setIsSaving] = useState(false);

  const updateState = (updates: Partial<ComponentBuilderState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => updateState({ currentStep: Math.min(state.currentStep + 1, 5) });
  const prevStep = () => updateState({ currentStep: Math.max(state.currentStep - 1, 1) });
  const setStep = (step: number) => updateState({ currentStep: Math.max(1, Math.min(step, 5)) });

  return (
    <BuilderContext.Provider value={{ state, updateState, nextStep, prevStep, setStep, isSaving, setIsSaving }}>
      {children}
    </BuilderContext.Provider>
  );
}

export function useBuilder() {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error("useBuilder must be used within a BuilderProvider");
  }
  return context;
}
