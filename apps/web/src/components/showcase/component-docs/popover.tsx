import {
  Button,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@sunlace/ui";

import type { ComponentDocDefinition } from "./types";

const showcaseCode = `import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

export function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger render={<Button />}>Open popover</PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Popover</PopoverTitle>
          <PopoverDescription>Supporting content near the trigger.</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  );
}`;

function Preview() {
  return (
    <Popover>
      <PopoverTrigger render={<Button />}>Open popover</PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Popover</PopoverTitle>
          <PopoverDescription>Temporary component preview.</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  );
}

export const popoverDocs: ComponentDocDefinition = {
  description:
    "A floating surface for contextual content and lightweight actions.",
  getShowcaseCode: () => showcaseCode,
  importCode: `import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";`,
  renderPreview: () => <Preview />,
  usageCode: `<Popover>
  <PopoverTrigger>Open popover</PopoverTrigger>
  <PopoverContent>Popover content</PopoverContent>
</Popover>`,
};
