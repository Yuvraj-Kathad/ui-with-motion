import React, { useState, useMemo, useEffect } from "react";
import { X, Check, Copy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { componentRegistry } from "@/lib/registry/components";

export type ComponentItem = {
  id: string;
  title: string;
  status: string;
  registry_id: string;
  tags?: string[];
  snippets?: any;
  source_type?: string;
  schema_definition?: any[];
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
  const [activeTab, setActiveTab] = useState<"customisation" | "code">("customisation");
  const [copied, setCopied] = useState<string | false>(false);
  const [overrides, setOverrides] = useState<Record<string, string>>({});
  
  // Reset overrides when a new component is opened
  useEffect(() => {
    setOverrides({});
  }, [component.id]);

  const liveSchema = useMemo(() => {
    return (component.schema_definition || []).map((config: any) => ({
      ...config,
      defaultValue: overrides[config.id] !== undefined ? overrides[config.id] : config.defaultValue
    }));
  }, [component.schema_definition, overrides]);

  // Extract just the CSS variable overrides
  const activeOverrides = useMemo(() => {
    const active: Record<string, string> = {};
    (component.schema_definition || []).forEach((config: any) => {
      const val = overrides[config.id] !== undefined ? overrides[config.id] : config.defaultValue;
      if (config.variable) {
        active[config.variable] = val;
      }
    });
    return active;
  }, [component.schema_definition, overrides]);

  const overrideStyleBlock = useMemo(() => {
    if (Object.keys(activeOverrides).length === 0) return "";
    return `\n\n<style>\n:root {\n${Object.entries(activeOverrides).map(([k,v]) => `  ${k}: ${v};`).join('\n')}\n}\n</style>`;
  }, [activeOverrides]);

  const registryEntry = componentRegistry[component.registry_id];
  // Fallback to registry if DB doesn't have snippets
  const snippets = component.snippets || registryEntry?.snippets || { html: "", css: "", nextjs: "" };

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
            onClick={onClose}
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
                    return RegistryComponent ? (
                      <RegistryComponent />
                    ) : (
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
                  <h2 className="font-sans font-medium text-[24px] md:text-[31px] text-[#1F2123] leading-[1.2]">
                    {component.title}
                  </h2>
                  <button
                    onClick={onClose}
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
                  {activeTab === "customisation" ? (
                    <div className="flex flex-col gap-[24px] w-full max-w-[593px]">
                      <h3 className="font-sans font-bold text-[18px] text-[#1F2123]">
                        Customisation
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[16px] gap-y-[24px] w-full mt-[16px]">
                        {(component.schema_definition || []).map((config: any) => (
                          <div key={config.id} className="flex flex-col gap-[8px]">
                            <span className="font-sans font-normal text-[12px] text-[#7D7F82]">
                              {config.label}
                            </span>
                            
                            {config.type === "Color Picker" ? (
                              (() => {
                                let rawVal = overrides[config.id] !== undefined ? overrides[config.id] : config.defaultValue;
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
                                        onChange={(e) => setOverrides(prev => ({ ...prev, [config.id]: e.target.value }))}
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
                                      onChange={(e) => setOverrides(prev => ({ ...prev, [config.id]: e.target.value }))}
                                      className="font-sans text-[14px] text-[#1F2123] outline-none flex-1 min-w-0 bg-transparent"
                                    />
                                  </div>
                                );
                              })()
                            ) : config.type === "Slider" ? (
                              (() => {
                                let rawVal = overrides[config.id] !== undefined ? overrides[config.id] : config.defaultValue;
                                let numVal = parseInt(String(rawVal).replace(/[^0-9-]/g, '')) || 0;
                                return (
                                  <div className="bg-[#F7F9FB] border border-[#D7DADC] rounded-[58px] px-[16px] py-[12px] w-full flex items-center gap-4 focus-within:border-[#1F2123] transition-colors">
                                    <input 
                                      type="range"
                                      min="0"
                                      max="100"
                                      value={numVal}
                                      onChange={(e) => setOverrides(prev => ({ ...prev, [config.id]: `${e.target.value}px` }))}
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
                                  value={overrides[config.id] !== undefined ? overrides[config.id] : config.defaultValue}
                                  onChange={(e) => setOverrides(prev => ({ ...prev, [config.id]: e.target.value }))}
                                  className="font-sans text-[14px] text-[#1F2123] outline-none flex-1 min-w-0 bg-transparent"
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-[16px] w-full max-w-[593px]">
                      <h3 className="font-sans font-bold text-[18px] text-[#1F2123]">
                        Code
                      </h3>

                      {(snippets.react || snippets.nextjs) && (
                        <div className="border border-[#CBCED1] rounded-[53px] px-[24px] py-[16px] w-full flex items-center justify-between bg-white hover:bg-[#F7F9FB] transition-colors cursor-pointer" onClick={() => copyToClipboard((snippets.react || snippets.nextjs) + (overrideStyleBlock ? `\n\n/* Add these variables to your global CSS or inside the component */` + overrideStyleBlock : ""), "nextjs")}>
                          <span className="font-sans font-medium text-[17.28px] text-[#3D3D3D]">Next.js Code</span>
                          <div className="flex items-center gap-[10px]">
                            <span className="text-[#B0B0B0] text-[17.28px]">|</span>
                            {copied === "nextjs" ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-[#3D3D3D]" />}
                          </div>
                        </div>
                      )}

                      {(snippets.html) && (
                        <div className="border border-[#CBCED1] rounded-[53px] px-[24px] py-[16px] w-full flex items-center justify-between bg-white hover:bg-[#F7F9FB] transition-colors cursor-pointer" onClick={() => copyToClipboard(snippets.html + "\n\n<style>\n" + (snippets.css || "") + "\n</style>" + overrideStyleBlock, "html")}>
                          <span className="font-sans font-medium text-[17.28px] text-[#3D3D3D]">HTML-CSS Code</span>
                          <div className="flex items-center gap-[10px]">
                            <span className="text-[#B0B0B0] text-[17.28px]">|</span>
                            {copied === "html" ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-[#3D3D3D]" />}
                          </div>
                        </div>
                      )}
                      
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
