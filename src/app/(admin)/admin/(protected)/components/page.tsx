"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Play, Edit, Trash2 } from "lucide-react";

type ComponentItem = {
  id: string;
  title: string;
  status: "Draft" | "Publish";
  htmlCode: string;
  cssCode: string;
  nextjsCode: string;
};

const STAR_HTML = `<button class="star-btn">
  <svg class="star-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
  <span>Star</span>
</button>`;

const STAR_CSS = `.star-btn { display: flex; align-items: center; gap: 8px; padding: 10px 20px; background-color: #1F2123; color: #FFFFFF; border: none; border-radius: 44px; font-family: sans-serif; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.3s ease; } .star-btn:hover { background-color: #333333; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); } .star-btn:active { transform: translateY(0); } .star-icon { width: 18px; height: 18px; transition: transform 0.5s ease; } .star-btn:hover .star-icon { transform: rotate(144deg) scale(1.1); fill: #FFD700; stroke: #FFD700; }`;

export default function AdminComponentsPage() {
  const [components, setComponents] = useState<ComponentItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadComponents = () => {
      const saved = localStorage.getItem("ui_motion_components");
      if (saved) {
        setComponents(JSON.parse(saved));
      } else {
        const initial: ComponentItem[] = [{
          id: "1",
          title: "Star button",
          status: "Draft",
          htmlCode: STAR_HTML,
          cssCode: STAR_CSS,
          nextjsCode: ""
        }];
        setComponents(initial);
        localStorage.setItem("ui_motion_components", JSON.stringify(initial));
      }
      setIsLoaded(true);
    };

    loadComponents();

    window.addEventListener("components_updated", loadComponents);
    return () => window.removeEventListener("components_updated", loadComponents);
  }, []);

  const handleDelete = (id: string) => {
    const updated = components.filter((c) => c.id !== id);
    setComponents(updated);
    localStorage.setItem("ui_motion_components", JSON.stringify(updated));
  };

  const getPreviewHtml = (comp: ComponentItem) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>${comp.cssCode}</style>
      </head>
      <body style="margin: 0; padding: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; overflow: hidden; background: transparent;">
        ${comp.htmlCode}
      </body>
      </html>
    `;
  };

  if (!isLoaded) return <div className="flex-1 bg-[#F6F7F8]" />;

  return (
    <div className="flex flex-col h-full bg-[#F6F7F8]">
      <header className="h-[63px] bg-white border-b border-[#E9EAEB] px-8 flex items-center justify-between shrink-0">
        <h1 className="text-2xl font-bold text-[#111111]">Components</h1>
        {components.length > 0 && (
          <Link
            href="/admin/components/create"
            className="bg-[#1F2123] text-white px-5 py-2.5 rounded-[44px] text-sm font-medium transition-opacity hover:opacity-90"
          >
            Create component
          </Link>
        )}
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-8 flex flex-col">
        {components.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center">
            <h2 className="font-title font-bold text-[32px] sm:text-[44px] text-black tracking-[-0.02em] mb-8 text-center max-w-[600px]">
              Start your component creation journey
            </h2>
            <Link
              href="/admin/components/create"
              className="bg-[#1F2123] text-white px-8 py-4 rounded-[44px] font-medium text-base transition-opacity hover:opacity-90"
            >
              Create component
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
            {components.map((comp) => {
              const isPublish = comp.status === "Publish";
              return (
                <div key={comp.id} className="bg-[#fbfcfd] border border-[#b7babd] flex flex-col gap-px items-start relative rounded-[12px] w-full overflow-hidden">
                  
                  {/* Card Header (Status + Actions) */}
                  <div className="flex items-center justify-between p-[8px] relative w-full shrink-0">
                    <div className={`flex items-center px-[8px] py-[4px] rounded-[4px] shrink-0 ${isPublish ? "bg-[#00963d]" : "bg-white border border-[#d7dadc]"}`}>
                      <p className={`font-work font-normal leading-[1.2] text-[13px] whitespace-nowrap ${isPublish ? "text-white" : "text-[#7d7f82]"}`}>
                        {comp.status}
                      </p>
                    </div>
                    
                    <div className="flex gap-[6px] items-center relative shrink-0 text-[#1f2123]">
                      <button className="flex items-center justify-center w-[34px] h-[34px] rounded-full hover:bg-black/5 transition-colors">
                        <Play className="w-[18px] h-[18px] fill-current" />
                      </button>
                      <Link href={`/admin/components/${comp.id}/edit`} className="flex items-center justify-center w-[34px] h-[34px] rounded-full hover:bg-black/5 transition-colors">
                        <Edit className="w-[18px] h-[18px]" />
                      </Link>
                      <button 
                        onClick={() => handleDelete(comp.id)}
                        className="flex items-center justify-center w-[34px] h-[34px] rounded-full hover:bg-red-50 text-[#1f2123] hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-[18px] h-[18px]" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Preview Area */}
                  <div className="h-[151px] w-full bg-[#f7f9fb] relative shrink-0 border-y border-[#e9eaeb]">
                    <iframe 
                      srcDoc={getPreviewHtml(comp)}
                      className="absolute inset-0 w-full h-full border-none pointer-events-none"
                      tabIndex={-1}
                      sandbox="allow-scripts allow-same-origin"
                    />
                  </div>
                  
                  {/* Card Footer */}
                  <div className="flex items-center justify-between px-[20px] py-[12px] relative w-full shrink-0 bg-white">
                    <p className="font-sans font-medium leading-[1.2] text-[20px] text-black whitespace-nowrap truncate">
                      {comp.title}
                    </p>
                    <div className="flex gap-[4px] h-[24px] items-center shrink-0">
                      <div className="bg-white border border-[#eef1f4] flex items-center px-[6px] py-[4px] rounded-[4px]">
                        <p className="font-work font-normal leading-[1.2] text-[#7d7f82] text-[12px] whitespace-nowrap">Html & css</p>
                      </div>
                      <div className="bg-white border border-[#eef1f4] flex items-center px-[6px] py-[4px] rounded-[4px]">
                        <p className="font-work font-normal leading-[1.2] text-[#7d7f82] text-[12px] whitespace-nowrap">Next js</p>
                      </div>
                      <div className="bg-white border border-[#eef1f4] flex items-center px-[6px] py-[4px] rounded-[4px]">
                        <p className="font-work font-normal leading-[1.2] text-[#7d7f82] text-[12px] whitespace-nowrap">Figma</p>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
