"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Play, Edit, Trash2 } from "lucide-react";
import { getAdminComponents } from "@/lib/admin/components/queries";
import { archiveComponent } from "@/lib/admin/components/mutations";
import { componentRegistry } from "@/lib/registry/components";
import { ComponentCard } from "@/components/ui/ComponentCard";

export default function AdminComponentsPage() {
  const [components, setComponents] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadComponents() {
      try {
        const data = await getAdminComponents();
        setComponents(data || []);
      } catch (err: any) {
        setError(err.message || "Failed to load components");
      } finally {
        setIsLoaded(true);
      }
    }
    loadComponents();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await archiveComponent(id);
      const data = await getAdminComponents();
      setComponents(data || []);
    } catch (err: any) {
      alert("Failed to archive component: " + err.message);
    }
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
        {error && (
          <div className="mb-4 p-4 text-red-500 bg-red-50 rounded-lg">
            {error}
          </div>
        )}
        
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
              const isPublish = comp.status === "published";
              const registryEntry = componentRegistry[comp.registry_id];
              const RegisteredComponent = registryEntry?.component;
              
              return (
                <div key={comp.id} className="bg-[#fbfcfd] border border-[#b7babd] flex flex-col gap-px items-start relative rounded-[12px] w-full overflow-hidden">
                  
                  {/* Card Header (Status + Actions) */}
                  <div className="flex items-center justify-between p-[8px] relative w-full shrink-0">
                    <div className={`flex items-center px-[8px] py-[4px] rounded-[4px] shrink-0 ${isPublish ? "bg-[#00963d]" : comp.status === "archived" ? "bg-red-500 text-white" : "bg-white border border-[#d7dadc]"}`}>
                      <p className={`font-work font-normal leading-[1.2] text-[13px] whitespace-nowrap ${isPublish || comp.status === "archived" ? "text-white" : "text-[#7d7f82]"}`}>
                        {comp.status.charAt(0).toUpperCase() + comp.status.slice(1)}
                      </p>
                    </div>
                    
                    <div className="flex gap-[6px] items-center relative shrink-0 text-[#1f2123]">
                      <Link href={`/admin/components/${comp.id}/edit`} className="flex items-center justify-center w-[34px] h-[34px] rounded-full hover:bg-black/5 transition-colors">
                        <Edit className="w-[18px] h-[18px]" />
                      </Link>
                      <button 
                        onClick={() => handleDelete(comp.id)}
                        className="flex items-center justify-center w-[34px] h-[34px] rounded-full hover:bg-red-50 text-[#1f2123] hover:text-red-500 transition-colors"
                        title="Archive"
                      >
                        <Trash2 className="w-[18px] h-[18px]" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Preview Area */}
                  <div className="h-[151px] w-full bg-[#f7f9fb] relative flex items-center justify-center shrink-0 border-y border-[#e9eaeb]">
                    {RegisteredComponent ? (
                      <ComponentCard id={comp.id} title={comp.title} tags={comp.tags?.map((t: string) => ({label: t}))}>
                        <RegisteredComponent />
                      </ComponentCard>
                    ) : (
                      <p className="text-gray-500">Unregistered Component: {comp.registry_id}</p>
                    )}
                  </div>
                  
                  {/* Card Footer */}
                  <div className="flex items-center justify-between px-[20px] py-[12px] relative w-full shrink-0 bg-white">
                    <p className="font-sans font-medium leading-[1.2] text-[20px] text-black whitespace-nowrap truncate">
                      {comp.title}
                    </p>
                    <div className="flex gap-[4px] h-[24px] items-center shrink-0">
                      {(comp.tags || []).map((tag: string, i: number) => (
                        <div key={i} className="bg-white border border-[#eef1f4] flex items-center px-[6px] py-[4px] rounded-[4px]">
                          <p className="font-work font-normal leading-[1.2] text-[#7d7f82] text-[12px] whitespace-nowrap">{tag}</p>
                        </div>
                      ))}
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
