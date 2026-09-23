"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import HtmlCssEditor from "@/components/admin/HtmlCssEditor";
import NextjsEditor from "@/components/admin/NextjsEditor";

export default function CreateComponentPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"htmlcss" | "nextjs">("htmlcss");
  
  const [htmlCode, setHtmlCode] = useState(`<!-- Write your HTML here -->
<div class="my-component">
  Hello World
</div>`);

  const [cssCode, setCssCode] = useState(`/* Write your CSS here */
.my-component {
  padding: 20px;
  background-color: #F6F7F8;
  border-radius: 8px;
  font-family: sans-serif;
  text-align: center;
}`);

  const [nextjsCode, setNextjsCode] = useState(`// Write your React/Next.js component here
function MyComponent() {
  return (
    <div className="p-5 bg-[#F6F7F8] rounded-lg font-sans text-center">
      Hello World
    </div>
  );
}`);

  const [previewSrcDoc, setPreviewSrcDoc] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [componentName, setComponentName] = useState("");
  const [saveMode, setSaveMode] = useState<"Draft" | "Publish">("Draft");

  useEffect(() => {
    if (activeTab === "htmlcss") {
      setPreviewSrcDoc(`
        <!DOCTYPE html>
        <html>
        <head>
          <style>${cssCode}</style>
        </head>
        <body style="margin: 0; padding: 24px; display: flex; align-items: center; justify-content: center; min-height: 100vh;">
          ${htmlCode}
        </body>
        </html>
      `);
    } else if (activeTab === "nextjs") {
      // Strip imports and exports to make it run in Babel standalone
      const cleanedCode = nextjsCode
        .replace(/import\s+.*?from\s+['"].*?['"];?/g, '')
        .replace(/export\s+default\s+/g, '')
        .replace(/export\s+/g, '');

      // Dynamically find the component name (first capitalized function/variable)
      const componentMatch = cleanedCode.match(/(?:function|const|let|var)\s+([A-Z]\w*)/);
      const componentNameRegex = componentMatch ? componentMatch[1] : 'App';

      setPreviewSrcDoc(`
        <!DOCTYPE html>
        <html>
        <head>
          <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
          <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body style="margin: 0; padding: 24px; display: flex; align-items: center; justify-content: center; min-height: 100vh;">
          <div id="root"></div>
          <script type="text/babel">
            try {
              ${cleanedCode}
              const root = ReactDOM.createRoot(document.getElementById('root'));
              
              // Attempt to render the dynamically found component, fallback to App or Component
              let ComponentToRender = null;
              if (typeof ${componentNameRegex} !== 'undefined') ComponentToRender = ${componentNameRegex};
              else if (typeof App !== 'undefined') ComponentToRender = App;
              else if (typeof Component !== 'undefined') ComponentToRender = Component;

              if (ComponentToRender) {
                root.render(React.createElement(ComponentToRender));
              } else {
                root.render(React.createElement('div', { style: { color: 'red' } }, 'Error: Could not find a React component to render. Make sure your function name starts with a capital letter.'));
              }
            } catch (err) {
              document.getElementById('root').innerHTML = '<div style="color: red; padding: 20px;">' + err.message + '</div>';
            }
          </script>
        </body>
        </html>
      `);
    }
  }, [htmlCode, cssCode, nextjsCode, activeTab]);

  const handleConfirmSave = () => {
    if (!componentName.trim()) return;
    
    setShowNameModal(false);
    setIsSaving(true);
    
    // Simulate API call for now
    setTimeout(() => {
      const existing = JSON.parse(localStorage.getItem("ui_motion_components") || "[]");
      
      const newComp = {
        id: Date.now().toString(),
        title: componentName,
        status: saveMode,
        htmlCode,
        cssCode,
        nextjsCode
      };

      localStorage.setItem("ui_motion_components", JSON.stringify([newComp, ...existing]));
      window.dispatchEvent(new Event("components_updated"));
      
      router.push("/admin/components");
      router.refresh();
    }, 500);
  };

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
        <h1 className="text-2xl font-bold text-[#111111]">Create new component</h1>
      </header>

      {/* Main Content Area - Split Pane */}
      <div className="flex-1 overflow-hidden p-8 flex gap-8">
        
        {/* Left Pane - Preview */}
        <div className="flex-1 bg-white rounded-2xl border border-[#E9EAEB] flex flex-col overflow-hidden">
          <div className="p-6 border-b border-[#E9EAEB]">
            <h2 className="text-xl font-medium text-[#888888]">Preview</h2>
          </div>
          <div className="flex-1 bg-white relative">
            <iframe
              title="preview"
              srcDoc={previewSrcDoc}
              className="absolute inset-0 w-full h-full border-none"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>

        {/* Right Pane - Code & Config */}
        <div className="flex-1 bg-white rounded-2xl border border-[#E9EAEB] flex flex-col overflow-hidden relative">
          {/* Tabs Area */}
          <div className="p-4 border-b border-[#E9EAEB] flex gap-2">
            <button 
              onClick={() => setActiveTab("htmlcss")}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeTab === "htmlcss" ? "bg-[#1F2123] text-white" : "bg-[#F6F7F8] text-[#888888] hover:bg-[#E9EAEB]"
              }`}
            >
              Html & css
            </button>
            <button 
              onClick={() => setActiveTab("nextjs")}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeTab === "nextjs" ? "bg-[#1F2123] text-white" : "bg-[#F6F7F8] text-[#888888] hover:bg-[#E9EAEB]"
              }`}
            >
              Next js
            </button>
            <div className="flex-1" />
            <button className="bg-[#1F2123] text-white px-4 py-1.5 rounded-full text-xs font-medium">
              Customisation
            </button>
          </div>

          {/* Code Snippet Area */}
          <div className="flex-1 bg-[#1F2123] overflow-y-auto">
            {activeTab === "htmlcss" ? (
              <HtmlCssEditor 
                htmlCode={htmlCode} 
                setHtmlCode={setHtmlCode} 
                cssCode={cssCode} 
                setCssCode={setCssCode} 
              />
            ) : (
              <NextjsEditor 
                code={nextjsCode} 
                setCode={setNextjsCode} 
              />
            )}
          </div>

          {/* Action Footer */}
          <div className="h-[80px] bg-white border-t border-[#E9EAEB] flex items-center justify-end px-6 gap-4">
            <button 
              onClick={() => {
                setSaveMode("Publish");
                setShowNameModal(true);
              }}
              className="bg-[#F6F7F8] text-[#888888] px-6 py-2.5 rounded-[44px] text-sm font-medium hover:bg-[#E9EAEB] transition-colors"
            >
              Publish
            </button>
            <button 
              onClick={() => {
                setSaveMode("Draft");
                setShowNameModal(true);
              }}
              disabled={isSaving}
              className="bg-[#1F2123] text-white px-6 py-2.5 rounded-[44px] text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save as Draft"}
            </button>
          </div>
        </div>

      </div>

      {/* Component Name & Publish Modal */}
      {showNameModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold text-[#111111] mb-2">
              {saveMode === "Publish" ? "Publish Component" : "Name your component"}
            </h3>
            
            {saveMode === "Publish" && (
              <p className="text-[#888888] mb-4 text-sm">
                Are you sure you want to publish this component? It will become live. Please name it to continue.
              </p>
            )}

            <input 
              type="text"
              autoFocus
              value={componentName}
              onChange={(e) => setComponentName(e.target.value)}
              placeholder="e.g. Animated Star Button"
              className={`w-full px-4 py-3 rounded-lg border border-[#E9EAEB] focus:outline-none focus:ring-2 focus:ring-[#111111] ${saveMode === "Draft" ? "mt-4 mb-6" : "mb-6"}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" && componentName.trim()) {
                  handleConfirmSave();
                }
              }}
            />
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowNameModal(false)}
                className="px-5 py-2.5 text-[#888888] font-medium hover:text-[#111111] transition-colors bg-[#F6F7F8] rounded-full hover:bg-[#E9EAEB]"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmSave}
                disabled={!componentName.trim()}
                className="bg-[#1F2123] text-white px-5 py-2.5 rounded-full font-medium disabled:opacity-50 transition-opacity"
              >
                {saveMode === "Publish" ? "Publish" : "Save Component"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
