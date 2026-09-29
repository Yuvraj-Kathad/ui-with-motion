"use client";

import React, { useState, useMemo } from "react";
import { useBuilder } from "../BuilderContext";
import { Search, BadgeCheck, ArrowLeftRight, ChevronDown, ArrowLeft, Plus } from "lucide-react";
import { detectProperties, DetectedProperty } from "@/lib/admin/components/parser";
import Editor from "@monaco-editor/react";

function getDefaultCustomizationType(prop: DetectedProperty): string {
  if (prop.variable.includes("color") || prop.variable.includes("bg") || prop.variable.includes("background")) return "color";
  if (prop.variable.includes("radius") || prop.variable.includes("size") || prop.variable.includes("padding") || prop.variable.includes("margin") || prop.variable.includes("width") || prop.variable.includes("height")) return "number";
  return "text";
}

function getDefaultDisplayLabel(prop: DetectedProperty) {
  return prop.label;
}

export function DetectElementsStep() {
  const { state, updateState } = useBuilder();
  const [searchQuery, setSearchQuery] = useState("");
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null);

  const detectedProperties = useMemo(() => {
    return detectProperties(state.source_type, state.snippets);
  }, [state.source_type, state.snippets]);

  const unboundProperties = useMemo(() => {
    return (state.schema_definition || []).filter((p: any) => p.source === "unbound");
  }, [state.schema_definition]);

  const allProperties = [...detectedProperties, ...unboundProperties];

  const filteredProperties = allProperties.filter((prop) =>
    prop.variable.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (prop.defaultValue || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getConfiguredProperty = (id: string) => {
    return state.schema_definition?.find((p: any) => p.id === id);
  };

  const toggleProperty = (prop: DetectedProperty | any) => {
    const existing = getConfiguredProperty(prop.id);
    if (existing) {
      updateState({
        schema_definition: state.schema_definition.filter((p: any) => p.id !== prop.id)
      });
    } else {
      updateState({
        schema_definition: [
          ...(state.schema_definition || []),
          {
            id: prop.id,
            variable: prop.variable,
            property: prop.property,
            type: getDefaultCustomizationType(prop),
            label: getDefaultDisplayLabel(prop),
            defaultValue: prop.defaultValue,
            source: prop.source
          }
        ]
      });
    }
  };

  const addUnboundProperty = () => {
    const id = "--custom-var-" + Date.now();
    updateState({
      schema_definition: [
        ...(state.schema_definition || []),
        {
          id,
          variable: id,
          property: id,
          type: "text",
          label: "Custom Property",
          defaultValue: "",
          source: "unbound"
        }
      ]
    });
    setEditingPropertyId(id);
  };

  const updateEditingProperty = (updates: any) => {
    if (!editingPropertyId) return;
    updateState({
      schema_definition: state.schema_definition.map((p: any) => 
        p.id === editingPropertyId ? { ...p, ...updates } : p
      )
    });
  };

  const editingPropertyRaw = allProperties.find(p => p.id === editingPropertyId);
  const editingPropertyConfigured = getConfiguredProperty(editingPropertyId || "");

  const displayCode = state.source_type === "react" 
    ? state.snippets.react 
    : (state.snippets.html || "") + "\n\n<style>\n" + (state.snippets.css || "") + "\n</style>";

  return (
    <div className="flex-1 flex items-start gap-6 p-8 min-h-0 overflow-hidden w-full">
      
      {/* Left Panel: Code Viewer */}
      <div className="flex-1 h-full bg-white border border-[#D7DADC] rounded-xl flex flex-col overflow-hidden">
        <div className="p-6 pb-4 shrink-0">
          <h3 className="font-semibold text-[16px] text-[#626467]">code</h3>
        </div>
        <div className="flex-1 p-6 pt-0 min-h-0">
          <div className="h-full rounded-lg overflow-hidden border border-[#E9EAEB]">
            <Editor
              height="100%"
              language={state.source_type === "react" ? "typescript" : "html"}
              theme="vs-dark"
              value={displayCode || ""}
              options={{
                readOnly: true,
                minimap: { enabled: false },
                fontSize: 13,
                fontFamily: "'IBM Plex Mono', monospace",
                scrollBeyondLastLine: false,
                padding: { top: 16, bottom: 16 },
                wordWrap: "on",
              }}
            />
          </div>
        </div>
      </div>

      {/* Right Panel: Detected Elements OR Connect Element */}
      <div className="flex-1 h-full bg-white border border-[#D7DADC] rounded-xl flex flex-col overflow-hidden">
        
        {!editingPropertyRaw || !editingPropertyConfigured ? (
          <>
            <div className="p-6 shrink-0 flex flex-col gap-1">
              <h2 className="font-semibold text-[18px] text-[#1F2123]">Configurable Elements</h2>
              <p className="text-[14px] text-[#626467]">
                Connect detected properties or add manual ones.
              </p>
            </div>

            <div className="px-6 pb-4 shrink-0">
              <div className="flex items-center gap-3 px-4 py-3 bg-white border border-[#D7DADC] rounded-lg">
                <Search className="w-5 h-5 text-[#626467]" />
                <input
                  type="text"
                  placeholder="Search elements..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 outline-none bg-transparent text-[14px] text-[#1F2123] placeholder-[#626467]"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-6">
              <div className="flex flex-col gap-2.5">
                {filteredProperties.map((prop) => {
                  const configured = getConfiguredProperty(prop.id);
                  const isConnected = !!configured;
                  const isUnbound = prop.source === "unbound";

                  return (
                    <div 
                      key={prop.id}
                      className="bg-white border border-[#D7DADC] rounded-lg px-4 py-3 flex items-center justify-between w-full"
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="flex flex-col gap-1 min-w-0">
                          <p className="font-['IBM_Plex_Mono',monospace] font-semibold text-[#1F2123] text-[14px] truncate">
                            {prop.variable}
                          </p>
                          {isUnbound && (
                            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 self-start">
                              Unbound
                            </span>
                          )}
                        </div>
                        
                        {isConnected ? (
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <div className="bg-[#F7F9FB] px-2 py-0.5 rounded text-[#626467] text-[13px] shrink-0 capitalize">
                              {configured.type}
                            </div>
                            <p className="font-medium text-[#1F2123] text-[14px] truncate">
                              {configured.label}
                            </p>
                          </div>
                        ) : (
                          <p className="italic text-[#7D7F82] text-[14px]">
                            Not configured
                          </p>
                        )}
                      </div>

                      <div className="flex items-center shrink-0 ml-4">
                        {isConnected ? (
                          <div 
                            className="flex items-center gap-2 cursor-pointer hover:opacity-80"
                            onClick={() => setEditingPropertyId(prop.id)}
                          >
                            <BadgeCheck className="w-[24px] h-[24px] text-[#00963D]" strokeWidth={1.5} />
                            <p className="font-medium text-[#00963D] text-[14px]">Connected</p>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5">
                              <div className="w-1.5 h-1.5 bg-[#626467] rounded-full" />
                              <p className="text-[#626467] text-[14px]">Not connected</p>
                            </div>
                            <button 
                              onClick={() => {
                                toggleProperty(prop);
                                setEditingPropertyId(prop.id);
                              }}
                              className="bg-[#EEF1F4] px-3 py-1 rounded-md font-semibold text-[#1F2123] text-[13px] hover:bg-[#e2e6ea] transition-colors"
                            >
                              Connect
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                <button
                  onClick={addUnboundProperty}
                  className="mt-2 flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-[#D7DADC] rounded-lg text-[#626467] hover:border-[#1F2123] hover:text-[#1F2123] transition-colors font-medium text-[14px]"
                >
                  <Plus className="w-4 h-4" />
                  Add Manual Property
                </button>
              </div>
            </div>
            
            <div className="p-6 shrink-0 border-t border-[#E9EAEB] flex items-center justify-between">
              <span className="font-semibold text-[14px] text-[#626467]">
                {state.schema_definition?.length || 0} connected
              </span>
            </div>
          </>
        ) : (
          /* Connect Element Configuration View */
          <div className="flex flex-col h-full overflow-y-auto">
            <div className="p-8 flex flex-col gap-6">
              
              {/* Top Section */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setEditingPropertyId(null)}
                    className="p-1 hover:bg-[#F7F9FB] rounded-md transition-colors -ml-1 text-[#626467]"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <p className="font-semibold text-[#1F2123] text-[18px]">
                    Configure Element
                  </p>
                </div>
                
                <div className="bg-[#1F2123] rounded-lg p-3 flex justify-between items-center">
                  <div className="flex flex-col gap-1 min-w-0">
                    <p className="font-['IBM_Plex_Mono',monospace] text-white text-[14px] truncate">
                      {editingPropertyRaw.variable}
                    </p>
                    {editingPropertyRaw.source === "unbound" && (
                      <span className="text-[11px] font-medium text-orange-400">
                        Unbound property
                      </span>
                    )}
                  </div>
                  <button 
                    onClick={() => {
                       toggleProperty(editingPropertyRaw);
                       setEditingPropertyId(null);
                    }}
                    className="text-[#F87171] hover:text-[#EF4444] text-[13px] font-medium shrink-0 ml-4 transition-colors"
                  >
                    Disconnect
                  </button>
                </div>
              </div>

              {/* Form Section */}
              <div className="flex flex-col gap-5 w-full">
                
                {editingPropertyRaw.source === "unbound" && (
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-[#626467] text-[14px]">
                      CSS Variable Name
                    </label>
                    <input 
                      type="text" 
                      value={editingPropertyConfigured.variable}
                      onChange={(e) => updateEditingProperty({ variable: e.target.value, id: e.target.value })}
                      className="bg-white border border-[#D7DADC] rounded-lg px-4 py-3 outline-none text-[#1F2123] text-[14px] font-['IBM_Plex_Mono',monospace]"
                      placeholder="--custom-var"
                    />
                  </div>
                )}

                <div className="flex flex-col gap-2 relative">
                  <label className="font-semibold text-[#626467] text-[14px]">
                    Customization Type
                  </label>
                  <div className="relative">
                    <select
                      value={editingPropertyConfigured.type}
                      onChange={(e) => updateEditingProperty({ type: e.target.value })}
                      className="bg-white border border-[#D7DADC] rounded-lg px-4 py-3 w-full outline-none text-[#1F2123] text-[14px] appearance-none cursor-pointer"
                    >
                      <option value="color">Color</option>
                      <option value="number">Number</option>
                      <option value="text">Text</option>
                      <option value="select">Select</option>
                      <option value="boolean">Boolean</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <ChevronDown className="w-4 h-4 text-[#1F2123]" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-[#626467] text-[14px]">
                    Display Label
                  </label>
                  <input 
                    type="text" 
                    value={editingPropertyConfigured.label}
                    onChange={(e) => updateEditingProperty({ label: e.target.value })}
                    className="bg-white border border-[#D7DADC] rounded-lg px-4 py-3 outline-none text-[#1F2123] text-[14px] w-full"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-[#626467] text-[14px]">
                    Semantic CSS Mapping (Optional)
                  </label>
                  <input 
                    type="text" 
                    value={editingPropertyConfigured.property || ""}
                    onChange={(e) => updateEditingProperty({ property: e.target.value })}
                    className="bg-white border border-[#D7DADC] rounded-lg px-4 py-3 outline-none text-[#1F2123] text-[14px] w-full font-['IBM_Plex_Mono',monospace]"
                    placeholder="e.g. background-color"
                  />
                </div>

                {editingPropertyConfigured.type === "select" && (
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-[#626467] text-[14px]">
                      Options (comma separated)
                    </label>
                    <input 
                      type="text" 
                      value={(editingPropertyConfigured.options || []).join(", ")}
                      onChange={(e) => updateEditingProperty({ options: e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean) })}
                      className="bg-white border border-[#D7DADC] rounded-lg px-4 py-3 outline-none text-[#1F2123] text-[14px] w-full"
                      placeholder="option1, option2, option3"
                    />
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-[#626467] text-[14px]">
                    Default Value
                  </label>
                  <div className="bg-white border border-[#D7DADC] rounded-lg px-4 py-3 flex items-center gap-2">
                    {editingPropertyConfigured.type === "color" && (
                      <div className="relative shrink-0 flex">
                        <input
                          type="color"
                          value={editingPropertyConfigured.defaultValue?.startsWith('#') ? editingPropertyConfigured.defaultValue.slice(0, 7) : '#000000'}
                          onChange={(e) => updateEditingProperty({ defaultValue: e.target.value })}
                          className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                        />
                        <div 
                          className="w-4 h-4 rounded-[2px] border border-[#D7DADC] pointer-events-none" 
                          style={{ backgroundColor: editingPropertyConfigured.defaultValue?.startsWith('#') ? editingPropertyConfigured.defaultValue : '#000000' }} 
                        />
                      </div>
                    )}
                    <input
                      type="text"
                      value={editingPropertyConfigured.defaultValue}
                      onChange={(e) => updateEditingProperty({ defaultValue: e.target.value })}
                      className="font-['IBM_Plex_Mono',monospace] text-[#1F2123] text-[14px] outline-none flex-1 min-w-0 bg-transparent"
                    />
                  </div>
                </div>

                {editingPropertyRaw.source === "unbound" && (
                  <p className="italic text-[#626467] text-[13px] mt-1 bg-[#F7F9FB] p-3 rounded-lg border border-[#E9EAEB]">
                    * This is a manual property. Changing it will only affect the component if its source explicitly references <code className="font-semibold">{editingPropertyConfigured.variable}</code>. It will not silently rewrite the source code.
                  </p>
                )}

              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
