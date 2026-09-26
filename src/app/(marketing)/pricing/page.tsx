"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Check, XCircle, Plus, Minus, ChevronRight } from "lucide-react";
import { PaymentPageContent, defaultPaymentContent } from "@/components/admin/payment/types";
import { createClient } from "@/lib/supabase/browser";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [content, setContent] = useState<PaymentPageContent>(defaultPaymentContent);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase.from('payment_page_content').select('content').eq('id', 1).single();
        if (data && data.content) {
          setContent(data.content);
        } else {
          // Fallback to local storage if nothing in DB yet
          const saved = localStorage.getItem("payment_page_content");
          if (saved) setContent(JSON.parse(saved));
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoaded(true);
      }
    };

    loadContent();
    window.addEventListener("payment_content_updated", loadContent);
    return () => {
      window.removeEventListener("payment_content_updated", loadContent);
    };
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  if (!isLoaded) return <div className="w-full bg-[#F7F9FB] min-h-screen" />; // Loading state

  return (
    <div className="w-full bg-[#F7F9FB] flex flex-col items-center">
      
      {/* 2. Hero Section */}
      <section className="w-full max-w-[1440px] pt-[96px] pb-[64px] px-6 md:px-[120px] flex flex-col items-center gap-[20px]">
        <h1 className="font-sans font-bold text-[49px] leading-[1.2] text-[#1F2123] text-center">
          {content.hero.title}
        </h1>
        <p className="font-sans font-medium text-[20px] leading-[1.4] text-[#7D7F82] max-w-[640px] text-center whitespace-pre-wrap">
          {content.hero.subtitle}
        </p>
        
        {/* Billing Period Switcher */}
        <div className="mt-4 flex items-center bg-[#F2F3F5] rounded-[24px] p-[4px] w-fit mx-auto">
          <button 
            onClick={() => setBillingCycle("monthly")}
            className={`px-[24px] py-[10px] rounded-[20px] transition-all duration-300 ${billingCycle === "monthly" ? "bg-white shadow-[0px_1px_3px_rgba(0,0,0,0.08)] font-sans font-semibold text-[14px] text-[#1F2123]" : "font-sans font-medium text-[14px] text-[#7D7F82]"}`}
          >
            {content.hero.toggleLabelMonthly}
          </button>
          <button 
            onClick={() => setBillingCycle("yearly")}
            className={`px-[24px] py-[10px] rounded-[20px] transition-all duration-300 ${billingCycle === "yearly" ? "bg-white shadow-[0px_1px_3px_rgba(0,0,0,0.08)] font-sans font-semibold text-[14px] text-[#1F2123]" : "font-sans font-medium text-[14px] text-[#7D7F82]"}`}
          >
            {content.hero.toggleLabelYearly}
          </button>
        </div>
      </section>

      {/* 3. Pricing Cards Section */}
      <section className="w-full max-w-[1440px] pb-[96px] px-6 md:px-[120px] flex flex-col lg:flex-row items-start justify-center gap-[40px]">
        
        {/* Free Plan Card */}
        <div className="w-full max-w-[520px] bg-white border border-[#DEE1E4] rounded-[32px] p-[40px] shadow-[0px_12px_12px_rgba(31,33,35,0.03)] flex flex-col gap-[28px] mt-0 lg:mt-[117.5px]">
          <div className="flex flex-col gap-2">
            <h2 className="font-sans font-bold text-[24px] text-[#1F2123]">{content.freePlan.name}</h2>
            <p className="font-sans font-medium text-[15px] text-[#7D7F82] whitespace-pre-wrap">{content.freePlan.description}</p>
          </div>
          
          <div className="flex items-end gap-2">
            <span className="font-inter font-bold text-[56px] leading-[1] text-[#1F2123]">{content.freePlan.price}</span>
            <span className="font-sans font-medium text-[16px] text-[#7D7F82] mb-2">{content.freePlan.priceLabel}</span>
          </div>
          
          <button className="w-full bg-[#1F2123] hover:bg-black transition-colors text-white font-sans font-medium text-[16px] rounded-[40px] py-[12px]">
            {content.freePlan.buttonText}
          </button>
          
          <div className="w-full h-[1px] bg-[#DEE1E4]" />
          
          <div className="flex flex-col gap-[16px]">
            <h3 className="font-sans font-bold text-[16px] text-[#1F2123]">{content.freePlan.featuresTitle}</h3>
            {content.freePlan.features.map((feature, i) => (
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
            <span className="font-sans font-bold text-[12px] uppercase text-white tracking-wider">{content.premiumPlan.badgeText}</span>
          </div>
          
          <div className="flex flex-col gap-2">
            <h2 className="font-sans font-bold text-[24px] text-[#DB7100]">{content.premiumPlan.name}</h2>
            <p className="font-sans font-medium text-[15px] text-[#7D7F82] whitespace-pre-wrap">{content.premiumPlan.description}</p>
          </div>
          
          <div className="flex flex-col gap-1">
            <div className="flex items-end gap-2">
              <span className="font-inter font-bold text-[56px] leading-[1] text-[#1F2123]">
                {billingCycle === "monthly" ? content.premiumPlan.monthlyPrice : (content.premiumPlan.yearlyPriceBig || "₹2,999")}
              </span>
              <span className="font-sans font-medium text-[16px] text-[#7D7F82] mb-2">
                {billingCycle === "monthly" ? content.premiumPlan.pricePeriod : "/year"}
              </span>
            </div>
            {billingCycle === "monthly" ? (
              <p className="font-sans font-medium text-[15px] text-[#7D7F82]">{content.premiumPlan.yearlyPrice}</p>
            ) : (
              <p className="font-sans font-medium text-[13px] text-[#21B873]">{content.premiumPlan.savingsNote}</p>
            )}
          </div>
          
          <button className="w-full bg-[#1F2123] hover:bg-black transition-colors text-white font-sans font-medium text-[16px] rounded-[40px] py-[12px]">
            {content.premiumPlan.buttonText}
          </button>
          
          <div className="w-full h-[1px] bg-[#DEE1E4]" />
          
          <div className="flex flex-col gap-[16px]">
            <h3 className="font-sans font-bold text-[16px] text-[#1F2123]">{content.premiumPlan.featuresTitle}</h3>
            {content.premiumPlan.features.map((feature, i) => (
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
            <h2 className="font-title font-bold text-[49px] leading-[1.2] text-[#1F2123] text-center">{content.comparison.title}</h2>
            <p className="font-sans font-medium text-[16px] text-[#7D7F82] text-center">{content.comparison.subtitle}</p>
          </div>
          
          <div className="w-full bg-[#F7F9FB] border border-[#DEE1E4] rounded-[20px] overflow-hidden">
            {/* Header Row */}
            <div className="w-full bg-[#1F2123] px-[24px] py-[20px] flex items-center">
              <div className="flex-1 font-sans font-bold text-[16px] text-white">Features & Capabilities</div>
              <div className="w-[120px] md:w-[220px] text-center font-sans font-bold text-[16px] text-white">Free Plan</div>
              <div className="w-[120px] md:w-[220px] text-center font-sans font-bold text-[16px] text-[#DB7100]">Premium Plan</div>
            </div>
            
            {/* Rows */}
            {content.comparison.rows.map((row, i, arr) => (
              <div key={i} className={`w-full flex items-center px-[24px] py-[16px] ${i !== arr.length - 1 ? 'border-b border-[#DEE1E4]' : ''}`}>
                <div className="flex-1 font-sans font-medium text-[14px] md:text-[16px] text-[#1F2123]">{row.feature}</div>
                <div className="w-[120px] md:w-[220px] text-center font-sans font-medium text-[13px] md:text-[15px] text-[#7D7F82]">
                  {row.free.toLowerCase().includes('cross') || row.free.toLowerCase() === 'no' ? <XCircle size={20} className="text-[#7D7F82] mx-auto" /> : row.free.toLowerCase().includes('check') || row.free.toLowerCase() === 'yes' ? <Check size={20} className="text-[#1F2123] mx-auto" strokeWidth={3} /> : row.free}
                </div>
                <div className="w-[120px] md:w-[220px] text-center font-sans font-medium text-[13px] md:text-[15px] text-[#1F2123]">
                  {row.premium.toLowerCase().includes('cross') || row.premium.toLowerCase() === 'no' ? <XCircle size={20} className="text-[#7D7F82] mx-auto" /> : row.premium.toLowerCase().includes('check') || row.premium.toLowerCase() === 'yes' ? <Check size={20} className="text-[#1F2123] mx-auto" strokeWidth={3} /> : row.premium}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQ Section */}
      <section className="w-full bg-[#F7F9FB] py-[96px] px-6 flex flex-col items-center gap-[48px]">
        <div className="flex flex-col items-center gap-[16px]">
          <h2 className="font-title font-bold text-[49px] leading-[1.2] text-[#1F2123] text-center">{content.faq.title}</h2>
          <p className="font-sans font-medium text-[16px] text-[#7D7F82] text-center">{content.faq.subtitle}</p>
        </div>
        
        <div className="w-full max-w-[900px] flex flex-col gap-[20px]">
          {content.faq.items.map((item, i) => (
            <div 
              key={i} 
              className="w-full bg-white border border-[#DEE1E4] rounded-[16px] p-[24px] cursor-pointer transition-colors hover:border-[#1F2123]/20"
              onClick={() => toggleFaq(i)}
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-sans font-semibold text-[18px] text-[#1F2123]">{item.question}</h3>
                <div className="w-[28px] h-[28px] rounded-[14px] bg-[#F7F9FB] flex items-center justify-center shrink-0">
                  {openFaq === i ? <Minus size={14} className="text-[#1F2123]" /> : <Plus size={14} className="text-[#1F2123]" />}
                </div>
              </div>
              
              {openFaq === i && (
                <div className="pt-[16px]">
                  <p className="font-sans font-medium text-[15px] leading-[1.5] text-[#7D7F82] whitespace-pre-wrap">{item.answer}</p>
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
          {content.cta.title}
        </h2>
        {content.cta.subtitle && (
          <p className="font-sans font-medium text-[18px] text-gray-300 text-center max-w-[600px] whitespace-pre-wrap">
            {content.cta.subtitle}
          </p>
        )}
        <Link 
          href="/components"
          className="w-[240px] h-[48px] rounded-[40px] bg-white shadow-[inset_0px_-4px_4px_0px_rgba(103,103,103,0.1),inset_0px_4px_4px_0px_rgba(103,103,103,0.1)] flex items-center justify-center gap-[10px] hover:bg-gray-50 transition-colors mt-[16px]"
        >
          <span className="font-sans font-medium text-[16px] leading-[1.2] text-[#1F2123]">{content.cta.buttonText}</span>
          <ChevronRight size={24} className="text-[#1F2123]" />
        </Link>
      </section>

    </div>
  );
}
