import { Slider } from "@sunlace/ui";
import { useState } from "react";

import type { ComponentSettings } from "../component-catalog";
import type { ComponentDocDefinition } from "./types";

function getShowcaseCode(settings?: ComponentSettings) {
  const slider = settings?.slider;
  const values = slider?.range ? "[24, 72]" : "[44]";

  return `import { Slider } from "@/components/ui/slider";

export function SliderDemo() {
  return (
    <Slider
      className="${slider?.orientation === "vertical" ? "h-48" : "max-w-sm"}"
      defaultValue={${values}}${slider?.disabled ? "\n      disabled" : ""}${slider?.orientation === "vertical" ? '\n      orientation="vertical"' : ""}
    />
  );
}`;
}

const volumeCode = `import { useState } from "react";

import { Slider } from "@/components/ui/slider";

export function VolumeSlider() {
  const [volume, setVolume] = useState([68]);

  return (
    <div className="grid w-full max-w-sm gap-3">
      <Slider
        onValueChange={(value) => {
          setVolume(Array.isArray(value) ? [...value] : [value]);
        }}
        value={volume}
      />
      <p className="h-5 text-center text-sm text-muted-foreground">
        Volume{" "}
        <span className="inline-block w-10 tabular-nums text-foreground">
          {volume[0]}%
        </span>
      </p>
    </div>
  );
}`;

function Preview({ settings }: { settings?: ComponentSettings }) {
  const slider = settings?.slider;

  return (
    <Slider
      className={slider?.orientation === "vertical" ? "h-48" : "max-w-sm"}
      defaultValue={slider?.range ? [24, 72] : [44]}
      disabled={slider?.disabled}
      key={`${slider?.orientation}-${slider?.range}`}
      orientation={slider?.orientation}
    />
  );
}

function VolumeExample() {
  const [volume, setVolume] = useState([68]);

  return (
    <div className="grid w-full max-w-sm gap-3">
      <Slider
        onValueChange={(value) => {
          setVolume(Array.isArray(value) ? [...value] : [value]);
        }}
        value={volume}
      />
      <p className="h-5 text-center text-sm text-muted-foreground">
        Volume{" "}
        <span className="inline-block w-10 tabular-nums text-foreground">
          {volume[0]}%
        </span>
      </p>
    </div>
  );
}

export const sliderDocs: ComponentDocDefinition = {
  description: "A draggable control for numeric value or range selection.",
  examples: [
    {
      code: volumeCode,
      preview: <VolumeExample />,
      resetKey: "slider-volume-example",
      title: "Volume control",
    },
  ],
  getShowcaseCode,
  importCode: `import { Slider } from "@/components/ui/slider";`,
  primitiveDocsUrl: "https://base-ui.com/react/components/slider",
  props: [
    {
      title: "Slider",
      props: [
        {
          name: "value",
          type: "number[]",
          defaultValue: "-",
          description: "Controls the selected value or range.",
        },
        {
          name: "defaultValue",
          type: "number[]",
          defaultValue: "-",
          description: "Sets the initial uncontrolled value or range.",
        },
        {
          name: "min",
          type: "number",
          defaultValue: "0",
          description: "Sets the minimum value.",
        },
        {
          name: "max",
          type: "number",
          defaultValue: "100",
          description: "Sets the maximum value.",
        },
        {
          name: "step",
          type: "number",
          defaultValue: "1",
          description: "Sets the increment between values.",
        },
        {
          name: "orientation",
          type: '"horizontal" | "vertical"',
          defaultValue: '"horizontal"',
          description: "Sets the slider direction.",
        },
      ],
    },
  ],
  renderPreview: (settings) => <Preview settings={settings} />,
  usageCode: `<Slider defaultValue={[44]} />`,
};
