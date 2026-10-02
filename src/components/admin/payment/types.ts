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
    yearlyPriceBig: string;
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
      "Access to Free components",
      "Next.js & React source code",
      "HTML & CSS code",
      "Live component previews",
      "Interactive customization",
      "Personal & commercial use"
    ]
  },
  premiumPlan: {
    name: "Premium",
    badgeText: "Early Access",
    description: "Unlock the complete component library and build faster.",
    monthlyPrice: "₹399",
    pricePeriod: "/month",
    yearlyPriceBig: "₹2,999",
    yearlyPrice: "or ₹2,999/year",
    savingsNote: "Save ₹1,789 with yearly billing",
    buttonText: "Get Premium (Coming Soon)",
    featuresTitle: "Everything included:",
    features: [
      "All Premium UI components",
      "Framer Motion animations",
      "Full source (Next.js & Tailwind)",
      "HTML & CSS code",
      "Figma design links",
      "Priority feature requests (Coming Soon)",
      "Premium templates (Coming Soon)",
      "Unlimited commercial use"
    ]
  },
  comparison: {
    title: "Compare plans in detail",
    subtitle: "Discover why creators choose Premium to supercharge their workflows",
    rows: [
      { feature: "Components", free: "Free Tier Only", premium: "Complete Library" },
      { feature: "Animations", free: "CSS Transitions", premium: "Framer Motion & CSS" },
      { feature: "Live Previews", free: "Yes", premium: "Yes" },
      { feature: "Interactive Customization", free: "Yes", premium: "Yes" },
      { feature: "Source Code", free: "HTML/CSS & React", premium: "Full Source & Figma Files" },
      { feature: "Templates", free: "No", premium: "Yes (Coming Soon)" },
      { feature: "License", free: "Standard Commercial", premium: "Unlimited Commercial" }
    ]
  },
  faq: {
    title: "Frequently Asked Questions",
    subtitle: "Have some questions? We've got answers.",
    items: [
      { question: "What is included in the free plan?", answer: "The free plan gives you access to a curated selection of components, including their Next.js, HTML, and CSS code, along with live customizable previews." },
      { question: "Is the premium plan really a subscription?", answer: "Yes, you can choose between monthly and yearly billing to get full access to all premium animated components and future updates." },
      { question: "Can I use components in commercial projects?", answer: "Absolutely. Both free and premium components can be used in your personal and commercial projects like client websites or SaaS applications." },
      { question: "How do I get updates?", answer: "New components are added to the library regularly. They will automatically appear in the components catalog." },
      { question: "Are Figma files included?", answer: "Figma links are provided for Premium components, allowing you to easily integrate them into your design workflow." }
    ]
  },
  cta: {
    title: "Explore the library, copy the code, customize it, and ship.",
    subtitle: "Join thousands of designers and developers pushing the limits of UI animation with UX with Motion.",
    buttonText: "Explore Components"
  }
};
