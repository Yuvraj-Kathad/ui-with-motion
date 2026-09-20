"use client";

import React from "react";

interface NextjsEditorProps {
  code: string;
  setCode: (code: string) => void;
}

export default function NextjsEditor({ code, setCode }: NextjsEditorProps) {
  return (
    <div className="flex flex-col h-full w-full p-4">
      <label className="text-white text-xs font-medium mb-2">Next.js (React Component)</label>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="flex-1 bg-transparent text-[#E9EAEB] font-mono text-sm outline-none resize-none"
        spellCheck={false}
        placeholder="export default function Component() { return <div>Hello</div>; }"
      />
    </div>
  );
}
