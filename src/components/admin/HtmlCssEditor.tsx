"use client";

import React from "react";

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
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 flex flex-col p-4 border-b border-[#333]">
        <label className="text-white text-xs font-medium mb-2">HTML</label>
        <textarea
          value={htmlCode}
          onChange={(e) => setHtmlCode(e.target.value)}
          className="flex-1 bg-transparent text-[#E9EAEB] font-mono text-sm outline-none resize-none"
          spellCheck={false}
          placeholder="<div>Hello World</div>"
        />
      </div>
      <div className="flex-1 flex flex-col p-4">
        <label className="text-white text-xs font-medium mb-2">CSS</label>
        <textarea
          value={cssCode}
          onChange={(e) => setCssCode(e.target.value)}
          className="flex-1 bg-transparent text-[#E9EAEB] font-mono text-sm outline-none resize-none"
          spellCheck={false}
          placeholder=".demo { color: red; }"
        />
      </div>
    </div>
  );
}
