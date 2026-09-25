"use client";

import React, { useState, useEffect } from "react";
import { PaymentPageContent, defaultPaymentContent } from "@/components/admin/payment/types";
import { Trash2, Plus } from "lucide-react";

// Helper components for the UI Editor

const CardContainer = ({ title, subtitle, children }: { title: string, subtitle: string, children: React.ReactNode }) => (
  <div className="bg-white border border-[#D7DADC] rounded-[16px] p-[28px] flex flex-col gap-[24px]">
    <div className="flex flex-col gap-2">
      <h3 className="font-sans font-semibold text-[18px] text-[#1F2123]">{title}</h3>
      <p className="font-sans font-normal text-[14px] text-[#7D7F82]">{subtitle}</p>
    </div>
    {children}
  </div>
);

const InputField = ({ label, value, onChange, placeholder = "", type = "text", fullWidth = true }: { label: string, value: string, onChange: (v: string) => void, placeholder?: string, type?: string, fullWidth?: boolean }) => (
  <div className={`flex flex-col gap-[8px] ${fullWidth ? 'w-full' : 'flex-1'}`}>
    <label className="font-sans font-semibold text-[11px] tracking-[0.5px] uppercase text-[#7D7F82]">{label}</label>
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="h-[42px] bg-white border border-[#D7DADC] rounded-[8px] px-[16px] font-sans text-[14px] text-[#1F2123] focus:outline-none focus:border-[#C05D00]"
    />
  </div>
);

const TextAreaField = ({ label, value, onChange, placeholder = "", height = "80px" }: { label: string, value: string, onChange: (v: string) => void, placeholder?: string, height?: string }) => (
  <div className="flex flex-col gap-[8px] w-full">
    <label className="font-sans font-semibold text-[11px] tracking-[0.5px] uppercase text-[#7D7F82]">{label}</label>
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{ height }}
      className="bg-white border border-[#D7DADC] rounded-[8px] p-[12px] px-[16px] font-sans text-[14px] text-[#1F2123] resize-y focus:outline-none focus:border-[#C05D00]"
    />
  </div>
);

const ListItem = ({ value, onChange, onRemove }: { value: string, onChange: (v: string) => void, onRemove: () => void }) => (
  <div className="flex gap-[12px] items-center w-full">
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      className="flex-1 h-[42px] bg-white border border-[#D7DADC] rounded-[8px] px-[16px] font-sans text-[14px] text-[#1F2123] focus:outline-none focus:border-[#C05D00]"
    />
    <button onClick={onRemove} className="size-[40px] flex items-center justify-center shrink-0 border border-[#D7DADC] rounded-[8px] text-[#7D7F82] hover:text-red-500 hover:border-red-500 transition-colors">
      <Trash2 size={18} />
    </button>
  </div>
);

export default function AdminPaymentPage() {
  const [content, setContent] = useState<PaymentPageContent>(defaultPaymentContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("payment_page_content");
    if (saved) {
      try {
        setContent(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse payment content", e);
      }
    }
    setLoading(false);
  }, []);

  const handleSave = () => {
    setSaving(true);
    localStorage.setItem("payment_page_content", JSON.stringify(content));
    window.dispatchEvent(new Event("payment_content_updated"));
    setTimeout(() => setSaving(false), 500);
  };

  const updateSection = (section: keyof PaymentPageContent, key: string, value: any) => {
    setContent(prev => ({
      ...prev,
      [section]: { ...prev[section], [key]: value }
    }));
  };

  const updateFeature = (section: 'freePlan' | 'premiumPlan', index: number, value: string) => {
    const newFeatures = [...content[section].features];
    newFeatures[index] = value;
    updateSection(section, 'features', newFeatures);
  };

  const addFeature = (section: 'freePlan' | 'premiumPlan') => {
    updateSection(section, 'features', [...content[section].features, "New feature"]);
  };

  const removeFeature = (section: 'freePlan' | 'premiumPlan', index: number) => {
    const newFeatures = content[section].features.filter((_, i) => i !== index);
    updateSection(section, 'features', newFeatures);
  };

  if (loading) return null;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-[1200px] flex flex-col">
        {/* Header Bar */}
        <div className="w-full h-[79px] border-b border-[#EEF1F4] flex items-center justify-between px-[32px] shrink-0 bg-[#F6F7F8]">
          <h1 className="font-sans font-bold text-[20px] text-[#1F2123]">Payment Page CMS</h1>
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-[235px] h-[43px] bg-[#1F2123] rounded-full text-white font-sans font-semibold text-[14px] hover:bg-[#3D3D3D] transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="w-full p-[32px] flex flex-col gap-[32px] items-center">
          <div className="w-[1136px] flex flex-col gap-[32px]">
            
            {/* Hero Section */}
            <CardContainer title="Hero Section" subtitle="Manage the main heading, subheading, and subscription toggle text at the top of the pricing page.">
              <InputField label="Hero Title" value={content.hero.title} onChange={v => updateSection('hero', 'title', v)} />
              <TextAreaField label="Hero Subtitle" value={content.hero.subtitle} onChange={v => updateSection('hero', 'subtitle', v)} />
              <div className="flex gap-[24px] w-full">
                <InputField fullWidth={false} label="Toggle Label 1 (Monthly)" value={content.hero.toggleLabelMonthly} onChange={v => updateSection('hero', 'toggleLabelMonthly', v)} />
                <InputField fullWidth={false} label="Toggle Label 2 (Yearly)" value={content.hero.toggleLabelYearly} onChange={v => updateSection('hero', 'toggleLabelYearly', v)} />
              </div>
            </CardContainer>

            {/* Free Plan */}
            <CardContainer title="Free Plan Card" subtitle="Configure pricing, description, and feature list for the Free plan tier.">
              <div className="flex gap-[24px] w-full">
                <InputField fullWidth={false} label="Plan Name" value={content.freePlan.name} onChange={v => updateSection('freePlan', 'name', v)} />
                <InputField fullWidth={false} label="Price" value={content.freePlan.price} onChange={v => updateSection('freePlan', 'price', v)} />
                <InputField fullWidth={false} label="Price Label" value={content.freePlan.priceLabel} onChange={v => updateSection('freePlan', 'priceLabel', v)} />
              </div>
              <InputField label="Plan Description" value={content.freePlan.description} onChange={v => updateSection('freePlan', 'description', v)} />
              <InputField label="Button Text" value={content.freePlan.buttonText} onChange={v => updateSection('freePlan', 'buttonText', v)} />
              <InputField label="Features List Title" value={content.freePlan.featuresTitle} onChange={v => updateSection('freePlan', 'featuresTitle', v)} />
              <div className="flex flex-col gap-[12px] w-full mt-2">
                <label className="font-sans font-semibold text-[11px] tracking-[0.5px] uppercase text-[#7D7F82]">Features</label>
                {content.freePlan.features.map((feat, i) => (
                  <ListItem key={i} value={feat} onChange={v => updateFeature('freePlan', i, v)} onRemove={() => removeFeature('freePlan', i)} />
                ))}
                <button onClick={() => addFeature('freePlan')} className="self-start mt-2 px-4 py-2 bg-[#EEF1F4] text-[#1F2123] rounded-full text-sm font-semibold hover:bg-[#D7DADC]">
                  + Add Feature
                </button>
              </div>
            </CardContainer>

            {/* Premium Plan */}
            <CardContainer title="Premium Plan Card" subtitle="Configure badge text, pricing periods, savings, and complete features for the Premium plan tier.">
              <div className="flex gap-[24px] w-full">
                <InputField fullWidth={false} label="Plan Name" value={content.premiumPlan.name} onChange={v => updateSection('premiumPlan', 'name', v)} />
                <InputField fullWidth={false} label="Badge Text" value={content.premiumPlan.badgeText} onChange={v => updateSection('premiumPlan', 'badgeText', v)} />
              </div>
              <InputField label="Plan Description" value={content.premiumPlan.description} onChange={v => updateSection('premiumPlan', 'description', v)} />
              <div className="flex gap-[24px] w-full">
                <InputField fullWidth={false} label="Monthly Price" value={content.premiumPlan.monthlyPrice} onChange={v => updateSection('premiumPlan', 'monthlyPrice', v)} />
                <InputField fullWidth={false} label="Price Period" value={content.premiumPlan.pricePeriod} onChange={v => updateSection('premiumPlan', 'pricePeriod', v)} />
                <InputField fullWidth={false} label="Yearly Price" value={content.premiumPlan.yearlyPrice} onChange={v => updateSection('premiumPlan', 'yearlyPrice', v)} />
              </div>
              <InputField label="Savings Note" value={content.premiumPlan.savingsNote} onChange={v => updateSection('premiumPlan', 'savingsNote', v)} />
              <InputField label="Button Text" value={content.premiumPlan.buttonText} onChange={v => updateSection('premiumPlan', 'buttonText', v)} />
              <InputField label="Features List Title" value={content.premiumPlan.featuresTitle} onChange={v => updateSection('premiumPlan', 'featuresTitle', v)} />
              <div className="flex flex-col gap-[12px] w-full mt-2">
                <label className="font-sans font-semibold text-[11px] tracking-[0.5px] uppercase text-[#7D7F82]">Features</label>
                {content.premiumPlan.features.map((feat, i) => (
                  <ListItem key={i} value={feat} onChange={v => updateFeature('premiumPlan', i, v)} onRemove={() => removeFeature('premiumPlan', i)} />
                ))}
                <button onClick={() => addFeature('premiumPlan')} className="self-start mt-2 px-4 py-2 bg-[#EEF1F4] text-[#1F2123] rounded-full text-sm font-semibold hover:bg-[#D7DADC]">
                  + Add Feature
                </button>
              </div>
            </CardContainer>

            {/* Comparison Table */}
            <CardContainer title="Comparison Table Section" subtitle="Manage values displayed in the direct comparison matrix between plans.">
              <InputField label="Section Title" value={content.comparison.title} onChange={v => updateSection('comparison', 'title', v)} />
              <InputField label="Section Subtitle" value={content.comparison.subtitle} onChange={v => updateSection('comparison', 'subtitle', v)} />
              
              <div className="flex flex-col w-full border border-[#D7DADC] rounded-[8px] overflow-hidden mt-4">
                <div className="flex bg-[#EEF1F4] px-[16px] py-[12px] font-sans font-semibold text-[13px] text-[#7D7F82] border-b border-[#D7DADC]">
                  <div className="w-[500px]">Feature name</div>
                  <div className="flex-1">Free Plan</div>
                  <div className="flex-1">Premium Plan</div>
                </div>
                {content.comparison.rows.map((row, i) => (
                  <div key={i} className="flex px-[16px] py-[12px] gap-[16px] border-b border-[#EEF1F4] last:border-0 items-center">
                    <div className="w-[484px]">
                      <input type="text" value={row.feature} onChange={(e) => {
                        const newRows = [...content.comparison.rows];
                        newRows[i].feature = e.target.value;
                        updateSection('comparison', 'rows', newRows);
                      }} className="w-full h-[42px] px-3 border border-[#D7DADC] rounded-[8px] focus:outline-none focus:border-[#C05D00]" />
                    </div>
                    <div className="flex-1">
                      <input type="text" value={row.free} onChange={(e) => {
                        const newRows = [...content.comparison.rows];
                        newRows[i].free = e.target.value;
                        updateSection('comparison', 'rows', newRows);
                      }} className="w-full h-[42px] px-3 border border-[#D7DADC] rounded-[8px] focus:outline-none focus:border-[#C05D00]" />
                    </div>
                    <div className="flex-1 flex gap-2">
                      <input type="text" value={row.premium} onChange={(e) => {
                        const newRows = [...content.comparison.rows];
                        newRows[i].premium = e.target.value;
                        updateSection('comparison', 'rows', newRows);
                      }} className="w-full h-[42px] px-3 border border-[#D7DADC] rounded-[8px] focus:outline-none focus:border-[#C05D00]" />
                      <button onClick={() => {
                        const newRows = content.comparison.rows.filter((_, idx) => idx !== i);
                        updateSection('comparison', 'rows', newRows);
                      }} className="size-[42px] flex items-center justify-center shrink-0 border border-[#D7DADC] rounded-[8px] text-[#7D7F82] hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => {
                updateSection('comparison', 'rows', [...content.comparison.rows, { feature: "New", free: "Basic", premium: "Pro" }]);
              }} className="self-start mt-2 px-4 py-2 bg-[#EEF1F4] text-[#1F2123] rounded-full text-sm font-semibold hover:bg-[#D7DADC]">
                + Add Row
              </button>
            </CardContainer>

            {/* FAQ Section */}
            <CardContainer title="FAQ Section" subtitle="Add, update, or remove question and answer blocks for the pricing FAQ accordion.">
              <InputField label="Section Title" value={content.faq.title} onChange={v => updateSection('faq', 'title', v)} />
              <InputField label="Section Subtitle" value={content.faq.subtitle} onChange={v => updateSection('faq', 'subtitle', v)} />
              
              <div className="flex flex-col gap-[24px] mt-4">
                {content.faq.items.map((item, i) => (
                  <div key={i} className="flex flex-col gap-3 p-4 border border-[#D7DADC] rounded-[8px] relative">
                    <button onClick={() => {
                      const newFaqs = content.faq.items.filter((_, idx) => idx !== i);
                      updateSection('faq', 'items', newFaqs);
                    }} className="absolute top-4 right-4 text-[#7D7F82] hover:text-red-500">
                      <Trash2 size={18} />
                    </button>
                    <div className="w-[calc(100%-32px)]">
                      <InputField label={`Question ${i+1}`} value={item.question} onChange={(v) => {
                        const newFaqs = [...content.faq.items];
                        newFaqs[i].question = v;
                        updateSection('faq', 'items', newFaqs);
                      }} />
                    </div>
                    <TextAreaField label="Answer" value={item.answer} onChange={(v) => {
                      const newFaqs = [...content.faq.items];
                      newFaqs[i].answer = v;
                      updateSection('faq', 'items', newFaqs);
                    }} />
                  </div>
                ))}
              </div>
              <button onClick={() => {
                updateSection('faq', 'items', [...content.faq.items, { question: "New Question", answer: "New Answer" }]);
              }} className="self-start mt-4 px-4 py-2 bg-[#EEF1F4] text-[#1F2123] rounded-full text-sm font-semibold hover:bg-[#D7DADC] flex items-center gap-2">
                <Plus size={16} /> Add FAQ Item
              </button>
            </CardContainer>

            {/* CTA Banner Section */}
            <CardContainer title="CTA Banner Section" subtitle="Edit the content of the high-impact conversion callout shown at the bottom of the public page.">
              <InputField label="CTA Title" value={content.cta.title} onChange={v => updateSection('cta', 'title', v)} />
              <TextAreaField label="CTA Subtitle" value={content.cta.subtitle} onChange={v => updateSection('cta', 'subtitle', v)} />
              <InputField label="Button Text" value={content.cta.buttonText} onChange={v => updateSection('cta', 'buttonText', v)} />
            </CardContainer>

          </div>
        </div>
      </div>
    </div>
  );
}
