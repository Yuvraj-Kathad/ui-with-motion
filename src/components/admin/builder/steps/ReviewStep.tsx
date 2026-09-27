"use client";

import React, { useState, useMemo } from "react";
import { useBuilder } from "../BuilderContext";
import { LivePreviewIframe } from "../../preview/LivePreviewIframe";
import { applyModifications } from "@/lib/admin/components/parser";

export function ReviewStep() {
  const { state } = useBuilder();
  const [overrides, setOverrides] = useState<Record<string, string>>({});

  // Combine default schema values with any user overrides during review
  const liveSchema = useMemo(() => {
    return (state.schema_definition || []).map((config: any) => ({
      ...config,
      defaultValue: overrides[config.id] !== undefined ? overrides[config.id] : config.defaultValue
    }));
  }, [state.schema_definition, overrides]);

  // Apply real-time modifications so the preview reflects changes
  const liveSnippets = useMemo(() => {
    return applyModifications(state.snippets, state.source_type, liveSchema);
  }, [state.snippets, state.source_type, liveSchema]);

  return (
    <div className="flex-1 flex items-start gap-6 p-8 min-h-0 overflow-hidden w-full">
      
      {/* Left Panel: Configuration Fields */}
      <div className="flex-1 max-w-[400px] h-full bg-white border border-[#D7DADC] rounded-xl flex flex-col overflow-hidden">
        <div className="p-6 pb-4 shrink-0 border-b border-[#E9EAEB]">
          <h2 className="font-semibold text-[18px] text-[#1F2123]">Component Properties</h2>
          <p className="text-[14px] text-[#626467]">
            Test your configurable properties below
          </p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
          {(state.schema_definition || []).length === 0 ? (
            <div className="text-center text-[#626467] text-[14px]">
              No properties configured. Go back to Step 2 to connect elements.
            </div>
          ) : (
            (state.schema_definition || []).map((config: any) => (
              <div key={config.id} className="flex flex-col gap-2">
                <label className="font-semibold text-[#1F2123] text-[14px]">
                  {config.label}
                </label>
                
                {config.type === "Color Picker" ? (
                  (() => {
                    let rawVal = overrides[config.id] !== undefined ? overrides[config.id] : config.defaultValue;
                    // Strip brackets/prefixes so color picker works correctly even with stale state
                    let hexVal = rawVal;
                    if (hexVal.startsWith('[')) hexVal = hexVal.slice(1, -1);
                    if (hexVal.includes('#')) hexVal = '#' + hexVal.split('#')[1].replace(/\]/g, '');
                    hexVal = hexVal.slice(0, 7) || "#000000";

                    return (
                      <div className="bg-white border border-[#D7DADC] rounded-lg px-4 py-2 flex items-center gap-2 focus-within:border-[#1F2123] transition-colors">
                        <div className="relative shrink-0 flex">
                          <input
                            type="color"
                            value={hexVal.startsWith('#') ? hexVal : '#000000'}
                            onChange={(e) => setOverrides(prev => ({ ...prev, [config.id]: e.target.value }))}
                            className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                          />
                          <div 
                            className="w-5 h-5 rounded-[4px] border border-[#D7DADC] pointer-events-none" 
                            style={{ backgroundColor: hexVal.startsWith('#') ? hexVal : '#000000' }} 
                          />
                        </div>
                        <input
                          type="text"
                          value={rawVal}
                          onChange={(e) => setOverrides(prev => ({ ...prev, [config.id]: e.target.value }))}
                          className="font-['IBM_Plex_Mono',monospace] text-[#1F2123] text-[14px] outline-none flex-1 min-w-0 bg-transparent"
                        />
                      </div>
                    );
                  })()
                ) : config.type === "Slider" ? (
                  (() => {
                    let rawVal = overrides[config.id] !== undefined ? overrides[config.id] : config.defaultValue;
                    let numVal = parseInt(String(rawVal).replace(/[^0-9-]/g, '')) || 0;
                    return (
                      <div className="flex items-center gap-4">
                        <input 
                          type="range"
                          min="0"
                          max="100"
                          value={numVal}
                          onChange={(e) => setOverrides(prev => ({ ...prev, [config.id]: `${e.target.value}px` }))}
                          className="flex-1 accent-[#1F2123]"
                        />
                        <span className="font-['IBM_Plex_Mono',monospace] text-[#1F2123] text-[14px] w-12 text-right">
                          {rawVal}
                        </span>
                      </div>
                    );
                  })()
                ) : (
                  <input 
                    type="text" 
                    value={overrides[config.id] !== undefined ? overrides[config.id] : config.defaultValue}
                    onChange={(e) => setOverrides(prev => ({ ...prev, [config.id]: e.target.value }))}
                    className="bg-white border border-[#D7DADC] rounded-lg px-4 py-2 outline-none text-[#1F2123] text-[14px] focus:border-[#1F2123] transition-colors w-full font-['IBM_Plex_Mono',monospace]"
                  />
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right Panel: Live Preview */}
      <div className="flex-1 h-full bg-[#FAFAFA] border border-[#D7DADC] rounded-xl flex flex-col overflow-hidden relative">
        <LivePreviewIframe 
          sourceType={state.source_type} 
          snippets={liveSnippets} 
          className="w-full h-full border-none"
        />
      </div>

    </div>
  );
}
