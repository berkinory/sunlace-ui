import { Spinner } from "@sunlace/ui";

import type { ComponentDocDefinition } from "./types";

const showcaseCode = `import { Spinner } from "@/components/ui/spinner";

export function SpinnerDemo() {
  return <Spinner className="size-6" />;
}`;

export const spinnerDocs: ComponentDocDefinition = {
  description: "A compact animated indicator for indeterminate loading states.",
  getShowcaseCode: () => showcaseCode,
  importCode: `import { Spinner } from "@/components/ui/spinner";`,
  props: [
    {
      title: "Spinner",
      props: [
        {
          name: "className",
          type: "string",
          defaultValue: "-",
          description: "Sets the spinner size, color, and utility classes.",
        },
        {
          name: "aria-label",
          type: "string",
          defaultValue: '"Loading"',
          description: "Sets the accessible loading label.",
        },
      ],
    },
  ],
  renderPreview: () => <Spinner className="size-6" />,
  usageCode: `<Spinner className="size-6" />`,
};
