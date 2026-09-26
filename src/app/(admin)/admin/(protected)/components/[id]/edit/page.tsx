"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getAdminComponent, getAdminComponents } from "@/lib/admin/components/queries";
import { BuilderProvider, ComponentBuilderState } from "@/components/admin/builder/BuilderContext";
import { BuilderShell } from "@/components/admin/builder/BuilderShell";

export default function EditComponentPage() {
  const params = useParams<{ id: string }>();
  const componentId = params?.id;
  
  const [initialState, setInitialState] = useState<Partial<ComponentBuilderState> | null>(null);
  const [existingIds, setExistingIds] = useState<Set<string>>(new Set());
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        if (!componentId) return;
        
        const [comp, allComps] = await Promise.all([
          getAdminComponent(componentId),
          getAdminComponents()
        ]);
        
        if (comp) {
          setInitialState({
            id: comp.id,
            title: comp.title || "",
            description: comp.description || "",
            registry_id: comp.registry_id || "",
            source_type: comp.source_type || "react",
            snippets: comp.snippets || { html: "", css: "", react: "" },
            schema_definition: comp.schema_definition || [],
            status: comp.status || "draft",
            currentStep: 1
          });
        }
        
        setExistingIds(new Set(allComps.filter((c: any) => c.id !== componentId).map((c: any) => c.registry_id)));
      } catch (err: any) {
        setError(err.message || "Failed to load component");
      }
    }
    load();
  }, [componentId]);

  if (error) {
    return <div className="p-8 text-red-500 bg-[#F6F7F8] h-full">{error}</div>;
  }

  if (!initialState) return <div className="flex-1 bg-[#F6F7F8]" />;

  return (
    <div className="flex flex-col h-full bg-[#F6F7F8]">
      {/* Header */}
      <header className="h-[63px] bg-white border-b border-[#E9EAEB] px-8 flex items-center shrink-0">
        <Link
          href="/admin/components"
          className="mr-4 text-[#888888] hover:text-[#111111] transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-bold text-[#111111]">Update {initialState.title || "Component"}</h1>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden relative">
        <BuilderProvider initialState={initialState}>
          <BuilderShell existingIds={existingIds} />
        </BuilderProvider>
      </div>
    </div>
  );
}
