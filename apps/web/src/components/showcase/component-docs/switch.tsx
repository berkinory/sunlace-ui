import { Switch } from "@sunlace/ui";

import type { ComponentDocDefinition } from "./types";

const showcaseCode = `import { Switch } from "@/components/ui/switch";

export function SwitchDemo() {
  return (
    <label className="flex items-center gap-3">
      <Switch defaultChecked />
      Enable
    </label>
  );
}`;

export const switchDocs: ComponentDocDefinition = {
  description: "A binary control for immediately toggling a setting.",
  getShowcaseCode: () => showcaseCode,
  importCode: `import { Switch } from "@/components/ui/switch";`,
  renderPreview: () => (
    <label className="flex items-center gap-3 text-sm">
      <Switch defaultChecked /> Enable
    </label>
  ),
  usageCode: `<Switch defaultChecked />`,
};
