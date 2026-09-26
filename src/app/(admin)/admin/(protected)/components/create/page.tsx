"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getAdminComponents } from "@/lib/admin/components/queries";
import { BuilderProvider } from "@/components/admin/builder/BuilderContext";
import { BuilderShell } from "@/components/admin/builder/BuilderShell";

export default function CreateComponentPage() {
  const [existingIds, setExistingIds] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getAdminComponents()
      .then((comps) => {
        setExistingIds(new Set(comps.map((c: any) => c.registry_id)));
        setIsLoaded(true);
      })
      .catch(console.error);
  }, []);

  if (!isLoaded) return <div className="flex-1 bg-[#F6F7F8]" />;

  return (
    <div className="flex flex-col h-full bg-[#F6F7F8]">
      {/* Header */}
      <header className="h-[63px] bg-white border-b border-[#E9EAEB] px-8 flex items-center shrink-0">
        <Link
          href="/admin/components"
          className="mr-4 text-[#888888] hover:text-[#111111] transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-bold text-[#111111]">Create new component</h1>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden relative">
        <BuilderProvider initialState={{ status: "draft", currentStep: 1 }}>
          <BuilderShell existingIds={existingIds} />
        </BuilderProvider>
      </div>
    </div>
  );
}
