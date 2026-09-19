"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, XCircle, Plus, Minus, ChevronRight } from "lucide-react";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What is included in the free plan?",
      answer: "Access to 10 curated basic UI components for personal exploration."
    },
    {
      question: "Is the premium plan really lifetime?",
      answer: "Single payment for all 50+ components, variants, and future releases forever."
    },
    {
      question: "Can I use components in commercial projects?",
      answer: "Full commercial license for client work, SaaS apps, and websites."
    },
    {
      question: "How do I get updates?",
      answer: "Automatically rolled out via dashboard with instant access to new components/Figma files."
    },
    {
      question: "Can I get a refund?",
      answer: "14-day money-back guarantee with full refund."
    },
    {
      question: "Do you offer team pricing?",
      answer: "Group discounts for studios, agencies, and teams."
    }
  ];

  return (
    <div className="w-full bg-[#F7F9FB] flex flex-col items-center">
      
      {/* 2. Hero Section */}
      <section className="w-full max-w-[1440px] pt-[96px] pb-[64px] px-6 md:px-[120px] flex flex-col items-center gap-[20px]">
        <h1 className="font-sans font-bold text-[49px] leading-[1.2] text-[#1F2123] text-center">
          Simple pricing. Powerful components.
        </h1>
        <p className="font-sans font-medium text-[20px] leading-[1.4] text-[#7D7F82] max-w-[640px] text-center">
          Get production-ready UI components with Next.js, HTML & CSS code, and Figma designs — all in one place.
        </p>
        
        {/* Billing Period Switcher */}
        <div className="mt-4 flex items-center bg-[#F2F3F5] rounded-[24px] p-[4px] w-fit mx-auto">
          <button 
            onClick={() => setBillingCycle("monthly")}
            className={`px-[24px] py-[10px] rounded-[20px] transition-all duration-300 ${billingCycle === "monthly" ? "bg-white shadow-[0px_1px_3px_rgba(0,0,0,0.08)] font-sans font-semibold text-[14px] text-[#1F2123]" : "font-sans font-medium text-[14px] text-[#7D7F82]"}`}
          >
            Monthly
          </button>
          <button 
            onClick={() => setBillingCycle("yearly")}
            className={`px-[24px] py-[10px] rounded-[20px] transition-all duration-300 ${billingCycle === "yearly" ? "bg-white shadow-[0px_1px_3px_rgba(0,0,0,0.08)] font-sans font-semibold text-[14px] text-[#1F2123]" : "font-sans font-medium text-[14px] text-[#7D7F82]"}`}
          >
            Yearly — Save 37%
          </button>
        </div>
      </section>

      {/* 3. Pricing Cards Section */}
      <section className="w-full max-w-[1440px] pb-[96px] px-6 md:px-[120px] flex flex-col lg:flex-row items-start justify-center gap-[40px]">
        
        {/* Free Plan Card */}
        <div className="w-full max-w-[520px] bg-white border border-[#DEE1E4] rounded-[32px] p-[40px] shadow-[0px_12px_12px_rgba(31,33,35,0.03)] flex flex-col gap-[28px] mt-0 lg:mt-[117.5px]">
          <div className="flex flex-col gap-2">
            <h2 className="font-sans font-bold text-[24px] text-[#1F2123]">Free</h2>
            <p className="font-sans font-medium text-[15px] text-[#7D7F82]">Explore the library and start building for free.</p>
          </div>
          
          <div className="flex items-end gap-2">
            <span className="font-inter font-bold text-[56px] leading-[1] text-[#1F2123]">₹0</span>
            <span className="font-sans font-medium text-[16px] text-[#7D7F82] mb-2">Forever</span>
          </div>
          
          <button className="w-full bg-[#1F2123] hover:bg-black transition-colors text-white font-sans font-medium text-[16px] rounded-[40px] py-[12px]">
            Get Started — Free
          </button>
          
          <div className="w-full h-[1px] bg-[#DEE1E4]" />
          
          <div className="flex flex-col gap-[16px]">
            <h3 className="font-sans font-bold text-[16px] text-[#1F2123]">What's included:</h3>
            {[
              "Free components",
              "Next.js code",
              "HTML & CSS code",
              "Component previews",
              "Figma links for free components",
              "Personal & commercial projects",
              "Regular library updates"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-[12px]">
                <div className="size-[20px] rounded-[10px] bg-[#DB7100]/10 flex items-center justify-center shrink-0">
                  <Check size={12} className="text-[#DB7100]" strokeWidth={3} />
                </div>
                <span className="font-sans font-medium text-[14px] text-[#1F2123]">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Premium Plan Card */}
        <div className="relative w-full max-w-[520px] bg-white border-2 border-[#DB7100] rounded-[32px] p-[40px] shadow-[0px_16px_16px_rgba(219,113,0,0.1)] flex flex-col gap-[28px]">
          <div className="absolute top-[-18px] right-[30px] bg-[#DB7100] rounded-[20px] px-[16px] py-[6px]">
            <span className="font-sans font-bold text-[12px] uppercase text-white tracking-wider">MOST POPULAR</span>
          </div>
          
          <div className="flex flex-col gap-2">
            <h2 className="font-sans font-bold text-[24px] text-[#DB7100]">Premium</h2>
            <p className="font-sans font-medium text-[15px] text-[#7D7F82]">Unlock the complete component library and build faster.</p>
          </div>
          
          <div className="flex flex-col gap-1">
            <div className="flex items-end gap-2">
              <span className="font-inter font-bold text-[56px] leading-[1] text-[#1F2123]">
                {billingCycle === "monthly" ? "₹399" : "₹2,999"}
              </span>
              <span className="font-sans font-medium text-[16px] text-[#7D7F82] mb-2">
                {billingCycle === "monthly" ? "/month" : "/year"}
              </span>
            </div>
            {billingCycle === "monthly" ? (
              <p className="font-sans font-medium text-[15px] text-[#7D7F82]">or ₹2,999/year</p>
            ) : (
              <p className="font-sans font-medium text-[13px] text-[#21B873]">Save ₹1,789 with yearly billing</p>
            )}
          </div>
          
          <button className="w-full bg-[#1F2123] hover:bg-black transition-colors text-white font-sans font-medium text-[16px] rounded-[40px] py-[12px]">
            Get Premium
          </button>
          
          <div className="w-full h-[1px] bg-[#DEE1E4]" />
          
          <div className="flex flex-col gap-[16px]">
            <h3 className="font-sans font-bold text-[16px] text-[#1F2123]">Everything included:</h3>
            {[
              "All UI components",
              "Next.js code",
              "HTML & CSS code",
              "Figma files",
              "Advanced & animated components",
              "All component variants",
              "Design tokens & styles",
              "Personal & commercial projects",
              "New components & updates",
              "Premium templates",
              "Priority support"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-[12px]">
                <div className="size-[20px] rounded-[10px] bg-[#DB7100]/10 flex items-center justify-center shrink-0">
                  <Check size={12} className="text-[#DB7100]" strokeWidth={3} />
                </div>
                <span className="font-sans font-medium text-[14px] text-[#1F2123]">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 4. Comparison Table Section */}
      <section className="w-full bg-white border-t border-b border-[#DEE1E4] py-[80px] lg:pt-[80px] lg:pb-[96px] px-6 flex flex-col items-center">
        <div className="w-full max-w-[1000px] flex flex-col gap-[40px] items-center">
          <div className="flex flex-col items-center gap-[16px]">
            <h2 className="font-title font-bold text-[49px] leading-[1.2] text-[#1F2123] text-center">Compare plans in detail</h2>
            <p className="font-sans font-medium text-[16px] text-[#7D7F82] text-center">Discover why creators choose Premium to supercharge their workflows</p>
          </div>
          
          <div className="w-full bg-[#F7F9FB] border border-[#DEE1E4] rounded-[20px] overflow-hidden">
            {/* Header Row */}
            <div className="w-full bg-[#1F2123] px-[24px] py-[20px] flex items-center">
              <div className="flex-1 font-sans font-bold text-[16px] text-white">Features & Capabilities</div>
              <div className="w-[120px] md:w-[220px] text-center font-sans font-bold text-[16px] text-white">Free Plan</div>
              <div className="w-[120px] md:w-[220px] text-center font-sans font-bold text-[16px] text-[#DB7100]">Premium Plan</div>
            </div>
            
            {/* Rows */}
            {[
              { name: "Components", free: "10 free components", premium: "All 50+ components" },
              { name: "Animations", free: "Static only", premium: "Full interactive" },
              { name: "Updates", free: "Monthly free drops", premium: "Lifetime updates" },
              { name: "Support", free: "Community forum", premium: "Priority email" },
              { name: "License", free: "Personal use", premium: "Commercial use" },
              { name: "Documentation", free: "Basic docs", premium: "Full guides" },
              { name: "Source Files", free: <XCircle size={20} className="text-[#7D7F82] mx-auto" />, premium: <Check size={20} className="text-[#1F2123] mx-auto" strokeWidth={3} /> },
            ].map((row, i, arr) => (
              <div key={i} className={`w-full flex items-center px-[24px] py-[16px] ${i !== arr.length - 1 ? 'border-b border-[#DEE1E4]' : ''}`}>
                <div className="flex-1 font-sans font-medium text-[14px] md:text-[16px] text-[#1F2123]">{row.name}</div>
                <div className="w-[120px] md:w-[220px] text-center font-sans font-medium text-[13px] md:text-[15px] text-[#7D7F82]">{row.free}</div>
                <div className="w-[120px] md:w-[220px] text-center font-sans font-medium text-[13px] md:text-[15px] text-[#1F2123]">{row.premium}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQ Section */}
      <section className="w-full bg-[#F7F9FB] py-[96px] px-6 flex flex-col items-center gap-[48px]">
        <div className="flex flex-col items-center gap-[16px]">
          <h2 className="font-title font-bold text-[49px] leading-[1.2] text-[#1F2123] text-center">Frequently Asked Questions</h2>
          <p className="font-sans font-medium text-[16px] text-[#7D7F82] text-center">Have some questions? We've got answers.</p>
        </div>
        
        <div className="w-full max-w-[900px] flex flex-col gap-[20px]">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="w-full bg-white border border-[#DEE1E4] rounded-[16px] p-[24px] cursor-pointer transition-colors hover:border-[#1F2123]/20"
              onClick={() => toggleFaq(i)}
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-sans font-semibold text-[18px] text-[#1F2123]">{faq.question}</h3>
                <div className="w-[28px] h-[28px] rounded-[14px] bg-[#F7F9FB] flex items-center justify-center shrink-0">
                  {openFaq === i ? <Minus size={14} className="text-[#1F2123]" /> : <Plus size={14} className="text-[#1F2123]" />}
                </div>
              </div>
              
              {openFaq === i && (
                <div className="pt-[16px]">
                  <p className="font-sans font-medium text-[15px] leading-[1.5] text-[#7D7F82]">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 6. CTA Banner Section */}
      <section className="w-full bg-[#1F2123] px-6 md:px-[120px] py-[80px] flex flex-col items-center justify-center gap-[16px]">
        <h2 
          className="font-title font-medium text-[39px] leading-[1.2] text-center text-white max-w-[800px]"
          style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}
        >
          Explore the library, copy the code, customize it, and ship.
        </h2>
        <Link 
          href="/components"
          className="w-[240px] h-[48px] rounded-[40px] bg-white shadow-[inset_0px_-4px_4px_0px_rgba(103,103,103,0.1),inset_0px_4px_4px_0px_rgba(103,103,103,0.1)] flex items-center justify-center gap-[10px] hover:bg-gray-50 transition-colors mt-[16px]"
        >
          <span className="font-sans font-medium text-[16px] leading-[1.2] text-[#1F2123]">Explore Components</span>
          <ChevronRight size={24} className="text-[#1F2123]" />
        </Link>
      </section>

    </div>
  );
}

