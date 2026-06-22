import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@sunlace/ui";

import type { ComponentSettings } from "../component-catalog";
import type { ComponentDocDefinition } from "./types";

const exampleCode = `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function AccordionCardDemo() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Release checklist</CardTitle>
        <CardDescription>
          Track the final passes before publishing a component update.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion defaultValue={["design"]}>
          <AccordionItem value="design">
            <AccordionTrigger>Design review</AccordionTrigger>
            <AccordionContent>
              Validate spacing, color tokens, focus states, and dark mode.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="qa">
            <AccordionTrigger>QA pass</AccordionTrigger>
            <AccordionContent>
              Test keyboard navigation across desktop and mobile viewports.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="docs">
            <AccordionTrigger>Docs update</AccordionTrigger>
            <AccordionContent>
              Keep the usage snippet aligned with the shipped component API.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}`;

function Example() {
  return (
    <div className="w-[28rem] max-w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Release checklist</CardTitle>
          <CardDescription>
            Track the final passes before publishing a component update.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion defaultValue={["design"]}>
            <AccordionItem value="design">
              <AccordionTrigger>Design review</AccordionTrigger>
              <AccordionContent>
                Validate spacing, color tokens, focus states, and dark mode.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="qa">
              <AccordionTrigger>QA pass</AccordionTrigger>
              <AccordionContent>
                Test keyboard navigation across desktop and mobile viewports.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="docs">
              <AccordionTrigger>Docs update</AccordionTrigger>
              <AccordionContent>
                Keep the usage snippet aligned with the shipped component API.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}

function renderPreview(settings?: ComponentSettings) {
  return (
    <Accordion
      className={
        settings?.accordion?.borders
          ? "w-full max-w-xl rounded-lg border px-3"
          : "w-full max-w-xl"
      }
      defaultValue={["item-1"]}
      multiple={settings?.accordion?.multiple}
    >
      <AccordionItem value="item-1">
        <AccordionTrigger
          showArrow={settings?.accordion?.showArrow}
          underline={settings?.accordion?.underline}
        >
          Is it accessible?
        </AccordionTrigger>
        <AccordionContent>
          Yes. It uses Base UI primitives and keeps keyboard behavior intact.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger
          showArrow={settings?.accordion?.showArrow}
          underline={settings?.accordion?.underline}
        >
          Is it customizable?
        </AccordionTrigger>
        <AccordionContent>
          Yes. Source files live in the repo and are meant to be edited.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger
          showArrow={settings?.accordion?.showArrow}
          underline={settings?.accordion?.underline}
        >
          Can it be animated?
        </AccordionTrigger>
        <AccordionContent>
          Yes. Motion stays CSS based through Tailwind utilities.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function getShowcaseCode(settings?: ComponentSettings) {
  return `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionDemo() {
  return (
    <Accordion${settings?.accordion?.borders ? ' className="rounded-lg border px-3"' : ""} defaultValue={["item-1"]}${settings?.accordion?.multiple ? " multiple" : ""}>
      <AccordionItem value="item-1">
        <AccordionTrigger${settings?.accordion?.showArrow === false ? " showArrow={false}" : ""}${settings?.accordion?.underline === false ? " underline={false}" : ""}>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It uses Base UI primitives and keeps keyboard behavior intact.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger${settings?.accordion?.showArrow === false ? " showArrow={false}" : ""}${settings?.accordion?.underline === false ? " underline={false}" : ""}>Is it customizable?</AccordionTrigger>
        <AccordionContent>
          Yes. Source files live in the repo and are meant to be edited.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger${settings?.accordion?.showArrow === false ? " showArrow={false}" : ""}${settings?.accordion?.underline === false ? " underline={false}" : ""}>Can it be animated?</AccordionTrigger>
        <AccordionContent>
          Yes. Motion stays CSS based through Tailwind utilities.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`;
}

export const accordionDocs: ComponentDocDefinition = {
  description: "A stack of collapsible sections.",
  examples: [
    {
      code: exampleCode,
      preview: <Example />,
      resetKey: "accordion-card-example",
      title: "Release checklist",
    },
  ],
  getShowcaseCode,
  importCode: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";`,
  primitiveDocsUrl: "https://base-ui.com/react/components/accordion",
  props: [
    {
      title: "Accordion",
      props: [
        {
          name: "borders",
          type: "boolean",
          defaultValue: "false",
          description: "Wraps the accordion in a connected border treatment.",
        },
        {
          name: "multiple",
          type: "boolean",
          defaultValue: "false",
          description:
            "Allows more than one item to stay open at the same time.",
        },
      ],
    },
    {
      title: "AccordionTrigger",
      props: [
        {
          name: "showArrow",
          type: "boolean",
          defaultValue: "true",
          description: "Shows or hides the trigger arrow icon.",
        },
        {
          name: "underline",
          type: "boolean",
          defaultValue: "true",
          description: "Controls the trigger underline on hover.",
        },
      ],
    },
  ],
  renderPreview,
  usageCode: `<Accordion defaultValue={["item-1"]}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It follows accessible disclosure behavior.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
};
