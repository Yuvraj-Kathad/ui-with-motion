import React, { useState } from "react";
import { X, Check, Copy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type ComponentItem = {
  id: string;
  title: string;
  status: string;
  htmlCode: string;
  cssCode: string;
  nextjsCode: string;
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

  const getPreviewHtml = () => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          ::-webkit-scrollbar { display: none; }
          * { -ms-overflow-style: none; scrollbar-width: none; }
          ${component.cssCode}
        </style>
      </head>
      <body style="margin: 0; display: flex; align-items: center; justify-content: center; height: 100vh; background-color: transparent;">
        ${component.htmlCode}
      </body>
      </html>
    `;
  };

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
                <iframe 
                  srcDoc={getPreviewHtml()}
                  className="absolute inset-0 w-full h-full border-none pointer-events-auto scale-110 transform transition-transform"
                  sandbox="allow-scripts allow-same-origin"
                />
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

                      {/* Appearance Group */}
                      <div className="flex flex-col gap-[16px] w-full">
                        <h4 className="font-sans font-semibold text-[14px] text-[#7D7F82]">
                          Appearance
                        </h4>
                        <div className="flex gap-[16px] w-full">
                          <div className="flex-1 flex flex-col gap-[8px]">
                            <span className="font-sans font-normal text-[12px] text-[#7D7F82]">
                              Corner Radius
                            </span>
                            <div className="bg-[#F7F9FB] border border-[#D7DADC] rounded-[58px] px-[16px] py-[12px] w-full flex items-center justify-between">
                              <span className="font-sans text-[14px] text-[#1F2123]">24px</span>
                            </div>
                          </div>
                          <div className="flex-1 flex flex-col gap-[8px]">
                            <span className="font-sans font-normal text-[12px] text-[#7D7F82]">
                              Color
                            </span>
                            <div className="bg-[#F7F9FB] border border-[#D7DADC] rounded-[58px] px-[16px] py-[12px] w-full flex items-center justify-between">
                              <span className="font-sans text-[14px] text-[#1F2123]">#3B82F6</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Typography Group */}
                      <div className="flex flex-col gap-[16px] w-full">
                        <h4 className="font-sans font-semibold text-[14px] text-[#7D7F82]">
                          Typography
                        </h4>
                        <div className="flex gap-[16px] w-full">
                          <div className="flex-1 flex flex-col gap-[8px]">
                            <span className="font-sans font-normal text-[12px] text-[#7D7F82]">
                              Font Size
                            </span>
                            <div className="bg-[#F7F9FB] border border-[#D7DADC] rounded-[58px] px-[16px] py-[12px] w-full flex items-center justify-between">
                              <span className="font-sans text-[14px] text-[#1F2123]">16px</span>
                            </div>
                          </div>
                          <div className="flex-1 flex flex-col gap-[8px]">
                            <span className="font-sans font-normal text-[12px] text-[#7D7F82]">
                              Theme
                            </span>
                            <div className="bg-[#F7F9FB] border border-[#D7DADC] rounded-[58px] px-[16px] py-[12px] w-full flex items-center justify-between">
                              <span className="font-sans text-[14px] text-[#1F2123]">Light</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Animation Group */}
                      <div className="flex flex-col gap-[16px] w-full">
                        <h4 className="font-sans font-semibold text-[14px] text-[#7D7F82]">
                          Animation
                        </h4>
                        <div className="flex gap-[16px] w-full">
                          <div className="flex-1 flex flex-col gap-[8px]">
                            <span className="font-sans font-normal text-[12px] text-[#7D7F82]">
                              Speed
                            </span>
                            <div className="bg-[#F7F9FB] border border-[#D7DADC] rounded-[58px] px-[16px] py-[12px] w-full flex items-center justify-between">
                              <span className="font-sans text-[14px] text-[#1F2123]">500ms</span>
                            </div>
                          </div>
                          <div className="flex-1 flex flex-col gap-[8px]">
                            <span className="font-sans font-normal text-[12px] text-[#7D7F82]">
                              Type
                            </span>
                            <div className="bg-[#F7F9FB] border border-[#D7DADC] rounded-[58px] px-[16px] py-[12px] w-full flex items-center justify-between">
                              <span className="font-sans text-[14px] text-[#1F2123]">Ease In</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-[16px] w-full max-w-[593px]">
                      <h3 className="font-sans font-bold text-[18px] text-[#1F2123]">
                        Code
                      </h3>

                      <div className="border border-[#CBCED1] rounded-[53px] px-[24px] py-[16px] w-full flex items-center justify-between bg-white hover:bg-[#F7F9FB] transition-colors cursor-pointer" onClick={() => copyToClipboard(component.nextjsCode, "nextjs")}>
                        <span className="font-sans font-medium text-[17.28px] text-[#3D3D3D]">Next.js Code</span>
                        <div className="flex items-center gap-[10px]">
                          <span className="text-[#B0B0B0] text-[17.28px]">|</span>
                          {copied === "nextjs" ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-[#3D3D3D]" />}
                        </div>
                      </div>

                      <div className="border border-[#CBCED1] rounded-[53px] px-[24px] py-[16px] w-full flex items-center justify-between bg-white hover:bg-[#F7F9FB] transition-colors cursor-pointer" onClick={() => copyToClipboard(component.htmlCode + "\n\n<style>\n" + component.cssCode + "\n</style>", "html")}>
                        <span className="font-sans font-medium text-[17.28px] text-[#3D3D3D]">HTML-CSS Code</span>
                        <div className="flex items-center gap-[10px]">
                          <span className="text-[#B0B0B0] text-[17.28px]">|</span>
                          {copied === "html" ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-[#3D3D3D]" />}
                        </div>
                      </div>
                      
                      <div className="border border-[#CBCED1] rounded-[53px] px-[24px] py-[16px] w-full flex items-center justify-between bg-white hover:bg-[#F7F9FB] transition-colors cursor-pointer" onClick={() => copyToClipboard("https://figma.com", "figma")}>
                        <span className="font-sans font-medium text-[17.28px] text-[#3D3D3D]">Figma Link</span>
                        <div className="flex items-center gap-[10px]">
                          <span className="text-[#B0B0B0] text-[17.28px]">|</span>
                          {copied === "figma" ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-[#3D3D3D]" />}
                        </div>
                      </div>

                      <div className="border border-[#CBCED1] rounded-[53px] px-[24px] py-[16px] w-full flex items-center justify-between bg-white hover:bg-[#F7F9FB] transition-colors cursor-pointer" onClick={() => copyToClipboard("Prompt placeholder", "prompt")}>
                        <span className="font-sans font-medium text-[17.28px] text-[#3D3D3D]">Prompt</span>
                        <div className="flex items-center gap-[10px]">
                          <span className="text-[#B0B0B0] text-[17.28px]">|</span>
                          {copied === "prompt" ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-[#3D3D3D]" />}
                        </div>
                      </div>

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
