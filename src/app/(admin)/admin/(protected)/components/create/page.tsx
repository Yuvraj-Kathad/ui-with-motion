"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import HtmlCssEditor from "@/components/admin/HtmlCssEditor";
import NextjsEditor from "@/components/admin/NextjsEditor";

export default function CreateComponentPage() {
  const [activeTab, setActiveTab] = useState<"htmlcss" | "nextjs">("htmlcss");
  const [htmlCode, setHtmlCode] = useState('<div class="demo">\n  <h1>Hello from HTML</h1>\n</div>');
  const [cssCode, setCssCode] = useState('.demo {\n  padding: 20px;\n  background-color: #EEF2FF;\n  border-radius: 8px;\n  color: #1566E5;\n  font-family: sans-serif;\n  text-align: center;\n}');
  const [nextjsCode, setNextjsCode] = useState('function App() {\n  const [count, setCount] = React.useState(0);\n  return (\n    <div className="p-6 bg-indigo-50 rounded-xl text-center font-sans">\n      <h1 className="text-xl text-indigo-600 font-bold mb-4">Hello from Next.js</h1>\n      <button \n        onClick={() => setCount(c => c + 1)}\n        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"\n      >\n        Clicked {count} times\n      </button>\n    </div>\n  );\n}');

  const [previewSrcDoc, setPreviewSrcDoc] = useState("");

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
              // Attempt to render 'App' or 'Component', whichever is defined
              const ComponentToRender = typeof App !== 'undefined' ? App : (typeof Component !== 'undefined' ? Component : null);
              if (ComponentToRender) {
                root.render(React.createElement(ComponentToRender));
              } else {
                root.render(React.createElement('div', { style: { color: 'red' } }, 'Error: Could not find function App() or Component()'));
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
            <button className="bg-[#F6F7F8] text-[#888888] px-6 py-2.5 rounded-[44px] text-sm font-medium hover:bg-[#E9EAEB] transition-colors">
              Publish
            </button>
            <button className="bg-[#1F2123] text-white px-6 py-2.5 rounded-[44px] text-sm font-medium hover:opacity-90 transition-opacity">
              Save as Draft
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
