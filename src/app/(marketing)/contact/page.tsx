import React from "react";
import Link from "next/link";
import { ChevronRight, Mail, Phone } from "lucide-react";

export const metadata = {
  title: "Contact Us - UX With Motion",
  description: "Have questions about our premium UI components? Reach out to our design and engineering team.",
};

export default function ContactUsPage() {
  return (
    <div className="w-full bg-white flex flex-col items-center">
      
      {/* B. Hero Section */}
      <section className="w-full bg-[#F7F9FB] border-b border-[#E6E9EC] pt-[80px] pb-[40px] px-6 md:px-[120px] flex flex-col items-center gap-[16px]">
        <h1 className="font-title font-bold text-[49px] leading-[1.2] text-[#1F2123] text-center">
          Get in Touch
        </h1>
        <p className="font-inter font-normal text-[18px] text-[#626467] max-w-[640px] text-center">
          Have questions about our premium UI components? Reach out to our design and engineering team. We're here to help you move faster.
        </p>
      </section>

      {/* C. Main Split Section */}
      <section className="w-full max-w-[1440px] bg-white px-6 md:px-[120px] pt-[80px] pb-[100px] flex flex-col lg:flex-row gap-[80px] items-start">
        
        {/* Left Column — Contact Form Panel */}
        <div className="flex-1 w-full bg-[#FBFCFD] border border-[#D7DADC] rounded-[32px] p-6 md:p-[40px] flex flex-col gap-[24px]">
          <div className="flex flex-col gap-2">
            <h2 className="font-sans font-bold text-[24px] text-[#1F2123]">Send us a message</h2>
            <p className="font-inter font-normal text-[14px] text-[#7D7F82]">We usually respond within 24 business hours.</p>
          </div>

          <form className="flex flex-col gap-[20px]">
            <div className="flex flex-col gap-2">
              <label htmlFor="fullName" className="font-sans font-semibold text-[14px] text-[#1F2123]">Full Name</label>
              <input 
                type="text" 
                id="fullName"
                placeholder="e.g. Sarah Connor"
                className="h-[48px] px-[16px] py-[12px] rounded-[24px] bg-[#EEF1F4] border border-[#DEE1E4] focus:outline-none focus:ring-2 focus:ring-[#1F2123]/10 font-inter text-[14px] text-[#1F2123] placeholder:text-[#7D7F82] transition-colors [&:not(:placeholder-shown)]:bg-[#F1F4F6]"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="emailAddress" className="font-sans font-semibold text-[14px] text-[#1F2123]">Email Address</label>
              <input 
                type="email" 
                id="emailAddress"
                placeholder="e.g. sarah@motion.design"
                className="h-[48px] px-[16px] py-[12px] rounded-[24px] bg-[#EEF1F4] border border-[#DEE1E4] focus:outline-none focus:ring-2 focus:ring-[#1F2123]/10 font-inter text-[14px] text-[#1F2123] placeholder:text-[#7D7F82] transition-colors [&:not(:placeholder-shown)]:bg-[#F1F4F6]"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="subject" className="font-sans font-semibold text-[14px] text-[#1F2123]">Subject</label>
              <input 
                type="text" 
                id="subject"
                placeholder="How can we help you?"
                className="h-[48px] px-[16px] py-[12px] rounded-[24px] bg-[#EEF1F4] border border-[#DEE1E4] focus:outline-none focus:ring-2 focus:ring-[#1F2123]/10 font-inter text-[14px] text-[#1F2123] placeholder:text-[#7D7F82] transition-colors [&:not(:placeholder-shown)]:bg-[#F1F4F6]"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="font-sans font-semibold text-[14px] text-[#1F2123]">Message</label>
              <textarea 
                id="message"
                placeholder="Tell us more about your project or enquiry..."
                className="h-[140px] p-[16px] rounded-[16px] bg-[#EEF1F4] border border-[#DEE1E4] focus:outline-none focus:ring-2 focus:ring-[#1F2123]/10 font-inter text-[14px] text-[#1F2123] placeholder:text-[#7D7F82] resize-none leading-[20px]"
              />
            </div>

            <div className="pt-2">
              <button 
                type="button" 
                className="w-full md:w-[240px] px-[16px] py-[12px] rounded-[40px] bg-[#1F2123] hover:bg-black transition-colors flex items-center justify-center gap-[8px]"
              >
                <span className="font-sans font-medium text-[16px] leading-[1.2] text-white">Submit Message</span>
                <ChevronRight size={24} className="text-white" />
              </button>
            </div>
          </form>
        </div>

        {/* Right Column — Info Column */}
        <div className="w-full lg:w-[480px] shrink-0 flex flex-col gap-[16px]">
          {/* Card 1: Email */}
          <div className="bg-[#FBFCFD] border border-[#D7DADC] rounded-[24px] p-[24px] flex gap-[20px] items-start">
            <div className="w-[48px] py-[8px] rounded-[24px] bg-[#EEF1F4] flex items-center justify-center shrink-0">
              <Mail size={20} className="text-[#1F2123]" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-inter font-medium text-[12px] uppercase tracking-wider text-[#7D7F82]">
                GENERAL ENQUIRIES
              </span>
              <span className="font-sans font-bold text-[18px] text-[#1F2123]">
                uxwithmotion@gmail.com
              </span>
            </div>
          </div>

          {/* Card 2: Phone */}
          <div className="bg-[#FBFCFD] border border-[#D7DADC] rounded-[24px] p-[24px] flex gap-[20px] items-start">
            <div className="w-[48px] py-[8px] rounded-[24px] bg-[#EEF1F4] flex items-center justify-center shrink-0">
              <Phone size={20} className="text-[#1F2123]" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-inter font-medium text-[12px] uppercase tracking-wider text-[#7D7F82]">
                PHONE SUPPORT
              </span>
              <span className="font-sans font-bold text-[18px] text-[#1F2123]">
                +91 76009 83416
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* D. Pre-Footer Banner */}
      <section className="w-full bg-[#1F2123] px-6 md:px-[120px] py-[64px] flex flex-col items-center justify-center gap-[16px]">
        <h2 
          className="font-title font-medium text-[39px] leading-[1.2] text-center text-white"
          style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}
        >
          Want to explore our components first?
        </h2>
        <Link 
          href="/components"
          className="w-[240px] py-[12px] rounded-[40px] bg-white shadow-[inset_0px_-4px_4px_0px_rgba(103,103,103,0.1),inset_0px_4px_4px_0px_rgba(103,103,103,0.1)] flex items-center justify-center gap-[10px] hover:bg-gray-50 transition-colors"
        >
          <span className="font-sans font-medium text-[16px] leading-[1.2] text-[#1F2123]">Browse Components</span>
          <ChevronRight size={24} className="text-[#1F2123]" />
        </Link>
      </section>

    </div>
  );
}

