export interface PaymentPageContent {
  hero: {
    title: string;
    subtitle: string;
    toggleLabelMonthly: string;
    toggleLabelYearly: string;
  };
  freePlan: {
    name: string;
    price: string;
    priceLabel: string;
    description: string;
    buttonText: string;
    featuresTitle: string;
    features: string[];
  };
  premiumPlan: {
    name: string;
    badgeText: string;
    description: string;
    monthlyPrice: string;
    pricePeriod: string;
    yearlyPrice: string;
    savingsNote: string;
    buttonText: string;
    featuresTitle: string;
    features: string[];
  };
  comparison: {
    title: string;
    subtitle: string;
    rows: { feature: string; free: string; premium: string; }[];
  };
  faq: {
    title: string;
    subtitle: string;
    items: { question: string; answer: string; }[];
  };
  cta: {
    title: string;
    subtitle: string;
    buttonText: string;
  };
}

export const defaultPaymentContent: PaymentPageContent = {
  hero: {
    title: "Simple pricing. Powerful components.",
    subtitle: "Get production-ready UI components with Next.js, HTML & CSS code, and Figma designs — all in one place.",
    toggleLabelMonthly: "Monthly",
    toggleLabelYearly: "Yearly — Save 37%"
  },
  freePlan: {
    name: "Free",
    price: "₹0",
    priceLabel: "Forever",
    description: "Explore the library and start building for free.",
    buttonText: "Get Started — Free",
    featuresTitle: "What's included:",
    features: [
      "Free components",
      "Next.js code",
      "HTML & CSS code",
      "Component previews",
      "Figma links for free components",
      "Personal & commercial projects",
      "Regular library updates"
    ]
  },
  premiumPlan: {
    name: "Premium",
    badgeText: "Most Popular",
    description: "Unlock the complete component library and build faster.",
    monthlyPrice: "₹399",
    pricePeriod: "/month",
    yearlyPrice: "or ₹2,999/year",
    savingsNote: "Save ₹1,789 with yearly billing",
    buttonText: "Get Premium",
    featuresTitle: "Everything included:",
    features: [
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
    ]
  },
  comparison: {
    title: "Compare plans in detail",
    subtitle: "Discover why creators choose Premium to supercharge their workflows",
    rows: [
      { feature: "Components", free: "Basic (40+)", premium: "Complete (300+)" },
      { feature: "Animations", free: "CSS Transitions", premium: "Framer Motion & CSS" },
      { feature: "Updates", free: "Monthly", premium: "Weekly / Real-time" },
      { feature: "Support", free: "Community", premium: "24/7 Priority Discord" },
      { feature: "License", free: "Personal projects only", premium: "Commercial (Unlimited)" },
      { feature: "Documentation", free: "Standard guides", premium: "Interactive live playgrounds" },
      { feature: "Source Files", free: "Compiled only", premium: "Full source (Next.js, Tailwind, Figma)" }
    ]
  },
  faq: {
    title: "Frequently Asked Questions",
    subtitle: "Have some questions? We've got answers.",
    items: [
      { question: "What is included in the free plan?", answer: "The free plan gives you access to over 40 basic components, compiled HTML & CSS code, and public Figma community previews." },
      { question: "Is the premium plan really lifetime?", answer: "Yes! Premium plan subscribers pay once and receive unlimited, lifetime access to all current and future components, updates, and templates." },
      { question: "Can I use components in commercial projects?", answer: "Absolutely. Premium licenses authorize full personal and commercial use for client websites, SaaS applications, and digital platforms." },
      { question: "How do I get updates?", answer: "New component variations and Figma templates are synced automatically to your account dashboard every single week." },
      { question: "Can I get a refund?", answer: "We support a 14-day refund policy. If you find the premium resources do not fit your stack, contact our billing team." },
      { question: "Do you offer team pricing?", answer: "Yes, team seats are available at discounted rates with pooled seats. You can configure multi-seat workspaces directly." }
    ]
  },
  cta: {
    title: "Explore the library, copy the code, customize it, and ship.",
    subtitle: "Join thousands of designers and developers pushing the limits of UI animation with UX with Motion.",
    buttonText: "Explore Components"
  }
};
