"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Play, Edit, Trash2 } from "lucide-react";

type ComponentItem = {
  id: string;
  title: string;
  status: "Draft" | "Publish";
};

export default function AdminComponentsPage() {
  // Use state so we can actually delete items from the UI
  const [components, setComponents] = useState<ComponentItem[]>([
    { id: "1", title: "Star button", status: "Draft" },
  ]);

  const handleDelete = (id: string) => {
    setComponents((prev) => prev.filter((c) => c.id !== id));
  };

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
                  <div className="h-[151px] w-full bg-[#f7f9fb] flex items-center justify-center shrink-0 border-y border-[#e9eaeb]">
                    <div className="bg-white p-3 rounded-full shadow-sm flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                        <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/>
                      </svg>
                    </div>
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
