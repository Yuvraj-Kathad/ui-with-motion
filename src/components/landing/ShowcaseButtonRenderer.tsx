"use client";

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

export function ShowcaseButtonRenderer({ componentKey }: { componentKey: string }) {
  switch (componentKey) {
    case "continue":
      return <ContinueButton />;
    case "generate":
      return <GenerateButton />;
    case "accept":
      return <AcceptButton />;
    case "get-access":
      return <GetAccessButton />;
    case "mail":
      return <MailButton />;
    case "delete":
      return <TechnologyButton />;
    case "download":
      return <DownloadButton />;
    case "tabs":
      return <TabsButton />;
    case "services-indicator":
      return <ServicesIndicatorButton />;
    default:
      return null;
  }
}
