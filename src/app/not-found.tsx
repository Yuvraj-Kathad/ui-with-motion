"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WifiOff, RefreshCcw, Home, Compass } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FBFCFD]">
      <Navbar variant="logged-out" />
      
      <main className="flex-1 w-full flex flex-col lg:flex-row gap-[40px] lg:gap-[86px] items-center justify-center px-[20px] lg:px-[120px] py-[40px] md:py-[72px]">
          
          {/* Left: Illustration Box */}
          <div className="bg-[#1F2123] flex flex-col h-auto lg:h-[480px] w-full lg:w-[480px] xl:w-[560px] items-start justify-between overflow-clip px-[24px] py-[28px] lg:px-[30px] relative rounded-[32px] lg:rounded-[48px] shrink-0">
            {/* Background elements */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
              <div className="size-[200px] lg:size-[360px] rounded-full border border-[#FFFFFF]/20" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[140px] lg:size-[254px] rounded-full border border-[#FFFFFF]/20" />
            </div>

            <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full z-10">
              <div className="bg-[#F4C742] flex gap-[8px] items-center px-[13px] py-[9px] rounded-full shrink-0">
                <div className="shrink-0 size-[8px] bg-[#1F2123] rounded-full animate-pulse" />
                <p className="font-sans font-bold leading-[1.2] text-[#454545] text-[12px] uppercase tracking-wider">
                  404 ERROR
                </p>
              </div>
              <p className="font-sans font-medium leading-[1.2] text-[14px] text-white">
                404%
              </p>
            </div>
            
            <div className="flex flex-1 w-full h-[250px] items-center justify-center relative shrink-0 z-10">
              <div className="bg-[#F4C742] flex items-center justify-center relative rounded-full size-[140px] lg:size-[184px]">
                <Compass className="size-[64px] lg:size-[104px] text-[#454545] stroke-1" />
                <div className="absolute bg-[#FBFCFD] border-2 border-[#1F2123] flex items-center justify-center rounded-full size-[44px] lg:size-[54px] left-[70%] lg:left-[125px] top-[70%] lg:top-[116px]">
                  <WifiOff className="size-[20px] lg:size-[26px] text-[#454545] stroke-2" />
                </div>
              </div>
            </div>
            
            <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full z-10">
              <p className="font-sans font-medium leading-[1.2] text-[12px] text-[#7D7F82] tracking-wider uppercase">
                PAGE / UNKNOWN
              </p>
              <div className="bg-[#FBFCFD] flex gap-[7px] items-center px-[12px] py-[8px] rounded-full shrink-0">
                <RefreshCcw className="size-[14px] text-[#454545]" />
                <p className="font-sans font-medium leading-[1.2] text-[#454545] text-[12px] uppercase">
                  READY TO RETRY
                </p>
              </div>
            </div>
          </div>

          {/* Right: Message Content */}
          <div className="flex flex-[1_0_0] flex-col gap-[28px] items-start min-w-px overflow-clip relative">
            <div className="flex flex-col gap-[12px] items-start overflow-clip relative shrink-0 w-full">
              <div className="flex gap-[10px] items-center relative shrink-0">
                <div className="bg-[#F4C742] rounded-full shrink-0 size-[10px]" />
                <p className="font-sans font-medium leading-[1.2] text-[#454545] text-[14px]">
                  Page not found
                </p>
              </div>
              <h1 className="font-title font-medium leading-[1.1] text-[#454545] text-[48px] lg:text-[61px]">
                You've wandered off-path.
              </h1>
              <p className="font-sans font-medium leading-[1.4] text-[#7D7F82] text-[18px] lg:text-[20px] w-full max-w-[520px]">
                We can't find the page you're looking for right now. Check the URL, then try once more.
              </p>
            </div>

            {/* Checks */}
            <div className="flex flex-col sm:flex-row gap-[10px] items-start sm:items-center w-full font-sans font-medium">
              <div className="bg-[#FBFCFD] border border-[#DEE1E4] flex flex-1 flex-col gap-[4px] px-[14px] py-[13px] rounded-[16px] w-full">
                <p className="text-[#454545] text-[14px]">URL</p>
                <p className="text-[#7D7F82] text-[13px]">Check for typos</p>
              </div>
              <div className="bg-[#FBFCFD] border border-[#DEE1E4] flex flex-1 flex-col gap-[4px] px-[14px] py-[13px] rounded-[16px] w-full">
                <p className="text-[#454545] text-[14px]">Search</p>
                <p className="text-[#7D7F82] text-[13px]">Find what you need</p>
              </div>
              <div className="bg-[#FBFCFD] border border-[#DEE1E4] flex flex-1 flex-col gap-[4px] px-[14px] py-[13px] rounded-[16px] w-full">
                <p className="text-[#454545] text-[14px]">Home</p>
                <p className="text-[#7D7F82] text-[13px]">Start over fresh</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-[12px] items-center mt-2">
              <button onClick={() => router.back()} className="bg-[#1F2123] hover:bg-black transition-colors flex gap-[8px] items-center justify-center px-[24px] py-[14px] rounded-[40px]">
                <p className="font-sans font-medium leading-[1.2] text-[16px] text-white">
                  Go back
                </p>
              </button>
              <Link href="/" className="bg-[#EEF1F4] hover:bg-[#E2E6EB] transition-colors flex items-center justify-center px-[32px] py-[14px] rounded-[40px]">
                <p className="font-sans font-semibold leading-[1.2] text-[#454545] text-[16px]">
                  Return home
                </p>
              </Link>
            </div>
          </div>
      </main>
      
      <Footer />
    </div>
  );
}



