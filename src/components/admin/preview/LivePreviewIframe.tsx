import React from "react";

interface LivePreviewIframeProps {
  sourceType: "react" | "html_css" | "both";
  snippets: {
    react?: string;
    html?: string;
    css?: string;
  };
  className?: string;
}

export function LivePreviewIframe({ sourceType, snippets, className = "w-full h-full border-none" }: LivePreviewIframeProps) {
  const buildPreviewDoc = (): string => {
    if (sourceType === "react" || (sourceType === "both" && snippets.react)) {
      const code = snippets.react || "";
      const stripped = code
        .replace(/^["']use client["'];?\s*/m, "")
        .replace(/import\s+(?:React\s*,?\s*)?(?:\{([^}]+)\})?\s+from\s+['"]react['"];?/gm, (match, p1) => {
          return p1 ? `const { ${p1} } = React;` : "";
        })
        .replace(/import\s+(?:\{([^}]+)\})\s+from\s+['"]framer-motion['"];?/gm, (match, p1) => {
          return p1 ? `const { ${p1} } = window.Motion;` : "";
        })
        .replace(/import\s+(?:\{([^}]+)\})\s+from\s+['"]lucide-react['"];?/gm, (match, p1) => {
          return p1 ? `const { ${p1} } = window.LucideProxy;` : "";
        })
        .replace(/^import\s+.*?from\s+['"].*?['"];?\s*/gm, "")
        .replace(/^export\s+default\s+function\s+\w+/m, "function __PreviewComp__")
        .replace(/^export\s+default\s+/m, "const __PreviewComp__ = ")
        .replace(/^export\s+function\s+(\w+)/m, "function __PreviewComp__")
        .replace(/^export\s+const\s+(\w+)/m, "const __PreviewComp__");

      return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/framer-motion@10/dist/framer-motion.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { display: flex; align-items: center; justify-content: center;
           min-height: 100vh; background: transparent; font-family: sans-serif; overflow: hidden; }
    #error { color: #c00; background: #fff0f0; padding: 8px; border-radius: 4px;
             font-size: 10px; font-family: monospace; white-space: pre-wrap; max-width: 90%; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script>
    window.LucideProxy = new Proxy({}, {
      get: function(target, prop) {
        return function(props) {
          return React.createElement('svg', {
            width: props.size || 24,
            height: props.size || 24,
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: props.color || "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            ...props
          }, React.createElement('rect', { x: 3, y: 3, width: 18, height: 18, rx: 2, ry: 2 }), React.createElement('text', { x: 12, y: 14, fontSize: 6, textAnchor: 'middle', fill: 'currentColor', stroke: 'none' }, prop.substring(0, 3)));
        }
      }
    });
  </script>
  <script type="text/babel" data-type="module">
    try {
      ${stripped}

      if (typeof __PreviewComp__ === 'function') {
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(React.createElement(__PreviewComp__));
      } else {
        document.getElementById('root').innerHTML = '<div id="error">Invalid Component</div>';
      }
    } catch(e) {
      document.getElementById('root').innerHTML = '<div id="error">Error loading preview</div>';
    }
  </script>
</body>
</html>`;
    }

    // HTML/CSS preview
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
      srcDoc={buildPreviewDoc()}
      className={className}
      sandbox="allow-scripts"
      title="Component Preview"
    />
  );
}
