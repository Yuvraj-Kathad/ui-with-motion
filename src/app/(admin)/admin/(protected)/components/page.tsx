import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function AdminComponentsPage() {
  // Hardcoded mock data for Phase 2 visual presentation
  const components = []; // Set to empty to show zero-state for now

  return (
    <div className="flex flex-col h-full bg-[#F6F7F8]">
      {/* Header */}
      <header className="h-[96px] bg-white border-b border-[#E9EAEB] px-8 flex items-center justify-between shrink-0">
        <h1 className="text-2xl font-bold text-[#111111]">Components</h1>
        <Link
          href="/admin/components/create"
          className="flex items-center gap-2 bg-[#1F2123] text-white px-5 py-2.5 rounded-[44px] text-sm font-medium transition-opacity hover:opacity-90"
        >
          <Plus className="w-4 h-4" />
          Create component
        </Link>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-8 flex flex-col">
        {components.length === 0 ? (
          /* Zero State (Figma 1023:3368) */
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
          /* Component Listing State (Figma 1110:2815) - To be implemented with CRUD in Phase 3 */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Cards will go here */}
          </div>
        )}
      </div>
    </div>
  );
}
