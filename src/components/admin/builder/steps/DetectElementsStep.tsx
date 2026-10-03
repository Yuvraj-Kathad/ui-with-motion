"use client";

import React, { useState, useMemo } from "react";
import { useBuilder } from "../BuilderContext";
import { Search, BadgeCheck, ChevronDown, ArrowLeft, Plus, Settings2 } from "lucide-react";
import { detectProperties, DetectedProperty } from "@/lib/admin/components/parser";
import Editor from "@monaco-editor/react";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="flex-1 flex flex-col lg:flex-row items-start gap-6 p-4 md:p-8 min-h-0 overflow-hidden w-full bg-[#F7F9FB]">
      
      {/* Left Panel: Code Viewer */}
      <div className="flex-1 w-full lg:max-w-none h-[400px] lg:h-full bg-[#1e1e1e] border border-[#333] rounded-2xl flex flex-col overflow-hidden shadow-sm">
        <div className="px-6 py-4 flex items-center justify-between shrink-0 bg-[#252526] border-b border-[#333]">
          <h3 className="font-semibold text-sm text-[#CCCCCC]">Source Code</h3>
          <span className="text-xs text-[#808080] bg-[#333] px-2 py-0.5 rounded-full font-mono">Read Only</span>
        </div>
        <div className="flex-1 min-h-0">
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
              padding: { top: 24, bottom: 24 },
              wordWrap: "on",
              lineNumbers: "on",
              renderLineHighlight: "none",
            }}
          />
        </div>
      </div>

      {/* Right Panel: Detected Elements OR Connect Element */}
      <div className="flex-1 w-full lg:max-w-[500px] xl:max-w-[600px] h-full bg-[#FBFCFD] border border-[#DEE1E4] rounded-2xl flex flex-col overflow-hidden shadow-sm">
        <AnimatePresence mode="wait">
          {!editingPropertyRaw || !editingPropertyConfigured ? (
            <motion.div 
              key="list-view"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col h-full"
            >
              <div className="p-6 shrink-0 flex flex-col gap-1 border-b border-[#DEE1E4] bg-[#FBFCFD]">
                <h2 className="font-bold text-[20px] text-[#454545]">Configurable Elements</h2>
                <p className="text-[14px] text-[#7D7F82]">
                  Connect detected CSS variables or add your own.
                </p>
              </div>

              <div className="p-5 pb-2 shrink-0 bg-[#FAFAFA]">
                <div className="flex items-center gap-3 px-4 py-2.5 bg-[#FBFCFD] border border-[#DEE1E4] rounded-xl shadow-sm focus-within:border-[#111111] focus-within:ring-1 focus-within:ring-[#111111] transition-all">
                  <Search className="w-4 h-4 text-[#7D7F82]" />
                  <input
                    type="text"
                    placeholder="Search variables..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 outline-none bg-transparent text-[14px] text-[#454545] placeholder-[#A0A3A5]"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-5 pb-6 bg-[#FAFAFA]">
                <div className="flex flex-col gap-3 pt-2">
                  <AnimatePresence>
                    {filteredProperties.map((prop) => {
                      const configured = getConfiguredProperty(prop.id);
                      const isConnected = !!configured;
                      const isUnbound = prop.source === "unbound";

                      return (
                        <motion.div 
                          layout
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.15 }}
                          key={prop.id}
                          className={`group rounded-xl border px-4 py-3.5 flex items-center justify-between w-full transition-all ${
                            isConnected ? 'bg-[#FBFCFD] border-[#DEE1E4] shadow-sm hover:border-[#C4C7C8]' : 'bg-transparent border-[#DEE1E4] hover:bg-white hover:shadow-sm'
                          }`}
                        >
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            <div className="flex flex-col gap-1 min-w-0">
                              <p className={`font-['IBM_Plex_Mono',monospace] font-semibold text-[13px] truncate ${isConnected ? 'text-[#454545]' : 'text-[#7D7F82]'}`}>
                                {prop.variable}
                              </p>
                              {isUnbound && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFF0E0] text-[#D46B08] self-start border border-[#FFD591] uppercase tracking-wider">
                                  Unbound
                                </span>
                              )}
                            </div>
                            
                            {isConnected ? (
                              <div className="flex items-center gap-3 min-w-0 flex-1 ml-2">
                                <div className="bg-[#F7F9FB] border border-[#DEE1E4] px-2 py-0.5 rounded text-[#7D7F82] text-[11px] font-semibold shrink-0 uppercase tracking-wide">
                                  {configured.type}
                                </div>
                                <p className="font-medium text-[#454545] text-[14px] truncate">
                                  {configured.label}
                                </p>
                              </div>
                            ) : null}
                          </div>

                          <div className="flex items-center shrink-0 ml-4">
                            {isConnected ? (
                              <button 
                                className="flex items-center gap-2 cursor-pointer bg-[#FBFCFD] border border-[#DEE1E4] shadow-sm hover:bg-[#F7F9FB] px-3 py-1.5 rounded-lg transition-colors"
                                onClick={() => setEditingPropertyId(prop.id)}
                              >
                                <Settings2 className="w-4 h-4 text-[#454545]" />
                                <span className="font-semibold text-[#454545] text-[13px]">Edit</span>
                              </button>
                            ) : (
                              <button 
                                onClick={() => {
                                  toggleProperty(prop);
                                  setEditingPropertyId(prop.id);
                                }}
                                className="bg-[#111111] text-white px-4 py-1.5 rounded-lg font-medium text-[13px] hover:bg-[#333333] transition-colors shadow-sm"
                              >
                                Connect
                              </button>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>

                  <motion.button
                    layout
                    onClick={addUnboundProperty}
                    className="mt-3 flex items-center justify-center gap-2 w-full py-3.5 border-2 border-dashed border-[#DEE1E4] rounded-xl bg-transparent text-[#7D7F82] hover:bg-white hover:border-[#111111] hover:text-[#454545] hover:shadow-sm transition-all font-semibold text-[14px] group"
                  >
                    <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Add Manual Property
                  </motion.button>
                </div>
              </div>
              
              <div className="px-6 py-4 shrink-0 border-t border-[#DEE1E4] bg-[#FBFCFD] flex items-center justify-between">
                <span className="font-medium text-[13px] text-[#7D7F82]">
                  <span className="text-[#454545] font-semibold">{state.schema_definition?.length || 0}</span> connected
                </span>
              </div>
            </motion.div>
          ) : (
            /* Connect Element Configuration View */
            <motion.div 
              key="edit-view"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col h-full bg-[#FBFCFD]"
            >
              <div className="p-6 border-b border-[#DEE1E4] flex flex-col gap-5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setEditingPropertyId(null)}
                      className="p-1.5 hover:bg-[#F7F9FB] rounded-lg transition-colors -ml-1 text-[#7D7F82] hover:text-[#454545]"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <p className="font-bold text-[#454545] text-[18px]">
                      Configure Property
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                       toggleProperty(editingPropertyRaw);
                       setEditingPropertyId(null);
                    }}
                    className="text-[#DC2626] hover:bg-[#FEF2F2] px-3 py-1.5 rounded-lg text-[13px] font-semibold transition-colors"
                  >
                    Disconnect
                  </button>
                </div>
                
                <div className="bg-[#F7F9FB] rounded-xl p-4 flex flex-col gap-1.5 border border-[#DEE1E4]">
                  <p className="text-[12px] font-semibold text-[#7D7F82] uppercase tracking-wider">CSS Variable</p>
                  <div className="flex items-center gap-2">
                    <p className="font-['IBM_Plex_Mono',monospace] text-[#454545] text-[15px] font-semibold">
                      {editingPropertyRaw.variable}
                    </p>
                    {editingPropertyRaw.source === "unbound" && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFF0E0] text-[#D46B08] border border-[#FFD591] uppercase tracking-wider">
                        Unbound
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Form Section */}
              <div className="flex-1 overflow-y-auto p-6 bg-[#FAFAFA]">
                <div className="flex flex-col gap-6 max-w-[400px]">
                  
                  {editingPropertyRaw.source === "unbound" && (
                    <div className="flex flex-col gap-2">
                      <label className="font-semibold text-[#454545] text-[13px]">
                        CSS Variable Name
                      </label>
                      <input 
                        type="text" 
                        value={editingPropertyConfigured.variable}
                        onChange={(e) => updateEditingProperty({ variable: e.target.value, id: e.target.value })}
                        className="bg-[#FBFCFD] border border-[#DEE1E4] rounded-xl px-4 py-2.5 outline-none text-[#454545] text-[14px] font-['IBM_Plex_Mono',monospace] focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-all shadow-sm"
                        placeholder="--custom-var"
                      />
                    </div>
                  )}

                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-[#454545] text-[13px]">
                      Display Label
                    </label>
                    <input 
                      type="text" 
                      value={editingPropertyConfigured.label}
                      onChange={(e) => updateEditingProperty({ label: e.target.value })}
                      className="bg-[#FBFCFD] border border-[#DEE1E4] rounded-xl px-4 py-2.5 outline-none text-[#454545] text-[14px] w-full focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-all shadow-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-2 relative">
                    <label className="font-semibold text-[#454545] text-[13px]">
                      Control Type
                    </label>
                    <div className="relative">
                      <select
                        value={editingPropertyConfigured.type}
                        onChange={(e) => updateEditingProperty({ type: e.target.value })}
                        className="bg-[#FBFCFD] border border-[#DEE1E4] rounded-xl px-4 py-2.5 w-full outline-none text-[#454545] text-[14px] appearance-none cursor-pointer focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-all shadow-sm"
                      >
                        <option value="color">Color</option>
                        <option value="number">Number</option>
                        <option value="text">Text</option>
                        <option value="select">Select</option>
                        <option value="boolean">Boolean</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <ChevronDown className="w-4 h-4 text-[#7D7F82]" />
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {editingPropertyConfigured.type === "select" && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex flex-col gap-2 overflow-hidden"
                      >
                        <label className="font-semibold text-[#454545] text-[13px]">
                          Options (comma separated)
                        </label>
                        <input 
                          type="text" 
                          value={(editingPropertyConfigured.options || []).join(", ")}
                          onChange={(e) => updateEditingProperty({ options: e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean) })}
                          className="bg-[#FBFCFD] border border-[#DEE1E4] rounded-xl px-4 py-2.5 outline-none text-[#454545] text-[14px] w-full focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-all shadow-sm"
                          placeholder="solid, outline, ghost"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-[#454545] text-[13px]">
                      Default Value
                    </label>
                    <div className="bg-[#FBFCFD] border border-[#DEE1E4] rounded-xl px-3 py-2 flex items-center gap-3 focus-within:border-[#111111] focus-within:ring-1 focus-within:ring-[#111111] transition-all shadow-sm">
                      {editingPropertyConfigured.type === "color" && (
                        <div className="relative shrink-0 flex">
                          <input
                            type="color"
                            value={editingPropertyConfigured.defaultValue?.startsWith('#') ? editingPropertyConfigured.defaultValue.slice(0, 7) : '#000000'}
                            onChange={(e) => updateEditingProperty({ defaultValue: e.target.value })}
                            className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                          />
                          <div 
                            className="w-7 h-7 rounded-lg border border-[#0000001A] pointer-events-none shadow-sm" 
                            style={{ backgroundColor: editingPropertyConfigured.defaultValue?.startsWith('#') ? editingPropertyConfigured.defaultValue : '#000000' }} 
                          />
                        </div>
                      )}
                      <input
                        type="text"
                        value={editingPropertyConfigured.defaultValue}
                        onChange={(e) => updateEditingProperty({ defaultValue: e.target.value })}
                        className="font-['IBM_Plex_Mono',monospace] text-[#454545] text-[14px] outline-none flex-1 min-w-0 bg-transparent py-0.5"
                        placeholder="e.g. 16px or #ffffff"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-[#454545] text-[13px]">
                      Semantic Mapping <span className="text-[#7D7F82] font-normal">(Optional)</span>
                    </label>
                    <input 
                      type="text" 
                      value={editingPropertyConfigured.property || ""}
                      onChange={(e) => updateEditingProperty({ property: e.target.value })}
                      className="bg-[#FBFCFD] border border-[#DEE1E4] rounded-xl px-4 py-2.5 outline-none text-[#454545] text-[14px] w-full font-['IBM_Plex_Mono',monospace] focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-all shadow-sm"
                      placeholder="e.g. background-color"
                    />
                  </div>

                  {editingPropertyRaw.source === "unbound" && (
                    <div className="mt-2 bg-[#FFF0E0] border border-[#FFD591] p-4 rounded-xl flex gap-3">
                      <div className="shrink-0 mt-0.5 text-[#D46B08]">
                        <Settings2 className="w-4 h-4" />
                      </div>
                      <p className="text-[#C45E00] text-[13px] leading-relaxed">
                        This is a manual property. Changing it will only affect the component if its source explicitly references <code className="font-semibold px-1 bg-white/50 rounded">{editingPropertyConfigured.variable}</code>.
                      </p>
                    </div>
                  )}

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}

