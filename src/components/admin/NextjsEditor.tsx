"use client";

import React from "react";
import Editor from "@monaco-editor/react";

interface NextjsEditorProps {
  code: string;
  setCode: (code: string) => void;
}

export default function NextjsEditor({ code, setCode }: NextjsEditorProps) {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="p-4 border-b border-[#333]">
        <label className="text-white text-xs font-medium">Next.js (React Component)</label>
      </div>
      <div className="flex-1 relative pt-4">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || "")}
          beforeMount={(monaco) => {
            monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
              noSemanticValidation: true,
              noSyntaxValidation: false,
            });
            monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
              target: monaco.languages.typescript.ScriptTarget.ES2015,
              allowNonTsExtensions: true,
              jsx: monaco.languages.typescript.JsxEmit.React,
            });
          }}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: '"Fira Code", "Consolas", monospace',
            wordWrap: 'on',
            scrollBeyondLastLine: false,
            padding: { top: 16 },
            tabSize: 2,
          }}
        />
      </div>
    </div>
  );
}
