import React from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function EditComponentPage() {
  return (
    <div className="flex flex-col h-full bg-[#F6F7F8]">
      {/* Header */}
      <header className="h-[96px] bg-white border-b border-[#E9EAEB] px-8 flex items-center shrink-0">
        <Link
          href="/admin/components"
          className="mr-4 text-[#888888] hover:text-[#111111] transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-bold text-[#111111]">Update &ldquo;star button&rdquo;</h1>
      </header>

      {/* Main Content Area - Split Pane */}
      <div className="flex-1 overflow-hidden p-8 flex gap-8">
        
        {/* Left Pane - Preview */}
        <div className="flex-1 bg-white rounded-2xl border border-[#E9EAEB] flex flex-col overflow-hidden">
          <div className="p-6 border-b border-[#E9EAEB]">
            <h2 className="text-xl font-medium text-[#888888]">Preview</h2>
          </div>
          <div className="flex-1 flex items-center justify-center bg-[#FAFAFA] p-6">
            <button className="bg-[#10B981] text-white px-6 py-2.5 rounded-full font-medium text-sm transition-opacity hover:opacity-90 shadow-sm">
              Continue
            </button>
          </div>
        </div>

        {/* Right Pane - Code & Config */}
        <div className="flex-1 bg-white rounded-2xl border border-[#E9EAEB] flex flex-col overflow-hidden relative">
          {/* Tabs Area */}
          <div className="p-4 border-b border-[#E9EAEB] flex gap-2">
            <button className="bg-[#1F2123] text-white px-4 py-1.5 rounded-full text-xs font-medium">
              Html & css
            </button>
            <button className="bg-[#F6F7F8] text-[#888888] px-4 py-1.5 rounded-full text-xs font-medium hover:bg-[#E9EAEB] transition-colors">
              Next js
            </button>
            <div className="flex-1" />
            <button className="bg-[#1F2123] text-white px-4 py-1.5 rounded-full text-xs font-medium">
              Customisation
            </button>
          </div>

          {/* Code Snippet Area */}
          <div className="flex-1 bg-[#1F2123] flex items-center justify-center">
            <span className="font-mono text-[44px] text-white font-bold">code</span>
          </div>

          {/* Action Footer */}
          <div className="h-[80px] bg-white border-t border-[#E9EAEB] flex items-center justify-end px-6 gap-4">
            <button className="bg-[#F6F7F8] text-[#888888] px-6 py-2.5 rounded-[44px] text-sm font-medium hover:bg-[#E9EAEB] transition-colors">
              Publish
            </button>
            <button className="bg-[#1F2123] text-white px-6 py-2.5 rounded-[44px] text-sm font-medium hover:opacity-90 transition-opacity">
              Save as Draft
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
