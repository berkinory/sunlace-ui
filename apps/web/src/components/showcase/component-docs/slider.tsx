import { Slider } from "@sunlace/ui";

import type { ComponentDocDefinition } from "./types";

const showcaseCode = `import { Slider } from "@/components/ui/slider";

export function SliderDemo() {
  return <Slider className="w-full max-w-sm" defaultValue={[44]} />;
}`;

export const sliderDocs: ComponentDocDefinition = {
  description: "A draggable control for selecting a numeric value or range.",
  getShowcaseCode: () => showcaseCode,
  importCode: `import { Slider } from "@/components/ui/slider";`,
  renderPreview: () => (
    <Slider className="w-full max-w-sm" defaultValue={[44]} />
  ),
  usageCode: `<Slider defaultValue={[44]} />`,
};
