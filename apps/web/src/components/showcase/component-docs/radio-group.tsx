import { RadioGroup, RadioGroupItem } from "@sunlace/ui";

import type { ComponentDocDefinition } from "./types";

const showcaseCode = `import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";

export function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="comfortable">
      <label className="flex items-center gap-3">
        <RadioGroupItem value="default" />
        Default
      </label>
      <label className="flex items-center gap-3">
        <RadioGroupItem value="comfortable" />
        Comfortable
      </label>
    </RadioGroup>
  );
}`;

function Preview() {
  return (
    <RadioGroup className="max-w-sm" defaultValue="comfortable">
      <label className="flex items-center gap-3 text-sm">
        <RadioGroupItem value="default" /> Default
      </label>
      <label className="flex items-center gap-3 text-sm">
        <RadioGroupItem value="comfortable" /> Comfortable
      </label>
    </RadioGroup>
  );
}

export const radioGroupDocs: ComponentDocDefinition = {
  description: "A set of mutually exclusive options with keyboard navigation.",
  getShowcaseCode: () => showcaseCode,
  importCode: `import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";`,
  renderPreview: () => <Preview />,
  usageCode: `<RadioGroup defaultValue="default">
  <RadioGroupItem value="default" />
  <RadioGroupItem value="comfortable" />
</RadioGroup>`,
};
