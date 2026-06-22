import { Spinner } from "@sunlace/ui";

import type { ComponentSettings } from "../component-catalog";
import type { ComponentDocDefinition } from "./types";

function getShowcaseCode(settings?: ComponentSettings) {
  const spinner = settings?.spinner;

  return `import { Spinner } from "@/components/ui/spinner";

export function SpinnerDemo() {
  return <Spinner className="size-6"${spinner?.variant && spinner.variant !== "icon" ? ` variant="${spinner.variant}"` : ""}${spinner?.speed && spinner.speed !== "normal" ? ` speed="${spinner.speed}"` : ""} />;
}`;
}

function Preview({ settings }: { settings?: ComponentSettings }) {
  const spinner = settings?.spinner;

  return (
    <Spinner
      className="size-6"
      speed={spinner?.speed}
      variant={spinner?.variant}
    />
  );
}

const inlineStatusCode = `import { Spinner } from "@/components/ui/spinner";

export function InlineStatus() {
  return (
    <div className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm">
      <Spinner className="size-4" speed="slow" variant="ring" />
      Syncing changes
    </div>
  );
}`;

function InlineStatusExample() {
  return (
    <div className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm">
      <Spinner className="size-4" speed="slow" variant="ring" />
      Syncing changes
    </div>
  );
}

export const spinnerDocs: ComponentDocDefinition = {
  description: "An animated indicator for loading states.",
  examples: [
    {
      code: inlineStatusCode,
      preview: <InlineStatusExample />,
      resetKey: "spinner-inline-loading-example",
      title: "Inline loading",
    },
  ],
  getShowcaseCode,
  importCode: `import { Spinner } from "@/components/ui/spinner";`,
  props: [
    {
      title: "Spinner",
      props: [
        {
          name: "variant",
          type: '"ring" | "icon"',
          defaultValue: '"icon"',
          description: "Sets the spinner visual style.",
        },
        {
          name: "speed",
          type: '"slow" | "normal" | "fast"',
          defaultValue: '"normal"',
          description: "Sets the spin duration from the design system scale.",
        },
      ],
    },
  ],
  renderPreview: (settings) => <Preview settings={settings} />,
  usageCode: `<Spinner className="size-6" />`,
};
