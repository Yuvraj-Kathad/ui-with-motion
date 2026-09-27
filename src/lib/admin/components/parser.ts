export type DetectedProperty = {
  id: string;
  category: "COLOR" | "TYPOGRAPHY" | "SPACING" | "BORDER" | "OTHER";
  property: string;
  value: string;
  originalText: string;
  prefix: string;
};

export function detectProperties(
  sourceType: string,
  snippets: { react?: string; html?: string; css?: string }
): DetectedProperty[] {
  const properties: DetectedProperty[] = [];
  const addedIds = new Set<string>();

  const addProp = (prop: DetectedProperty) => {
    const key = `${prop.property}:${prop.value}`;
    if (!addedIds.has(key)) {
      addedIds.add(key);
      properties.push(prop);
    }
  };

  if (sourceType === "react" && snippets.react) {
    const code = snippets.react;
    
    // Extract className strings
    const classRegex = /className=["']([^"']+)["']/g;
    let match;
    while ((match = classRegex.exec(code)) !== null) {
      const classes = match[1].split(/\s+/);
      
      classes.forEach((cls) => {
        if (!cls) return;

        // Helper to strip brackets for clean UI
        const cleanVal = (val: string) => {
          if (val.startsWith('[') && val.endsWith(']')) return val.slice(1, -1);
          return val;
        };

        // Colors
        if (cls.startsWith("bg-[#") || cls.match(/^bg-(red|blue|green|gray|black|white|yellow|orange|purple|pink)/)) {
          addProp({ id: `react_${cls}`, category: "COLOR", property: "background-color", value: cleanVal(cls.replace('bg-', '')), originalText: cls, prefix: 'bg-' });
        }
        else if (cls.startsWith("text-[#") || cls.match(/^text-(red|blue|green|gray|black|white|yellow|orange|purple|pink)/)) {
          addProp({ id: `react_${cls}`, category: "COLOR", property: "color", value: cleanVal(cls.replace('text-', '')), originalText: cls, prefix: 'text-' });
        }
        else if (cls.startsWith("border-[#") || cls.match(/^border-(red|blue|green|gray|black|white|yellow|orange|purple|pink)/)) {
           addProp({ id: `react_${cls}`, category: "COLOR", property: "border-color", value: cleanVal(cls.replace('border-', '')), originalText: cls, prefix: 'border-' });
        }
        
        // Typography
        else if (cls.match(/^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl|\[\d+px\])$/)) {
          addProp({ id: `react_${cls}`, category: "TYPOGRAPHY", property: "font-size", value: cleanVal(cls.replace('text-', '')), originalText: cls, prefix: 'text-' });
        }
        else if (cls.match(/^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$/)) {
          addProp({ id: `react_${cls}`, category: "TYPOGRAPHY", property: "font-weight", value: cleanVal(cls.replace('font-', '')), originalText: cls, prefix: 'font-' });
        }
        
        // Spacing
        else if (cls.match(/^[pm][trblxy]?-(0|px|0\.5|1|1\.5|2|2\.5|3|3\.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96|\[\d+px\])$/)) {
          const dashIdx = cls.indexOf('-');
          const prefix = cls.substring(0, dashIdx + 1);
          addProp({ id: `react_${cls}`, category: "SPACING", property: "padding/margin", value: cleanVal(cls.substring(dashIdx + 1)), originalText: cls, prefix });
        }
        else if (cls.match(/^gap-(0|px|0\.5|1|1\.5|2|2\.5|3|3\.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96|\[\d+px\])$/)) {
          addProp({ id: `react_${cls}`, category: "SPACING", property: "gap", value: cleanVal(cls.replace('gap-', '')), originalText: cls, prefix: 'gap-' });
        }
        
        // Border
        else if (cls.match(/^rounded(-[a-z]+)?(-(?:none|sm|md|lg|xl|2xl|3xl|full|\[\d+px\]))?$/)) {
          let prefix = 'rounded-';
          let val = cls.replace('rounded-', '');
          if (cls === 'rounded') {
             prefix = 'rounded';
             val = '';
          } else if (cls.match(/^rounded-[trblxy]+-(.+)$/)) {
             const lastDash = cls.lastIndexOf('-');
             prefix = cls.substring(0, lastDash + 1);
             val = cls.substring(lastDash + 1);
          }
          addProp({ id: `react_${cls}`, category: "BORDER", property: "border-radius", value: cleanVal(val), originalText: cls, prefix });
        }
        else if (cls.match(/^border(-\d)?$/)) {
          let val = cls.replace('border-', '');
          if (cls === 'border') val = '1';
          addProp({ id: `react_${cls}`, category: "BORDER", property: "border-width", value: cleanVal(val), originalText: cls, prefix: 'border-' });
        }
      });
    }
  } else if (sourceType === "html_css" && snippets.css) {
    const css = snippets.css;
    const ruleRegex = /([a-z-]+)\s*:\s*([^;]+);/g;
    let match;
    let idCounter = 0;
    while ((match = ruleRegex.exec(css)) !== null) {
      const prop = match[1].trim().toLowerCase();
      const val = match[2].trim();
      const originalText = match[0];
      idCounter++;
      
      const addCssProp = (cat: any) => addProp({ id: `css_${idCounter}`, category: cat, property: prop, value: val, originalText, prefix: `${prop}: ` });

      if (prop === "background-color" || prop === "background" || prop === "color") {
        addCssProp("COLOR");
      } else if (prop === "font-size" || prop === "font-weight" || prop === "font-family" || prop === "line-height") {
        addCssProp("TYPOGRAPHY");
      } else if (prop.includes("padding") || prop.includes("margin") || prop === "gap") {
        addCssProp("SPACING");
      } else if (prop.includes("border") || prop.includes("border-radius")) {
        addCssProp("BORDER");
      }
    }
  }

  return properties;
}

export function applyModifications(
  snippets: { react?: string; html?: string; css?: string },
  sourceType: string,
  schema: any[]
): { react?: string; html?: string; css?: string } {
  const detected = detectProperties(sourceType, snippets);
  const result = { ...snippets };
  
  schema.forEach(config => {
    const prop = detected.find(p => p.id === config.id);
    if (!prop) return;
    
    if (sourceType === "react" && result.react) {
       let val = config.defaultValue;
       // strip brackets if user accidentally typed them
       if (val.startsWith('[') && val.endsWith(']')) {
           val = val.slice(1, -1);
       }
       
       // Handle stale state where the value includes the prefix (e.g. val is "px-[24px]" and prefix is "px-")
       if (prop.prefix && val.startsWith(prop.prefix)) {
           val = val.substring(prop.prefix.length);
       }
       // If it still has brackets after stripping prefix (e.g. "px-[24px]" -> "[24px]"), strip them again
       if (val.startsWith('[') && val.endsWith(']')) {
           val = val.slice(1, -1);
       }
       
       let newClass = "";
       const needsBrackets = val.startsWith('#') || val.includes('px') || val.includes('rem') || val.includes('em') || val.includes('%') || val.includes('vw') || val.includes('vh');
       
       if (needsBrackets) {
           newClass = `${prop.prefix}[${val}]`;
       } else {
           if (prop.prefix === 'rounded') {
               newClass = val ? `rounded-${val}` : 'rounded';
           } else if (prop.prefix === 'border-') {
               newClass = val === '1' ? 'border' : `border-${val}`;
           } else {
               newClass = `${prop.prefix}${val}`;
           }
       }
       
       result.react = result.react.split(prop.originalText).join(newClass);
    } else if (sourceType === "html_css" && result.css) {
       const newRule = `${prop.property}: ${config.defaultValue};`;
       result.css = result.css.split(prop.originalText).join(newRule);
    }
  });

  return result;
}
