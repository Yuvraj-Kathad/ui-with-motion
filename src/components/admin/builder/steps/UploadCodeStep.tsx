"use client";

import React, { useState } from "react";
import { useBuilder } from "../BuilderContext";
import { Code, LayoutTemplate, Box, ChevronDown } from "lucide-react";

export function UploadCodeStep() {
  const { state, updateState } = useBuilder();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [activeTab, setActiveTab] = useState<"react" | "html" | "css">("react");
  const [isRegistryIdDirty, setIsRegistryIdDirty] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    
    if (!isRegistryIdDirty) {
      const generatedId = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      updateState({ 
        title: newTitle,
        registry_id: generatedId
      });
    } else {
      updateState({ title: newTitle });
    }
  };

  const handleRegistryIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsRegistryIdDirty(true);
    updateState({ registry_id: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') });
  };

  const handleSnippetChange = (type: "react" | "html" | "css", value: string) => {
    updateState({
      snippets: {
        ...state.snippets,
        [type]: value
      }
    });
  };

  return (
    <div className="flex-1 flex gap-8 p-8 overflow-hidden h-full">
      {/* Configuration Panel */}
      <div className="flex-1 max-w-2xl bg-white border border-[#E9EAEB] rounded-2xl p-6 overflow-y-auto flex flex-col gap-6">
        <div>
          <h2 className="text-xl font-bold text-[#111111] mb-1">Component Details</h2>
          <p className="text-sm text-[#888888]">Define the core information and upload the source code.</p>
        </div>

        {/* Basic Info */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-[#111111] mb-1.5">Component Name *</label>
            <input
              type="text"
              value={state.title}
              onChange={handleTitleChange}
              placeholder="e.g., Delete Button"
              className="w-full h-10 px-3 rounded-lg border border-[#E9EAEB] focus:border-[#111111] focus:ring-1 focus:ring-[#111111] outline-none transition-shadow text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#111111] mb-1.5">Description</label>
            <textarea
              value={state.description}
              onChange={(e) => updateState({ description: e.target.value })}
              placeholder="Briefly describe what this component does..."
              className="w-full h-20 p-3 rounded-lg border border-[#E9EAEB] focus:border-[#111111] focus:ring-1 focus:ring-[#111111] outline-none transition-shadow text-sm resize-none"
            />
          </div>
        </div>

        {/* Source Type */}
        <div className="pt-4 border-t border-[#E9EAEB]">
          <label className="block text-sm font-medium text-[#111111] mb-3">Source Type</label>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => updateState({ source_type: "react" })}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-colors ${state.source_type === "react" ? "border-[#111111] bg-[#fafafa]" : "border-[#E9EAEB] hover:border-[#d0d0d0]"}`}
            >
              <Box className={`w-6 h-6 ${state.source_type === "react" ? "text-[#111111]" : "text-[#888888]"}`} />
              <span className={`text-sm font-medium ${state.source_type === "react" ? "text-[#111111]" : "text-[#888888]"}`}>React / Next.js</span>
            </button>
            <button
              onClick={() => updateState({ source_type: "html_css" })}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-colors ${state.source_type === "html_css" ? "border-[#111111] bg-[#fafafa]" : "border-[#E9EAEB] hover:border-[#d0d0d0]"}`}
            >
              <LayoutTemplate className={`w-6 h-6 ${state.source_type === "html_css" ? "text-[#111111]" : "text-[#888888]"}`} />
              <span className={`text-sm font-medium ${state.source_type === "html_css" ? "text-[#111111]" : "text-[#888888]"}`}>HTML / CSS</span>
            </button>
            <button
              onClick={() => updateState({ source_type: "both" })}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-colors ${state.source_type === "both" ? "border-[#111111] bg-[#fafafa]" : "border-[#E9EAEB] hover:border-[#d0d0d0]"}`}
            >
              <Code className={`w-6 h-6 ${state.source_type === "both" ? "text-[#111111]" : "text-[#888888]"}`} />
              <span className={`text-sm font-medium ${state.source_type === "both" ? "text-[#111111]" : "text-[#888888]"}`}>Both</span>
            </button>
          </div>
        </div>

        {/* Code Editor */}
        <div className="pt-4 border-t border-[#E9EAEB] flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-3">
            <label className="block text-sm font-medium text-[#111111]">Source Code</label>
          </div>
          <div className="flex gap-1 mb-2">
            {(state.source_type === "react" || state.source_type === "both") && (
              <button 
                onClick={() => setActiveTab("react")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md ${activeTab === "react" ? "bg-[#111111] text-white" : "bg-[#f4f4f5] text-[#888888] hover:bg-[#e4e4e7]"}`}
              >
                React
              </button>
            )}
            {(state.source_type === "html_css" || state.source_type === "both") && (
              <>
                <button 
                  onClick={() => setActiveTab("html")}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md ${activeTab === "html" ? "bg-[#111111] text-white" : "bg-[#f4f4f5] text-[#888888] hover:bg-[#e4e4e7]"}`}
                >
                  HTML
                </button>
                <button 
                  onClick={() => setActiveTab("css")}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md ${activeTab === "css" ? "bg-[#111111] text-white" : "bg-[#f4f4f5] text-[#888888] hover:bg-[#e4e4e7]"}`}
                >
                  CSS
                </button>
              </>
            )}
          </div>
          
          <textarea
            value={state.snippets[activeTab] || ""}
            onChange={(e) => handleSnippetChange(activeTab, e.target.value)}
            placeholder={`Paste your ${activeTab.toUpperCase()} code here...`}
            className="w-full flex-1 min-h-[250px] p-4 rounded-xl border border-[#E9EAEB] bg-[#FAFAFA] font-mono text-[13px] text-[#333333] focus:border-[#111111] focus:ring-1 focus:ring-[#111111] outline-none transition-shadow resize-none"
            spellCheck={false}
          />
        </div>

        {/* Advanced Settings */}
        <div className="pt-4 border-t border-[#E9EAEB]">
          <button 
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 text-sm font-medium text-[#888888] hover:text-[#111111] transition-colors"
          >
            <ChevronDown className={`w-4 h-4 transition-transform ${showAdvanced ? "rotate-180" : ""}`} />
            Advanced Settings
          </button>
          
          {showAdvanced && (
            <div className="mt-4 p-4 rounded-xl bg-[#F6F7F8] border border-[#E9EAEB]">
              <label className="block text-sm font-medium text-[#111111] mb-1.5">Registry ID</label>
              <p className="text-xs text-[#888888] mb-3">The unique technical identifier used to map this record to the codebase registry.</p>
              <input
                type="text"
                value={state.registry_id}
                onChange={handleRegistryIdChange}
                placeholder="e.g., my-component"
                className="w-full h-10 px-3 rounded-lg border border-[#E9EAEB] font-mono text-sm focus:border-[#111111] focus:ring-1 focus:ring-[#111111] outline-none transition-shadow bg-white"
              />
            </div>
          )}
        </div>
      </div>

      {/* Preview Panel */}
      <div className="flex-1 bg-white border border-[#E9EAEB] rounded-2xl p-6 flex flex-col">
        <h2 className="text-xl font-bold text-[#111111] mb-1">Safe Preview</h2>
        <p className="text-sm text-[#888888] mb-6">Visual representation of your uploaded code.</p>
        
        <div className="flex-1 bg-[#F9F9F9] rounded-xl border border-[#E9EAEB] overflow-hidden flex items-center justify-center relative p-8">
          {state.source_type === "react" ? (
            <div className="text-center max-w-sm px-6 py-8 bg-white border border-[#E9EAEB] rounded-xl shadow-sm">
              <Box className="w-8 h-8 text-[#888888] mx-auto mb-3" />
              <p className="text-sm font-medium text-[#111111] mb-1">React Preview Unavailable</p>
              <p className="text-xs text-[#888888]">React preview becomes available when a trusted registry renderer is connected.</p>
            </div>
          ) : (state.snippets.html || state.snippets.css) ? (
            <iframe 
              srcDoc={`
                <!DOCTYPE html>
                <html>
                  <head>
                    <style>
                      body { display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: transparent; font-family: sans-serif; }
                      ${state.snippets.css || ""}
                    </style>
                  </head>
                  <body>
                    ${state.snippets.html || ""}
                  </body>
                </html>
              `}
              className="w-full h-full border-none bg-transparent"
              sandbox="allow-scripts"
              title="HTML/CSS Preview"
            />
          ) : (
            <p className="text-[#888888] text-sm">Upload HTML/CSS code to see preview</p>
          )}
        </div>
      </div>
    </div>
  );
}
