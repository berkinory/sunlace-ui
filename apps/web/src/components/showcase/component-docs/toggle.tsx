import { Toggle } from "@sunlace/ui";

import type { ComponentDocDefinition } from "./types";

const showcaseCode = `import { Toggle } from "@/components/ui/toggle";

export function ToggleDemo() {
  return <Toggle defaultPressed>Toggle</Toggle>;
}`;

export const toggleDocs: ComponentDocDefinition = {
  description: "A two-state button for turning an option on or off.",
  getShowcaseCode: () => showcaseCode,
  importCode: `import { Toggle } from "@/components/ui/toggle";`,
  renderPreview: () => <Toggle defaultPressed>Toggle</Toggle>,
  usageCode: `<Toggle defaultPressed>Toggle</Toggle>`,
};
