import React, { useState, useMemo, useEffect } from "react";
import { X, Check, Copy, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { componentRegistry } from "@/lib/registry/components";
import { LivePreviewIframe } from "@/components/admin/preview/LivePreviewIframe";
import { useCustomization } from "@/components/providers/CustomizationProvider";

export type ComponentItem = {
  id: string;
  title: string;
  status: string;
  registry_id: string;
  tags?: string[];
  snippets?: any;
  source_type?: string;
  schema_definition?: any[];
  access_tier?: "free" | "premium";
  is_locked?: boolean;
};

export interface ComponentModalPublicProps {
  component: ComponentItem;
  isOpen: boolean;
  onClose: () => void;
}

export function ComponentModalPublic({
  component,
  isOpen,
  onClose,
}: ComponentModalPublicProps) {
  const { getOverrides, setOverrides: updateGlobalOverrides, saveOverrides } = useCustomization();
  const [activeTab, setActiveTab] = useState<"customisation" | "code">("customisation");
  const [copied, setCopied] = useState<string | false>(false);
  const [overrides, setOverrides] = useState<Record<string, string>>({});
  
  // Reset overrides when a new component is opened
  useEffect(() => {
    if (isOpen) {
      setOverrides(getOverrides(component.id));
    }
  }, [isOpen, component.id, getOverrides]);

  const handleOverrideChange = (key: string, value: string) => {
    const newOverrides = { ...overrides, [key]: value };
    setOverrides(newOverrides);
    updateGlobalOverrides(component.id, newOverrides);
  };

  const handleReset = () => {
    setOverrides({});
    updateGlobalOverrides(component.id, {});
  };

  const handleClose = () => {
    saveOverrides(component.id, overrides);
    onClose();
  };

  const registryEntry = componentRegistry[component.registry_id];

  const schemaDefToUse = useMemo(() => {
    return (component.schema_definition && component.schema_definition.length > 0)
      ? component.schema_definition
      : (registryEntry?.schema_definition || []);
  }, [component.schema_definition, registryEntry]);

  const liveSchema = useMemo(() => {
    return schemaDefToUse.map((config: any) => ({
      ...config,
      defaultValue: overrides[config.variable] !== undefined ? overrides[config.variable] : config.defaultValue
    }));
  }, [schemaDefToUse, overrides]);

  // Extract just the CSS variable overrides
  const activeOverrides = useMemo(() => {
    const active: Record<string, string> = {};
    schemaDefToUse.forEach((config: any) => {
      const val = overrides[config.variable] !== undefined ? overrides[config.variable] : config.defaultValue;
      if (config.variable) {
        active[config.variable] = val;
      }
    });
    return active;
  }, [schemaDefToUse, overrides]);

  const overrideStyleBlock = useMemo(() => {
    if (Object.keys(activeOverrides).length === 0) return "";
    return `\n\n<style>\n:root {\n${Object.entries(activeOverrides).map(([k,v]) => `  ${k}: ${v};`).join('\n')}\n}\n</style>`;
  }, [activeOverrides]);

  // The server explicitly sets is_locked to true if the component was scrubbed
  const isLockedPremium = !!component.is_locked;
  
  // Fallback to registry if DB doesn't have snippets and it hasn't been scrubbed
  const snippets = isLockedPremium 
    ? { html: "", css: "", nextjs: "" } 
    : (component.snippets || registryEntry?.snippets || { html: "", css: "", nextjs: "" });

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[100] bg-[#1F2123]/30 backdrop-blur-sm"
          />

          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-10 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white w-full max-w-[1301px] h-full max-h-[692px] rounded-[40px] p-[32px] flex flex-col md:flex-row gap-[24px] pointer-events-auto shadow-2xl overflow-hidden"
            >
              {/* Left Side: Preview Area */}
              <div className="bg-[#FBFCFD] border border-[#B7BABD] rounded-[28px] w-full md:w-[572px] h-full shrink-0 relative flex items-center justify-center overflow-hidden">
                <div className="w-full h-full transform flex items-center justify-center scale-110">
                  {(() => {
                    const RegistryComponent = registryEntry?.component;
                    if (RegistryComponent) {
                      return (
                        <div style={activeOverrides as React.CSSProperties} className="w-full h-full flex items-center justify-center">
                          <RegistryComponent />
                        </div>
                      );
                    }

                    const hasHtmlCss = snippets?.html || snippets?.css;
                    if (hasHtmlCss && component.source_type !== "react") {
                      return (
                        <div className="w-full h-full flex items-center justify-center">
                          <LivePreviewIframe 
                            sourceType={(component.source_type as "react" | "html_css" | "both") || "html_css"}
                            snippets={snippets}
                            schemaDefinition={component.schema_definition}
                            overrides={activeOverrides}
                            className="w-[120%] h-[120%] border-none scale-[0.85] origin-center"
                          />
                        </div>
                      );
                    }

                    return (
                      <div className="text-[#7D7F82] font-medium text-sm flex flex-col items-center gap-2">
                        <span>Preview Unavailable</span>
                        <span className="text-xs">This component requires a trusted registry renderer.</span>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Right Side: Panel Area */}
              <div className="flex-1 flex flex-col gap-[24px] p-0 md:p-[24px] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between w-full shrink-0">
                  <div className="flex items-center gap-3">
                    <h2 className="font-sans font-medium text-[24px] md:text-[31px] text-[#1F2123] leading-[1.2]">
                      {component.title}
                    </h2>
                    {component.access_tier === 'premium' && (
                      <div className="flex items-center justify-center bg-[#FDF8F0] border border-[#F3E2C6] rounded-full px-2 py-0.5 shrink-0" title="Premium Component">
                        <span className="text-[#C18824] text-[10px] font-bold uppercase tracking-wider">Premium</span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleClose}
                    className="size-[32px] flex items-center justify-center text-[#7D7F82] hover:text-black transition-colors"
                    aria-label="Close modal"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-[8px] items-start shrink-0">
                  <button
                    onClick={() => setActiveTab("customisation")}
                    className={`px-[24px] py-[12px] rounded-[40px] transition-colors font-sans font-medium text-[14px] md:text-[16px] ${
                      activeTab === "customisation"
                        ? "bg-[#1F2123] text-white"
                        : "bg-[#EEF1F4] text-[#7D7F82] hover:text-black hover:bg-[#DEE1E4]"
                    }`}
                  >
                    Customisation
                  </button>
                  <button
                    onClick={() => setActiveTab("code")}
                    className={`px-[40px] py-[12px] rounded-[20px] transition-colors font-sans font-semibold text-[14px] md:text-[14px] ${
                      activeTab === "code"
                        ? "bg-[#1F2123] text-white"
                        : "bg-[#EEF1F4] text-[#7D7F82] hover:text-black hover:bg-[#DEE1E4]"
                    }`}
                  >
                    Code
                  </button>
                </div>

                {/* Tab Content */}
                <div className="flex-1 overflow-y-auto w-full pr-2">
                  {isLockedPremium ? (
                    <div className="flex flex-col items-center justify-center h-full w-full max-w-[593px] text-center gap-4 py-12">
                      <div className="w-16 h-16 rounded-full bg-[#FDF8F0] border border-[#F3E2C6] flex items-center justify-center mb-2">
                        <Lock className="text-[#C18824] w-8 h-8" />
                      </div>
                      <h3 className="font-sans font-bold text-[20px] text-[#1F2123]">
                        Premium Component
                      </h3>
                      <p className="text-[#7D7F82] text-[14px] max-w-[300px]">
                        Sign in and Upgrade to Premium to unlock full source code and customization.
                      </p>
                      <button 
                        onClick={() => window.location.href = '/pricing'}
                        className="mt-4 bg-[#1F2123] text-white px-6 py-3 rounded-full font-sans font-medium text-[15px] hover:bg-black transition-colors"
                      >
                        Upgrade to Premium
                      </button>
                    </div>
                  ) : activeTab === "customisation" ? (
                    <div className="flex flex-col gap-[24px] w-full max-w-[593px]">
                      <div className="flex items-center justify-between">
                        <h3 className="font-sans font-bold text-[18px] text-[#1F2123]">
                          Customisation
                        </h3>
                        {Object.keys(overrides).length > 0 && (
                          <button
                            onClick={handleReset}
                            className="text-[13px] text-[#7D7F82] hover:text-[#1F2123] underline decoration-[#7D7F82]/30 hover:decoration-[#1F2123] transition-colors"
                          >
                            Reset
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[16px] gap-y-[24px] w-full mt-[16px]">
                        {(() => {
                          const validConfigs = schemaDefToUse.filter((c: any) => !!c.variable);

                          if (validConfigs.length === 0) {
                            return (
                              <div className="text-[#7D7F82] text-[14px] col-span-1 md:col-span-2 py-4">
                                Live customization is not available for this component.
                              </div>
                            );
                          }
                          
                          return validConfigs.map((config: any) => (
                          <div key={config.id} className="flex flex-col gap-[8px]">
                            <span className="font-sans font-normal text-[12px] text-[#7D7F82]">
                              {config.label}
                            </span>
                            
                            {config.type === "Color Picker" ? (
                              (() => {
                                let rawVal = overrides[config.variable] !== undefined ? overrides[config.variable] : config.defaultValue;
                                let hexVal = rawVal;
                                if (hexVal.startsWith('[')) hexVal = hexVal.slice(1, -1);
                                if (hexVal.includes('#')) hexVal = '#' + hexVal.split('#')[1].replace(/\]/g, '');
                                hexVal = hexVal.slice(0, 7) || "#000000";

                                return (
                                  <div className="bg-[#F7F9FB] border border-[#D7DADC] rounded-[58px] px-[16px] py-[12px] w-full flex items-center gap-3 focus-within:border-[#1F2123] transition-colors relative">
                                    <div className="relative shrink-0 flex items-center">
                                      <input
                                        type="color"
                                        value={hexVal.startsWith('#') ? hexVal : '#000000'}
                                        onChange={(e) => handleOverrideChange(config.variable, e.target.value)}
                                        className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                                      />
                                      <div 
                                        className="w-[20px] h-[20px] rounded-full border border-[#D7DADC] pointer-events-none" 
                                        style={{ backgroundColor: hexVal.startsWith('#') ? hexVal : '#000000' }} 
                                      />
                                    </div>
                                    <input 
                                      type="text"
                                      value={rawVal}
                                      onChange={(e) => handleOverrideChange(config.variable, e.target.value)}
                                      className="font-sans text-[14px] text-[#1F2123] outline-none flex-1 min-w-0 bg-transparent"
                                    />
                                  </div>
                                );
                              })()
                            ) : config.type === "Slider" ? (
                              (() => {
                                let rawVal = overrides[config.variable] !== undefined ? overrides[config.variable] : config.defaultValue;
                                let numVal = parseInt(String(rawVal).replace(/[^0-9-]/g, '')) || 0;
                                return (
                                  <div className="bg-[#F7F9FB] border border-[#D7DADC] rounded-[58px] px-[16px] py-[12px] w-full flex items-center gap-4 focus-within:border-[#1F2123] transition-colors">
                                    <input 
                                      type="range"
                                      min="0"
                                      max="100"
                                      value={numVal}
                                      onChange={(e) => handleOverrideChange(config.variable, `${e.target.value}px`)}
                                      className="flex-1 accent-[#1F2123]"
                                    />
                                    <span className="font-sans text-[14px] text-[#1F2123] w-[40px] text-right shrink-0">
                                      {rawVal}
                                    </span>
                                  </div>
                                );
                              })()
                            ) : (
                              <div className="bg-[#F7F9FB] border border-[#D7DADC] rounded-[58px] px-[16px] py-[12px] w-full flex items-center justify-between focus-within:border-[#1F2123] transition-colors">
                                <input 
                                  type="text"
                                  value={overrides[config.variable] !== undefined ? overrides[config.variable] : config.defaultValue}
                                  onChange={(e) => handleOverrideChange(config.variable, e.target.value)}
                                  className="font-sans text-[14px] text-[#1F2123] outline-none flex-1 min-w-0 bg-transparent"
                                />
                              </div>
                            )}
                          </div>
                        ));
                        })()}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-[16px] w-full max-w-[593px]">
                      <h3 className="font-sans font-bold text-[18px] text-[#1F2123]">
                        Code
                      </h3>

                      {(() => {
                        const nextjsCode = snippets.nextjs || snippets.react;

                        if (!nextjsCode) {
                          return (
                            <div className="text-[#7D7F82] text-[14px] text-center py-8 bg-[#F7F9FB] rounded-[16px] border border-[#EEF1F4]">
                              Next.js code is not available for this component.
                            </div>
                          );
                        }

                        const hasCustomization = Object.keys(activeOverrides).length > 0;
                        const codeToCopy = nextjsCode;

                        return (
                          <div className="flex flex-col gap-4">
                            {hasCustomization && (
                              <div className="bg-[#FDF8F0] border border-[#F3E2C6] rounded-[8px] p-4 flex items-start gap-3">
                                <span className="text-[#C18824] shrink-0 text-lg">💡</span>
                                <p className="text-[#A0701C] text-[13px] leading-relaxed">
                                  <strong>Customization applied via CSS variables.</strong> The Next.js code below is the authoritative structural source. 
                                  To use your customizations, apply the CSS variables to the component's container in your global CSS.
                                </p>
                              </div>
                            )}
                            
                            <div className="relative group">
                              <div className="absolute top-4 right-4 flex items-center">
                                <button
                                  onClick={() => copyToClipboard(codeToCopy, "nextjs")}
                                  className="flex items-center gap-2 bg-white/90 backdrop-blur border border-[#CBCED1] hover:bg-white text-[#3D3D3D] px-3 py-1.5 rounded-full shadow-sm transition-all"
                                  title="Copy Next.js Code"
                                >
                                  {copied === "nextjs" ? (
                                    <>
                                      <Check size={14} className="text-green-500" />
                                      <span className="text-[12px] font-medium text-green-600">Copied</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy size={14} />
                                      <span className="text-[12px] font-medium">Copy</span>
                                    </>
                                  )}
                                </button>
                              </div>
                              <pre className="bg-[#F7F9FB] border border-[#CBCED1] rounded-[16px] p-[24px] overflow-x-auto text-[13px] font-mono leading-relaxed text-[#1F2123] whitespace-pre">
                                <code>{codeToCopy}</code>
                              </pre>
                            </div>
                          </div>
                        );
                      })()}
                      
                      {snippets.figma && (
                        <div className="border border-[#CBCED1] rounded-[53px] px-[24px] py-[16px] w-full flex items-center justify-between bg-white hover:bg-[#F7F9FB] transition-colors cursor-pointer" onClick={() => copyToClipboard(snippets.figma, "figma")}>
                          <span className="font-sans font-medium text-[17.28px] text-[#3D3D3D]">Figma Link</span>
                          <div className="flex items-center gap-[10px]">
                            <span className="text-[#B0B0B0] text-[17.28px]">|</span>
                            {copied === "figma" ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-[#3D3D3D]" />}
                          </div>
                        </div>
                      )}

                      {snippets.prompt && (
                        <div className="border border-[#CBCED1] rounded-[53px] px-[24px] py-[16px] w-full flex items-center justify-between bg-white hover:bg-[#F7F9FB] transition-colors cursor-pointer" onClick={() => copyToClipboard(snippets.prompt, "prompt")}>
                          <span className="font-sans font-medium text-[17.28px] text-[#3D3D3D]">Prompt</span>
                          <div className="flex items-center gap-[10px]">
                            <span className="text-[#B0B0B0] text-[17.28px]">|</span>
                            {copied === "prompt" ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-[#3D3D3D]" />}
                          </div>
                        </div>
                      )}

                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
