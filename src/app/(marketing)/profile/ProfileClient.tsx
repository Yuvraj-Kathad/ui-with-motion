"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Camera, Trash2, Check, Heart, Star, Send, ArrowRight } from "lucide-react";
import { ComponentCard } from "@/components/ui/ComponentCard";
import { createClient } from "@/lib/supabase/browser";
import { useRouter } from "next/navigation";

export function ProfileClient({ user }: { user: any }) {
  const supabase = createClient();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [savedIds, setSavedIds] = useState<string[]>([]);
  
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("saved_components") || "[]");
    setSavedIds(saved);
    
    const handleStorageChange = () => {
      const updated = JSON.parse(localStorage.getItem("saved_components") || "[]");
      setSavedIds(updated);
    };
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("saved_components_changed", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("saved_components_changed", handleStorageChange);
    };
  }, []);

  const fullName = user.user_metadata?.full_name || user.user_metadata?.name || "User";
  const [initialFirstName, ...initialLastNames] = fullName.split(" ");
  const initialLastName = initialLastNames.join(" ");

  const email = user.email || "";
  
  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);
  const [avatarUrl, setAvatarUrl] = useState(user.user_metadata?.avatar_url || "/icons/user-placeholder.png");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    const newFullName = `${firstName} ${lastName}`.trim();
    
    const { error } = await supabase.auth.updateUser({
      data: { full_name: newFullName }
    });
    
    if (!error) {
      router.refresh();
    }
    setIsSaving(false);
  };

  const handleCancel = () => {
    setFirstName(initialFirstName);
    setLastName(initialLastName);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    // Instant preview
    const objectUrl = URL.createObjectURL(file);
    setAvatarUrl(objectUrl);

    try {
      // Simulate an upload delay for the UI
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      alert("Profile photo uploads will be enabled in a future update once the storage infrastructure is ready.");
      
      // We keep the local objectUrl preview so they can see what it would look like
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveAvatar = async () => {
    setAvatarUrl("/icons/user-placeholder.png");
    await supabase.auth.updateUser({ data: { avatar_url: null } });
    router.refresh();
  };

  return (
    <div className="w-full bg-[#FBFCFD] min-h-screen">
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-[70px] pt-[48px] pb-[80px]">
        <div className="flex flex-col lg:flex-row gap-[40px] items-start">
          
          {/* Left Column: User Identity Card */}
          <div className="w-full lg:w-[340px] shrink-0 bg-white border border-[#E7E7E7] rounded-[24px] p-[32px] flex flex-col items-center">
            {/* Avatar with Hover Edit */}
            <div className="relative size-[80px] rounded-full overflow-hidden mb-[24px] group cursor-pointer border border-[#E7E7E7]" onClick={() => fileInputRef.current?.click()}>
              {avatarUrl !== "/icons/user-placeholder.png" ? (
                <Image src={avatarUrl} alt={firstName} fill className="object-cover" />
              ) : (
                <div className="size-full bg-[#EEF1F4] flex items-center justify-center">
                  <span className="font-sans font-medium text-[24px] text-[#7D7F82]">{firstName.charAt(0)}</span>
                </div>
              )}
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/65 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                <Camera size={16} className="text-white" />
                <span className="font-sans font-medium text-[10px] text-white tracking-widest">EDIT</span>
              </div>
            </div>
            <input type="file" ref={fileInputRef} onChange={handleUpload} accept="image/*" className="hidden" />
            
            {/* User Info */}
            <h2 className="font-sans font-bold text-[24px] text-black leading-[1.2] mb-1 text-center">{firstName} {lastName}</h2>
            <p className="font-inter text-[14px] text-[#7D7F82] mb-[32px] text-center">{email}</p>
            
            {/* Quick Actions */}
            <div className="flex items-center gap-[16px]">
              <button onClick={() => fileInputRef.current?.click()} disabled={isUploading} className="font-sans font-medium text-[14px] text-black hover:opacity-70 transition-opacity disabled:opacity-50">
                {isUploading ? "Uploading..." : "Upload New"}
              </button>
              <div className="w-[1px] h-[16px] bg-[#D7DADC]" />
              <button onClick={handleRemoveAvatar} className="flex items-center gap-2 font-sans font-medium text-[14px] text-[#F36666] hover:opacity-70 transition-opacity">
                <Trash2 size={16} />
                Remove
              </button>
            </div>
          </div>

          {/* Right Column: Main Stream */}
          <div className="flex-1 flex flex-col w-full gap-[40px]">
            
            {/* Profile Form Section */}
            <div className="bg-white border border-[#E7E7E7] rounded-[32px] p-[32px] flex flex-col gap-[32px]">
              <div>
                <h3 className="font-sans font-bold text-[24px] text-black mb-2">Profile Settings</h3>
                <p className="font-inter text-[14px] text-[#7D7F82]">Update your personal details here.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                <div className="flex flex-col gap-[8px]">
                  <label className="font-sans font-semibold text-[14px] text-[#1F2123]">First Name</label>
                  <input 
                    type="text" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={`w-full h-[48px] px-[16px] py-[12px] rounded-[24px] border border-[#DEE1E4] focus:outline-none focus:ring-2 focus:ring-[#1F2123]/10 font-inter text-[14px] text-[#1F2123] transition-colors ${firstName ? 'bg-[#F1F4F6]' : 'bg-[#EEF1F4]'}`} 
                  />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <label className="font-sans font-semibold text-[14px] text-[#1F2123]">Last Name</label>
                  <input 
                    type="text" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={`w-full h-[48px] px-[16px] py-[12px] rounded-[24px] border border-[#DEE1E4] focus:outline-none focus:ring-2 focus:ring-[#1F2123]/10 font-inter text-[14px] text-[#1F2123] transition-colors ${lastName ? 'bg-[#F1F4F6]' : 'bg-[#EEF1F4]'}`} 
                  />
                </div>
                <div className="flex flex-col gap-[8px] md:col-span-2">
                  <label className="font-sans font-semibold text-[14px] text-[#1F2123]">Email ID</label>
                  <input 
                    type="email" 
                    defaultValue={email}
                    readOnly
                    className={`w-full h-[48px] px-[16px] py-[12px] rounded-[24px] border border-[#DEE1E4] focus:outline-none focus:ring-2 focus:ring-[#1F2123]/10 font-inter text-[14px] text-[#7D7F82] transition-colors opacity-80 cursor-not-allowed ${email ? 'bg-[#F1F4F6]' : 'bg-[#EEF1F4]'}`} 
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-end gap-[16px] pt-2">
                <button onClick={handleCancel} className="font-sans font-medium text-[16px] text-[#7D7F82] hover:text-black transition-colors px-[24px] py-[12px]">
                  Cancel Changes
                </button>
                <button onClick={handleSave} disabled={isSaving || (firstName === initialFirstName && lastName === initialLastName)} className="font-sans font-medium text-[16px] text-white bg-[#1F2123] rounded-[40px] px-[32px] py-[14px] hover:bg-black transition-colors disabled:opacity-50">
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>

            {/* Plan Comparison Section */}
            <div className="bg-white border border-[#E7E7E7] rounded-[32px] p-[32px] flex flex-col gap-[32px]">
              <div>
                <h3 className="font-sans font-bold text-[24px] text-black mb-2">Current Subscription</h3>
                <p className="font-inter text-[14px] text-[#7D7F82]">Manage your billing and plan details.</p>
              </div>
              
              <div className="flex flex-col md:flex-row gap-[24px]">
                {/* Free Plan Card */}
                <div className="flex-1 border border-[#D7DADC] rounded-[24px] p-[24px] flex flex-col items-start relative overflow-hidden bg-white">
                  <h4 className="font-sans font-bold text-[20px] text-black mb-2">Free Plan</h4>
                  <div className="font-sans font-bold text-[32px] text-black mb-[24px]">
                    ₹0<span className="text-[16px] text-[#7D7F82] font-medium">/month</span>
                  </div>
                  
                  <button className="w-full h-[48px] border border-[#D7DADC] rounded-[40px] font-sans font-medium text-[16px] text-[#898B8E] mb-[32px] cursor-default">
                    Current Plan
                  </button>
                  
                  <div className="flex flex-col gap-[16px] w-full">
                    <div className="flex items-center gap-[12px]">
                      <div className="size-[24px] rounded-full bg-[#DB7100]/10 flex items-center justify-center shrink-0">
                        <Check size={14} className="text-[#DB7100]" strokeWidth={3} />
                      </div>
                      <span className="font-inter text-[14px] text-black">Access to free components</span>
                    </div>
                    <div className="flex items-center gap-[12px]">
                      <div className="size-[24px] rounded-full bg-[#DB7100]/10 flex items-center justify-center shrink-0">
                        <Check size={14} className="text-[#DB7100]" strokeWidth={3} />
                      </div>
                      <span className="font-inter text-[14px] text-black">Basic customization</span>
                    </div>
                  </div>
                </div>

                {/* Premium Plan Card */}
                <div className="flex-1 border border-[#1F2123] rounded-[24px] p-[24px] flex flex-col items-start relative overflow-hidden bg-white">
                  <div className="absolute top-[24px] right-[24px] bg-[#1F2123] text-white font-sans font-medium text-[10px] uppercase tracking-wider px-[12px] py-[6px] rounded-[100px]">
                    RECOMMENDED
                  </div>
                  <h4 className="font-sans font-bold text-[20px] text-black mb-2">Premium Plan</h4>
                  <div className="font-sans font-bold text-[32px] text-black mb-[24px]">
                    ₹399<span className="text-[16px] text-[#7D7F82] font-medium">/month</span>
                  </div>
                  
                  <button className="w-full h-[48px] bg-[#1F2123] rounded-[40px] font-sans font-medium text-[16px] text-white mb-[32px] hover:bg-black transition-colors">
                    Upgrade to Premium
                  </button>
                  
                  <div className="flex flex-col gap-[16px] w-full">
                    <div className="flex items-center gap-[12px]">
                      <div className="size-[24px] rounded-full bg-[#DB7100]/10 flex items-center justify-center shrink-0">
                        <Check size={14} className="text-[#DB7100]" strokeWidth={3} />
                      </div>
                      <span className="font-inter text-[14px] text-black">Everything in free</span>
                    </div>
                    <div className="flex items-center gap-[12px]">
                      <div className="size-[24px] rounded-full bg-[#DB7100]/10 flex items-center justify-center shrink-0">
                        <Check size={14} className="text-[#DB7100]" strokeWidth={3} />
                      </div>
                      <span className="font-inter text-[14px] text-black">Premium motion components</span>
                    </div>
                    <div className="flex items-center gap-[12px]">
                      <div className="size-[24px] rounded-full bg-[#DB7100]/10 flex items-center justify-center shrink-0">
                        <Check size={14} className="text-[#DB7100]" strokeWidth={3} />
                      </div>
                      <span className="font-inter text-[14px] text-black">Advanced customizations</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="font-inter text-[14px] text-[#7D7F82] mt-[-8px]">Your free plan will automatically renew.</p>
            </div>

            {/* Saved Components Section */}
            {savedIds.length > 0 && (
              <div className="bg-white border border-[#E7E7E7] rounded-[32px] p-[32px] flex flex-col gap-[32px]">
                <div className="flex items-center justify-between">
                  <h3 className="font-sans font-bold text-[24px] text-black">
                    Saved Components <span className="font-medium text-[#7D7F82] text-[18px]">({savedIds.length} items collected)</span>
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                  {savedIds.includes("star-button") && (
                    <ComponentCard id="star-button" title="Star button" tags={[{label: "React"}, {label: "Tailwind"}]}>
                      {({ playState }) => (
                        <button className={`bg-[#1F2123] px-[24px] py-[12px] rounded-[12px] flex items-center justify-center transition-all duration-300 shadow-[0_4px_14px_rgba(31,33,35,0.3)] ${playState === 'hover' ? 'scale-105 shadow-[0_6px_20px_rgba(31,33,35,0.4)]' : ''} ${playState === 'active' ? 'scale-95' : ''} hover:scale-105`}>
                          <Star size={18} className={`transition-all duration-500 text-white ${playState === 'hover' || playState === 'loading' ? 'fill-white rotate-[144deg]' : ''}`} />
                        </button>
                      )}
                    </ComponentCard>
                  )}
                  {savedIds.includes("icon-button") && (
                    <ComponentCard id="icon-button" title="Icon button" tags={[{label: "React"}, {label: "Tailwind"}]}>
                      {({ playState }) => (
                        <button className={`relative overflow-hidden w-[160px] h-[52px] rounded-full flex items-center justify-start transition-all duration-300 ${playState === 'active' ? 'scale-95' : ''} hover:scale-105 bg-[#F5F9FF]`}>
                          <span className={`pl-5 font-sans text-black`}>{playState === 'loading' ? 'Loading' : 'Continue'}</span>
                          <div className={`absolute right-0 top-0 bottom-0 aspect-square rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${playState === 'hover' ? 'scale-110 translate-x-1' : ''} ${playState === 'loading' ? 'animate-pulse' : ''} bg-[#1566E5] text-white`}>
                            <ArrowRight size={18} />
                          </div>
                        </button>
                      )}
                    </ComponentCard>
                  )}
                  {savedIds.includes("glow-button") && (
                    <ComponentCard id="glow-button" title="Glow button" tags={[{label: "React"}, {label: "Tailwind"}]}>
                      {({ playState }) => (
                        <button className={`relative bg-[#F9F9F9] border px-[28px] py-[12px] rounded-full overflow-hidden flex items-center justify-center group transition-colors ${playState === 'hover' || playState === 'active' ? 'border-[#CBCED1]' : 'border-[#DEE1E4]'}`}>
                          <span className="font-sans font-medium text-[16px] text-black relative z-10">{playState === 'loading' ? 'Saving...' : 'Continue'}</span>
                          <div className={`absolute right-[-5px] top-1/2 -translate-y-1/2 w-[25px] h-[60px] bg-[#9CC2FF]/50 blur-[10px] rotate-[33deg] transition-transform duration-500 ${playState === 'hover' ? 'translate-x-[-15px]' : ''} ${playState === 'loading' ? 'translate-x-[-120px] duration-1000' : ''} group-hover:translate-x-[-10px]`}></div>
                        </button>
                      )}
                    </ComponentCard>
                  )}
                  {savedIds.includes("union-button") && (
                    <ComponentCard id="union-button" title="Union button" tags={[{label: "React"}, {label: "Tailwind"}]}>
                      {({ playState }) => (
                        <button className={`relative bg-white border border-[#DEE1E4] h-[46px] px-[28px] rounded-[16px] flex items-center justify-center transition-all duration-300 ${playState === 'hover' ? 'shadow-md -translate-y-1' : 'shadow-sm'} ${playState === 'active' ? 'shadow-inner bg-[#F7F9FB] translate-y-0' : ''} hover:shadow-md`}>
                          <span className="font-sans font-medium text-[16px] text-[#1F2123]">{playState === 'loading' ? 'Wait...' : 'Continue'}</span>
                        </button>
                      )}
                    </ComponentCard>
                  )}
                  {savedIds.includes("magic-button") && (
                    <ComponentCard id="magic-button" title="Magic button" tags={[{label: "React"}, {label: "Tailwind"}]}>
                      {({ playState }) => (
                        <button className={`bg-[#EEF1F4] border transition-all duration-300 px-[24px] py-[12px] rounded-full flex gap-2 items-center ${playState === 'hover' ? 'border-[#DEE1E4] shadow-sm scale-105' : 'border-transparent'} ${playState === 'active' ? 'scale-95 bg-[#DEE1E4]' : ''} hover:border-[#DEE1E4]`}>
                          <Star size={18} className={`transition-all ${playState === 'hover' || playState === 'loading' ? 'text-yellow-500 fill-yellow-500' : 'text-[#1F2123]'}`} />
                          <span className="font-sans font-medium text-[16px] text-[#1F2123]">Magic</span>
                        </button>
                      )}
                    </ComponentCard>
                  )}
                  {savedIds.includes("accept-button") && (
                    <ComponentCard id="accept-button" title="Accept button" tags={[{label: "React"}, {label: "Tailwind"}]}>
                      {({ playState }) => (
                        <button className={`relative bg-[#F6CC44] px-[28px] py-[12px] rounded-full flex items-center justify-center group transition-all duration-300 ${playState === 'hover' ? 'scale-105 shadow-[0_8px_20px_rgba(246,204,68,0.4)]' : 'shadow-[0_4px_14px_rgba(246,204,68,0.3)]'} ${playState === 'active' ? 'scale-95 shadow-none' : ''} hover:scale-105`}>
                          <div className={`absolute inset-0 rounded-full bg-white/20 transition-opacity ${playState === 'hover' ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100`}></div>
                          <span className="font-sans font-medium text-[16px] text-[#1F2123] relative z-10">{playState === 'loading' ? 'Accepting' : 'Accept'}</span>
                        </button>
                      )}
                    </ComponentCard>
                  )}
                  {savedIds.includes("like-button") && (
                    <ComponentCard id="like-button" title="Like button" tags={[{label: "React"}, {label: "Tailwind"}]}>
                      {({ playState }) => (
                        <button className={`bg-[#FBFCFD] border border-[#DEE1E4] px-[24px] py-[12px] rounded-full flex gap-[10px] items-center transition-all duration-300 shadow-sm ${playState === 'hover' ? 'bg-[#F7F9FB] scale-105' : ''} ${playState === 'active' || playState === 'loading' ? 'bg-[#FFEBEC] border-[#FFB3B8]' : ''} hover:bg-[#F7F9FB]`}>
                          <Heart size={18} className={`transition-transform duration-300 text-[#CC0615] ${playState === 'active' || playState === 'loading' ? 'fill-[#CC0615] scale-125' : (playState === 'hover' ? 'fill-[#CC0615]/50' : 'fill-transparent')}`} />
                          <span className="font-sans font-medium text-[16px] text-[#1F2123]">{playState === 'loading' ? 'Liked' : 'Like'}</span>
                        </button>
                      )}
                    </ComponentCard>
                  )}
                  {savedIds.includes("generate-button") && (
                    <ComponentCard id="generate-button" title="Generate button" tags={[{label: "React"}, {label: "Tailwind"}]}>
                      {({ playState }) => (
                        <button className={`relative bg-[#0E3067] px-[28px] py-[12px] rounded-full flex items-center justify-center group overflow-hidden transition-all duration-300 ${playState === 'hover' ? 'shadow-[#0E3067]/30 shadow-xl scale-105' : 'shadow-lg'} ${playState === 'active' ? 'scale-95' : ''}`}>
                          <div className={`absolute top-[-5px] left-[-2px] h-[120%] bg-[#1566E5]/20 blur-[8px] rounded-full transition-all duration-500 ${playState === 'hover' || playState === 'loading' ? 'w-[100%]' : 'w-[60%]'} group-hover:w-[100%]`}></div>
                          <span className="font-sans font-medium text-[16px] text-white relative z-10">{playState === 'loading' ? 'Generating...' : 'Generate'}</span>
                        </button>
                      )}
                    </ComponentCard>
                  )}
                  {savedIds.includes("send-button") && (
                    <ComponentCard id="send-button" title="Send button" tags={[{label: "React"}, {label: "Tailwind"}]}>
                      {({ playState }) => (
                        <button className={`bg-[#F5F9FF] border border-[#EAF2FF] px-[26px] py-[12px] rounded-full flex gap-[12px] items-center transition-all duration-300 ${playState === 'hover' ? 'bg-[#EAF2FF] scale-105 shadow-sm' : ''} ${playState === 'active' ? 'scale-95' : ''} hover:bg-[#EAF2FF]`}>
                          <Send size={18} className={`text-[#1566E5] transition-transform duration-500 ${playState === 'loading' ? 'translate-x-10 opacity-0' : (playState === 'hover' ? 'translate-x-1 -translate-y-1' : '')}`} />
                          <span className="font-sans font-medium text-[16px] text-[#1F2123]">{playState === 'loading' ? 'Sent!' : 'Send'}</span>
                        </button>
                      )}
                    </ComponentCard>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
