export type DetectedProperty = {
  id: string; // The CSS variable name, e.g. --button-bg
  variable: string; // Same as ID, --button-bg
  property: string; // Optional metadata, we'll just use the variable name for now
  label: string; // e.g. "button bg"
  type: string; // Default to "Text Input"
  defaultValue: string; // The fallback value
  source: "detected" | "unbound";
};

export function detectProperties(
  sourceType: string,
  snippets: { react?: string; html?: string; css?: string }
): DetectedProperty[] {
  const properties: DetectedProperty[] = [];
  const addedVars = new Set<string>();

  const scanText = (text: string) => {
    let index = 0;
    while (true) {
      const startIdx = text.indexOf("var(--", index);
      if (startIdx === -1) break;

      let i = startIdx + 4;
      let depth = 1;
      let varName = "";
      let fallback = "";
      let parsingFallback = false;
      let insideString: string | null = null;

      while (i < text.length) {
        const char = text[i];
        if (insideString) {
          if (char === insideString && text[i - 1] !== '\\') {
            insideString = null;
          }
          if (parsingFallback) fallback += char;
          else varName += char;
        } else {
          if (char === '"' || char === "'") {
            insideString = char;
            if (parsingFallback) fallback += char;
            else varName += char;
          } else if (char === '(') {
            depth++;
            if (parsingFallback) fallback += char;
          } else if (char === ')') {
            depth--;
            if (depth === 0) break;
            if (parsingFallback) fallback += char;
          } else if (char === ',' && depth === 1 && !parsingFallback) {
            parsingFallback = true;
          } else {
            if (!parsingFallback) varName += char;
            else fallback += char;
          }
        }
        i++;
      }

      if (depth === 0) {
        varName = varName.trim();
        fallback = fallback.trim();

        if (/^--[a-zA-Z0-9-_]+$/.test(varName)) {
          if (!addedVars.has(varName)) {
            addedVars.add(varName);

            // Make a readable label from the variable name
            const cleanName = varName.replace(/^--/, '').replace(/-/g, ' ');
            const label = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);

            properties.push({
              id: varName,
              variable: varName,
              property: varName, // Store the variable as the property identity
              label: label,
              type: "text", // Step 3 will refine this to color/number/etc.
              defaultValue: fallback,
              source: "detected",
            });
          }
        }
      }
      // Step past var( to allow detecting nested variables
      index = startIdx + 4;
    }
  };

  if (snippets.react) scanText(snippets.react);
  if (snippets.html) scanText(snippets.html);
  if (snippets.css) scanText(snippets.css);

  return properties;
}
