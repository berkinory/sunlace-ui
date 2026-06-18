import { Textarea } from "@sunlace/ui";

import type { ComponentDocDefinition } from "./types";

const showcaseCode = `import { Textarea } from "@/components/ui/textarea";

export function TextareaDemo() {
  return <Textarea className="max-w-sm" placeholder="Write a note" />;
}`;

export const textareaDocs: ComponentDocDefinition = {
  description: "A multiline field for collecting longer user input.",
  getShowcaseCode: () => showcaseCode,
  importCode: `import { Textarea } from "@/components/ui/textarea";`,
  renderPreview: () => (
    <Textarea className="max-w-sm" placeholder="Write a note" />
  ),
  usageCode: `<Textarea placeholder="Write a note" />`,
};
