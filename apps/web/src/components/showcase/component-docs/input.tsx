import { Input } from "@sunlace/ui";

import type { ComponentDocDefinition } from "./types";

const showcaseCode = `import { Input } from "@/components/ui/input";

export function InputDemo() {
  return <Input className="max-w-sm" placeholder="email@example.com" />;
}`;

export const inputDocs: ComponentDocDefinition = {
  description: "A text field for collecting short-form user input.",
  getShowcaseCode: () => showcaseCode,
  importCode: `import { Input } from "@/components/ui/input";`,
  renderPreview: () => (
    <Input className="max-w-sm" placeholder="email@example.com" />
  ),
  usageCode: `<Input placeholder="email@example.com" />`,
};
