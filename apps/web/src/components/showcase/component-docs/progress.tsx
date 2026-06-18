import { Button, Progress, ProgressLabel, ProgressValue } from "@sunlace/ui";
import { useState } from "react";

import type { ComponentSettings } from "../component-catalog";
import type { ComponentDocDefinition } from "./types";

function getShowcaseCode(settings?: ComponentSettings) {
  const progress = settings?.progress;
  const value = progress?.indeterminate ? "null" : "64";

  return `import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress";

export function ProgressDemo() {
  return (
    <Progress className="max-w-sm" value={${value}}>${
      progress?.showLabel === false
        ? ""
        : `
      <ProgressLabel>Uploading Assets</ProgressLabel>
      <ProgressValue />`
    }
    </Progress>
  );
}`;
}

const controlledCode = `import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress";

export function ControlledProgress() {
  const [value, setValue] = useState(32);

  return (
    <div className="grid w-full max-w-sm gap-4">
      <Progress value={value}>
        <ProgressLabel>Project Setup</ProgressLabel>
        <ProgressValue />
      </Progress>
      <Button
        disabled={value === 100}
        onClick={() => setValue((current) => Math.min(current + 17, 100))}
        size="sm"
        variant="outline"
      >
        Advance Progress
      </Button>
    </div>
  );
}`;

const indeterminateCode = `import {
  Progress,
  ProgressLabel,
} from "@/components/ui/progress";

export function IndeterminateProgress() {
  return (
    <Progress className="w-full max-w-sm" value={null}>
      <ProgressLabel>Preparing Deployment</ProgressLabel>
    </Progress>
  );
}`;

function Preview({ settings }: { settings?: ComponentSettings }) {
  const progress = settings?.progress;

  return (
    <Progress className="max-w-sm" value={progress?.indeterminate ? null : 64}>
      {progress?.showLabel === false ? null : (
        <>
          <ProgressLabel>Uploading Assets</ProgressLabel>
          <ProgressValue />
        </>
      )}
    </Progress>
  );
}

function ControlledExample() {
  const [value, setValue] = useState(32);

  return (
    <div className="grid w-full max-w-sm gap-4">
      <Progress value={value}>
        <ProgressLabel>Project Setup</ProgressLabel>
        <ProgressValue />
      </Progress>
      <Button
        disabled={value === 100}
        onClick={() => {
          setValue((current) => Math.min(current + 17, 100));
        }}
        size="sm"
        variant="outline"
      >
        Advance Progress
      </Button>
    </div>
  );
}

function IndeterminateExample() {
  return (
    <Progress className="w-full max-w-sm" value={null}>
      <ProgressLabel>Preparing Deployment</ProgressLabel>
    </Progress>
  );
}

export const progressDocs: ComponentDocDefinition = {
  description:
    "A determinate or indeterminate indicator for task and process completion.",
  examples: [
    {
      code: controlledCode,
      preview: <ControlledExample />,
      resetKey: "progress-controlled-example",
      title: "Controlled Progress",
    },
    {
      code: indeterminateCode,
      preview: <IndeterminateExample />,
      resetKey: "progress-indeterminate-example",
      title: "Indeterminate Progress",
    },
  ],
  getShowcaseCode,
  importCode: `import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress";`,
  primitiveDocsUrl: "https://base-ui.com/react/components/progress",
  props: [
    {
      title: "Progress",
      props: [
        {
          name: "value",
          type: "number | null",
          defaultValue: "null",
          description: "Sets progress or enables the indeterminate state.",
        },
        {
          name: "min",
          type: "number",
          defaultValue: "0",
          description: "Sets the minimum progress value.",
        },
        {
          name: "max",
          type: "number",
          defaultValue: "100",
          description: "Sets the maximum progress value.",
        },
        {
          name: "size",
          type: '"default" | "sm"',
          defaultValue: '"default"',
          description: "Sets the track thickness.",
        },
      ],
    },
  ],
  renderPreview: (settings) => <Preview settings={settings} />,
  usageCode: `<Progress value={64}>
  <ProgressLabel>Uploading</ProgressLabel>
  <ProgressValue />
</Progress>`,
};
