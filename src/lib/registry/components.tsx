import React from "react";
import { ContinueButton } from "@/components/motion-components/buttons/ContinueButton";
import { GenerateButton } from "@/components/motion-components/buttons/GenerateButton";
import { AcceptButton } from "@/components/motion-components/buttons/AcceptButton";
import { GetAccessButton } from "@/components/motion-components/buttons/GetAccessButton";
import { MailButton } from "@/components/motion-components/buttons/MailButton";
import { TechnologyButton } from "@/components/motion-components/buttons/TechnologyButton";
import { DownloadButton } from "@/components/motion-components/buttons/DownloadButton";
import { TabsButton } from "@/components/motion-components/buttons/TabsButton";
import { ServicesIndicatorButton } from "@/components/motion-components/buttons/ServicesIndicatorButton";

export type ComponentRegistryEntry = {
  registryId: string;
  name: string;
  category: string;
  component: React.ComponentType<any>;
  snippets: {
    html: string;
    css: string;
    nextjs: string;
  };
};

export const componentRegistry: Record<string, ComponentRegistryEntry> = {
  "continue-button": {
    registryId: "continue-button",
    name: "Continue Button",
    category: "Buttons",
    component: ContinueButton,
    snippets: {
      html: `<button class="continue-btn">Continue</button>`,
      css: `.continue-btn { /* styles */ }`,
      nextjs: `// React code for ContinueButton`
    }
  },
  "generate-button": {
    registryId: "generate-button",
    name: "Generate Button",
    category: "Buttons",
    component: GenerateButton,
    snippets: {
      html: `<button class="gen-btn">Generate</button>`,
      css: `.gen-btn { /* styles */ }`,
      nextjs: `// React code for GenerateButton`
    }
  },
  "accept-button": {
    registryId: "accept-button",
    name: "Accept Button",
    category: "Buttons",
    component: AcceptButton,
    snippets: {
      html: `<button class="accept-btn">Accept</button>`,
      css: `.accept-btn { /* styles */ }`,
      nextjs: `// React code for AcceptButton`
    }
  },
  "get-access-button": {
    registryId: "get-access-button",
    name: "Get Access Button",
    category: "Buttons",
    component: GetAccessButton,
    snippets: {
      html: `<button class="access-btn">Get Access</button>`,
      css: `.access-btn { /* styles */ }`,
      nextjs: `// React code for GetAccessButton`
    }
  },
  "mail-button": {
    registryId: "mail-button",
    name: "Mail Button",
    category: "Buttons",
    component: MailButton,
    snippets: {
      html: `<button class="mail-btn">Mail</button>`,
      css: `.mail-btn { /* styles */ }`,
      nextjs: `// React code for MailButton`
    }
  },
  "delete-button": {
    registryId: "delete-button",
    name: "Brutalist Delete Button",
    category: "Buttons",
    component: TechnologyButton,
    snippets: {
      html: `<button class="delete-btn">Delete</button>`,
      css: `.delete-btn { /* styles */ }`,
      nextjs: `// React code for Brutalist Delete Button`
    }
  },
  "download-button": {
    registryId: "download-button",
    name: "Download Button",
    category: "Buttons",
    component: DownloadButton,
    snippets: {
      html: `<button class="download-btn">Download</button>`,
      css: `.download-btn { /* styles */ }`,
      nextjs: `// React code for DownloadButton`
    }
  },
  "tabs-button": {
    registryId: "tabs-button",
    name: "Tabs Button",
    category: "Buttons",
    component: TabsButton,
    snippets: {
      html: `<button class="tabs-btn">Tabs</button>`,
      css: `.tabs-btn { /* styles */ }`,
      nextjs: `// React code for TabsButton`
    }
  },
  "services-indicator-button": {
    registryId: "services-indicator-button",
    name: "Services Indicator Button",
    category: "Buttons",
    component: ServicesIndicatorButton,
    snippets: {
      html: `<button class="services-btn">Services Indicator</button>`,
      css: `.services-btn { /* styles */ }`,
      nextjs: `// React code for ServicesIndicatorButton`
    }
  }
};
