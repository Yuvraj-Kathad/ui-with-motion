"use client";

import React from "react";
import Editor from "@monaco-editor/react";

interface HtmlCssEditorProps {
  htmlCode: string;
  setHtmlCode: (code: string) => void;
  cssCode: string;
  setCssCode: (code: string) => void;
}

export default function HtmlCssEditor({
  htmlCode,
  setHtmlCode,
  cssCode,
  setCssCode,
}: HtmlCssEditorProps) {
  const commonOptions = {
    minimap: { enabled: false },
    fontSize: 14,
    fontFamily: '"Fira Code", "Consolas", monospace',
    wordWrap: 'on' as const,
    scrollBeyondLastLine: false,
    padding: { top: 16 },
    tabSize: 2,
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 flex flex-col border-b border-[#333]">
        <div className="p-4 border-b border-[#333]">
          <label className="text-white text-xs font-medium">HTML</label>
        </div>
        <div className="flex-1 relative pt-4">
          <Editor
            height="100%"
            defaultLanguage="html"
            theme="vs-dark"
            value={htmlCode}
            onChange={(value) => setHtmlCode(value || "")}
            options={commonOptions}
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-[#333]">
          <label className="text-white text-xs font-medium">CSS</label>
        </div>
        <div className="flex-1 relative pt-4">
          <Editor
            height="100%"
            defaultLanguage="css"
            theme="vs-dark"
            value={cssCode}
            onChange={(value) => setCssCode(value || "")}
            options={commonOptions}
          />
        </div>
      </div>
    </div>
  );
}
