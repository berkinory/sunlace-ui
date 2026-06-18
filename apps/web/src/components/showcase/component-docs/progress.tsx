import { Progress } from "@sunlace/ui";

import type { ComponentDocDefinition } from "./types";

const showcaseCode = `import { Progress } from "@/components/ui/progress";

export function ProgressDemo() {
  return <Progress className="w-full max-w-sm" value={64} />;
}`;

export const progressDocs: ComponentDocDefinition = {
  description: "A visual indicator for task or process completion.",
  getShowcaseCode: () => showcaseCode,
  importCode: `import { Progress } from "@/components/ui/progress";`,
  renderPreview: () => <Progress className="w-full max-w-sm" value={64} />,
  usageCode: `<Progress value={64} />`,
};
