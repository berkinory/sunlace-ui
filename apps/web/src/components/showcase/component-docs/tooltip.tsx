import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@sunlace/ui";

import type { ComponentDocDefinition } from "./types";

const showcaseCode = `import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function TooltipDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button />}>Hover Me</TooltipTrigger>
        <TooltipContent>Tooltip Preview</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}`;

function Preview() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button />}>Hover Me</TooltipTrigger>
        <TooltipContent>Tooltip Preview</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export const tooltipDocs: ComponentDocDefinition = {
  description: "A short label that appears near a focused or hovered trigger.",
  getShowcaseCode: () => showcaseCode,
  importCode: `import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";`,
  renderPreview: () => <Preview />,
  usageCode: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover Me</TooltipTrigger>
    <TooltipContent>Tooltip Preview</TooltipContent>
  </Tooltip>
</TooltipProvider>`,
};
