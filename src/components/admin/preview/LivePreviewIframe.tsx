import React, { useEffect, useRef } from "react";

interface LivePreviewIframeProps {
  sourceType: "react" | "html_css" | "both";
  snippets: {
    react?: string;
    html?: string;
    css?: string;
  };
  className?: string;
  overrides?: Record<string, string>;
  schemaDefinition?: any[];
}

export function LivePreviewIframe({ sourceType, snippets, className = "w-full h-full border-none", overrides = {}, schemaDefinition = [] }: LivePreviewIframeProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!iframeRef.current?.contentWindow) return;

    const safeOverrides: Record<string, string> = {};
    const varNameRegex = /^--[a-zA-Z0-9-_]+$/;

    for (const [key, value] of Object.entries(overrides)) {
      if (!varNameRegex.test(key)) continue;

      const config = schemaDefinition.find(c => c.variable === key);
      let isValid = true;
      const strVal = String(value);

      if (config) {
        if (config.type === "color") {
          const isHex = /^#([A-Fa-f0-9]{3,8})$/.test(strVal);
          const isRgb = /^(rgb|hsl)a?\([\d\s%,.\/]+\)$/i.test(strVal);
          const isNamed = /^[a-zA-Z]+$/.test(strVal);
          if (!isHex && !isRgb && !isNamed) isValid = false;
        } else if (config.type === "number") {
          const isNumericWithUnit = /^-?\d*\.?\d+(px|rem|em|%|vh|vw|pt|pc|in|cm|mm|ex|ch|vmin|vmax)$/i.test(strVal) || /^-?\d*\.?\d+$/.test(strVal);
          if (!isNumericWithUnit) isValid = false;
        } else if (config.type === "boolean") {
           // Should be 'true' or 'false', but CSS usually handles 0/1 or similar. We enforce the literal.
           // Actually, CSS boolean can be represented as 1/0 or display: block/none.
           // Let's just structurally allow basic values.
           if (/[;{}]/.test(strVal)) isValid = false;
        } else if (config.type === "select" || config.type === "text") {
          // Basic structural defense for text
          if (/[;{}]/.test(strVal)) isValid = false;
        }
      } else {
        // Basic structural defense for unbound variables
        if (/[;{}]/.test(strVal)) isValid = false;
      }

      if (isValid) {
        safeOverrides[key] = strVal;
      }
    }

    iframeRef.current.contentWindow.postMessage(
      { type: "CSS_OVERRIDES", overrides: safeOverrides },
      "*"
    );
  }, [overrides, schemaDefinition]);

  const buildPreviewDoc = (): string => {
    const receiverScript = `
      <script>
        window.addEventListener('message', function(event) {
          try {
            if (event.source !== window.parent) return;
            const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
            if (data && data.type === 'CSS_OVERRIDES') {
              const root = document.documentElement;
              const overrides = data.overrides || {};
              for (const key in overrides) {
                if (/^--[a-zA-Z0-9-_]+$/.test(key)) {
                  root.style.setProperty(key, overrides[key], 'important');
                }
              }
            }
          } catch(e) {}
        });
      </script>
    `;

    if (sourceType === "react" || (sourceType === "both" && snippets.react && !snippets.html)) {
      return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { display: flex; align-items: center; justify-content: center;
           min-height: 100vh; background: transparent; font-family: sans-serif; overflow: hidden; }
    .box { text-align: center; color: #626467; font-size: 14px; max-width: 80%; padding: 20px; border: 1px solid #E9EAEB; border-radius: 8px; background: #fff; }
    .title { font-weight: bold; color: #111111; margin-bottom: 8px; }
  </style>
</head>
<body>
  <div class="box">
    <div class="title">React Preview Unavailable</div>
    <div>React components require a trusted registry renderer to preview safely.</div>
  </div>
</body>
</html>`;
    }

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { display: flex; align-items: center; justify-content: center;
           min-height: 100vh; background: transparent; font-family: sans-serif; overflow: hidden; }
    ${snippets.css || ""}
  </style>
</head>
<body>
  ${snippets.html || ""}
  ${receiverScript}
</body>
</html>`;
  };

  const hasCode = sourceType === "react" 
    ? !!snippets.react?.trim() 
    : sourceType === "html_css" 
      ? !!(snippets.html?.trim() || snippets.css?.trim())
      : !!(snippets.react?.trim() || snippets.html?.trim() || snippets.css?.trim());

  if (!hasCode) {
    return <div className="text-xs text-gray-400">No code</div>;
  }

  return (
    <iframe
      ref={iframeRef}
      srcDoc={buildPreviewDoc()}
      className={className}
      sandbox="allow-scripts"
      title="Component Preview"
      onLoad={() => {
        if (!iframeRef.current?.contentWindow) return;
        const safeOverrides: Record<string, string> = {};
        const varNameRegex = /^--[a-zA-Z0-9-_]+$/;
        for (const [key, value] of Object.entries(overrides)) {
          if (!varNameRegex.test(key)) continue;
          safeOverrides[key] = String(value);
        }
        iframeRef.current.contentWindow.postMessage(
          { type: "CSS_OVERRIDES", overrides: safeOverrides },
          "*"
        );
      }}
    />
  );
}
