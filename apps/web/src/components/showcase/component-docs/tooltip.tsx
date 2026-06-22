import {
  Button,
  Input,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@sunlace/ui";

import type { ComponentSettings } from "../component-catalog";
import type { ComponentDocDefinition } from "./types";

function getShowcaseCode(settings?: ComponentSettings) {
  const tooltip = settings?.tooltip;

  return `import { Button } from "@/components/ui/button";
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
        <TooltipTrigger render={<Button variant="outline" />}>Hover Me</TooltipTrigger>
        <TooltipContent${tooltip?.side && tooltip.side !== "top" ? ` side="${tooltip.side}"` : ""}${tooltip?.showArrow === false ? " showArrow={false}" : ""}>
          Tooltip Preview
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}`;
}

const formCode = `import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function FormTooltip() {
  return (
    <TooltipProvider>
      <div className="grid w-72 gap-2">
        <label className="text-sm font-medium" htmlFor="workspace">
          Workspace Slug
        </label>
        <div className="flex gap-2">
          <Input id="workspace" placeholder="sunlace" />
          <Tooltip>
            <TooltipTrigger render={<Button variant="outline" />}>?</TooltipTrigger>
            <TooltipContent showArrow={false} side="right">
              Used in project URLs.
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}`;

function Preview({ settings }: { settings?: ComponentSettings }) {
  const tooltip = settings?.tooltip;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" />}>
          Hover Me
        </TooltipTrigger>
        <TooltipContent showArrow={tooltip?.showArrow} side={tooltip?.side}>
          Tooltip Preview
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function FormExample() {
  return (
    <TooltipProvider>
      <div className="grid w-72 gap-2">
        <label className="font-medium text-sm" htmlFor="workspace">
          Workspace Slug
        </label>
        <div className="flex gap-2">
          <Input id="workspace" placeholder="sunlace" />
          <Tooltip>
            <TooltipTrigger render={<Button variant="outline" />}>
              ?
            </TooltipTrigger>
            <TooltipContent showArrow={false} side="right">
              Used in project URLs.
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}

export const tooltipDocs: ComponentDocDefinition = {
  description: "A short label that appears near a focused or hovered trigger.",
  examples: [
    {
      code: formCode,
      preview: <FormExample />,
      resetKey: "tooltip-form-example",
      title: "Field Help",
    },
  ],
  getShowcaseCode,
  importCode: `import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";`,
  primitiveDocsUrl: "https://base-ui.com/react/components/tooltip",
  props: [
    {
      title: "Tooltip",
      props: [
        {
          name: "open",
          type: "boolean",
          defaultValue: "-",
          description: "Controls whether the tooltip is open.",
        },
        {
          name: "defaultOpen",
          type: "boolean",
          defaultValue: "false",
          description: "Sets the initial uncontrolled open state.",
        },
        {
          name: "onOpenChange",
          type: "(open: boolean) => void",
          defaultValue: "-",
          description: "Runs when the open state changes.",
        },
      ],
    },
    {
      title: "TooltipContent",
      props: [
        {
          name: "side",
          type: '"top" | "right" | "bottom" | "left"',
          defaultValue: '"top"',
          description: "Sets the preferred side of the trigger.",
        },
        {
          name: "align",
          type: '"start" | "center" | "end"',
          defaultValue: '"center"',
          description: "Aligns the tooltip against its trigger.",
        },
        {
          name: "sideOffset",
          type: "number",
          defaultValue: "8",
          description: "Sets the distance from the trigger.",
        },
        {
          name: "showArrow",
          type: "boolean",
          defaultValue: "true",
          description: "Shows or hides the directional arrow.",
        },
      ],
    },
  ],
  renderPreview: (settings) => <Preview settings={settings} />,
  usageCode: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger render={<Button variant="outline" />}>
      Hover Me
    </TooltipTrigger>
    <TooltipContent>Tooltip Preview</TooltipContent>
  </Tooltip>
</TooltipProvider>`,
};
