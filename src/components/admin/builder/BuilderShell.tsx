"use client";

import React, { useState } from "react";
import { useBuilder } from "./BuilderContext";
import { StepIndicator } from "./StepIndicator";
import { UploadCodeStep } from "./steps/UploadCodeStep";
import { createComponent, updateComponent } from "@/lib/admin/components/mutations";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export function BuilderShell({ existingIds }: { existingIds: Set<string> }) {
  const { state, updateState, nextStep, isSaving, setIsSaving } = useBuilder();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSaveDraft = async (proceedToNext: boolean) => {
    if (!state.title.trim()) {
      setError("Component Name is required.");
      return;
    }
    if (!state.registry_id.trim()) {
      setError("Registry ID is required.");
      return;
    }
    if (!state.id && existingIds.has(state.registry_id)) {
      setError(`A component with registry ID "${state.registry_id}" already exists.`);
      return;
    }

    setError(null);
    setIsSaving(true);
    
    try {
      if (state.id) {
        // Update
        await updateComponent(state.id, {
          title: state.title,
          description: state.description,
          registry_id: state.registry_id,
          source_type: state.source_type,
          snippets: state.snippets,
          schema_definition: state.schema_definition,
          status: "draft"
        });
        if (proceedToNext) nextStep();
      } else {
        // Create
        const result = await createComponent({
          title: state.title,
          description: state.description,
          registry_id: state.registry_id,
          source_type: state.source_type,
          snippets: state.snippets,
          schema_definition: state.schema_definition,
          status: "draft",
          type: "component",
          order: 0
        });
        
        updateState({ id: result.id });
        if (proceedToNext) {
          nextStep();
        }
        router.push(`/admin/components/${result.id}/edit`);
      }
    } catch (err: any) {
      setError(err.message || "Failed to save draft.");
    } finally {
      setIsSaving(false);
    }
  };

  const renderStep = () => {
    switch (state.currentStep) {
      case 1:
        return <UploadCodeStep />;
      case 2:
      case 3:
      case 4:
      case 5:
        return (
          <div className="flex-1 flex items-center justify-center p-8 overflow-hidden h-full">
            <div className="text-center p-8 bg-white border border-[#E9EAEB] rounded-2xl">
              <h2 className="text-xl font-bold text-[#111111] mb-2">Step {state.currentStep} (Coming Soon)</h2>
              <p className="text-[#888888] mb-6">This step is not yet implemented.</p>
              <button 
                onClick={() => updateState({ currentStep: 1 })}
                className="px-6 py-2.5 bg-white border border-[#E9EAEB] rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Back to Step 1
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F6F7F8]">
      <StepIndicator />
      
      {error && (
        <div className="mx-8 mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700">×</button>
        </div>
      )}

      {renderStep()}

      {/* Footer Controls */}
      <div className="h-[72px] bg-white border-t border-[#E9EAEB] px-8 flex items-center justify-between shrink-0">
        <div className="flex gap-3">
          <button
            onClick={() => handleSaveDraft(false)}
            disabled={isSaving}
            className="px-6 py-2.5 rounded-lg border border-[#E9EAEB] text-[#111111] font-medium text-sm hover:bg-gray-50 disabled:opacity-50 transition-colors flex items-center gap-2"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Draft"}
          </button>
        </div>
        
        <button
          onClick={() => handleSaveDraft(true)}
          disabled={isSaving || state.currentStep > 1}
          className="px-6 py-2.5 rounded-lg bg-[#111111] text-white font-medium text-sm hover:bg-black/90 disabled:opacity-50 transition-colors flex items-center gap-2"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save & Continue"}
        </button>
      </div>
    </div>
  );
}
