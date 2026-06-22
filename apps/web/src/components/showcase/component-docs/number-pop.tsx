import { Button, NumberPop, Slider } from "@sunlace/ui";
import { useState } from "react";

import type { ComponentDocDefinition } from "./types";

const showcaseCode = `import { NumberPop } from "@/components/ui/number-pop";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export function NumberPopDemo() {
  const [value, setValue] = useState(50);

  return (
    <div className="flex w-64 flex-col items-center gap-4">
      <NumberPop size="xl" value={value} />
      <Slider max={100} onValueChange={(v) => setValue(Array.isArray(v) ? v[0] : v)} value={[value]} />
    </div>
  );
}`;

function Preview() {
  const [value, setValue] = useState(50);

  return (
    <div className="flex w-64 flex-col items-center gap-4">
      <NumberPop size="xl" value={value} />
      <Slider
        max={100}
        onValueChange={(v) => setValue(Array.isArray(v) ? v[0] : v)}
        value={[value]}
      />
    </div>
  );
}

const counterCode = `import { Button, NumberPop } from "@/sunlace/ui";
import { useState } from "react";

export function RevenueCounter() {
  const [revenue, setRevenue] = useState(128405);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-1">
        <span className="text-sm text-muted-foreground">Total revenue</span>
        <NumberPop size="xl" value={\`$\${revenue.toLocaleString()}\`} />
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setRevenue((r) => r + 1250)}
        >
          Add sale
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setRevenue((r) => Math.max(0, r - 1250))}
        >
          Refund
        </Button>
      </div>
    </div>
  );
}`;

function CounterExample() {
  const [revenue, setRevenue] = useState(128405);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-1">
        <span className="text-sm text-muted-foreground">Total revenue</span>
        <NumberPop size="xl" value={`$${revenue.toLocaleString()}`} />
      </div>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setRevenue((r) => r + 1250)}
        >
          Add sale
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setRevenue((r) => Math.max(0, r - 1250))}
        >
          Refund
        </Button>
      </div>
    </div>
  );
}

export const numberPopDocs: ComponentDocDefinition = {
  description: "An animated number that pops in with staggered digits.",
  examples: [
    {
      code: counterCode,
      preview: <CounterExample />,
      resetKey: "number-pop-counter-example",
      title: "Revenue counter",
    },
  ],
  getShowcaseCode: () => showcaseCode,
  importCode: `import { NumberPop } from "@/components/ui/number-pop";`,
  props: [
    {
      title: "NumberPop",
      props: [
        {
          name: "value",
          type: "string | number",
          defaultValue: "-",
          description:
            "The number to display. Replays the animation when it changes.",
        },
        {
          name: "playKey",
          type: "number | string",
          defaultValue: "-",
          description:
            "Change this to force a replay without changing the value.",
        },
        {
          name: "size",
          type: '"default" | "sm" | "lg" | "xl"',
          defaultValue: '"default"',
          description: "Controls the text size and weight.",
        },
      ],
    },
  ],
  renderPreview: () => <Preview />,
  usageCode: `<NumberPop size="xl" value="1,284.05" />`,
};
