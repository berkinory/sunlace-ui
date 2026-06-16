import { Settings03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button, Switch } from "@sunlace/ui";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import {
  ComponentPreview,
  type ComponentSettings,
  componentBySlug,
  getComponentExampleCode,
  isComponentSlug,
  toPascalCase,
} from "@/components/showcase/component-registry";
import {
  CodeBlock,
  ShowcaseExample,
} from "@/components/showcase/showcase-example";
import { ShowcaseLayout } from "@/components/showcase/showcase-layout";

export const Route = createFileRoute("/ui/$component")({
  beforeLoad: ({ params }) => {
    if (!isComponentSlug(params.component)) {
      throw redirect({
        to: "/ui/$component",
        params: { component: "accordion" },
      });
    }
  },
  component: UiComponent,
  head: ({ params }) => ({
    meta: [{ title: `${params.component} - sunlace` }],
  }),
});

const accordionProps = [
  {
    name: "borders",
    target: "Accordion",
    type: "boolean",
    defaultValue: "false",
    description: "Wraps the accordion in a connected border treatment.",
  },
  {
    name: "multiple",
    target: "Accordion",
    type: "boolean",
    defaultValue: "false",
    description: "Allows more than one item to stay open at the same time.",
  },
  {
    name: "showArrow",
    target: "AccordionTrigger",
    type: "boolean",
    defaultValue: "true",
    description: "Shows or hides the trigger arrow icon.",
  },
  {
    name: "underline",
    target: "AccordionTrigger",
    type: "boolean",
    defaultValue: "true",
    description: "Controls the trigger underline on hover.",
  },
];

const propGroups = [
  {
    title: "Accordion",
    props: accordionProps.filter((prop) => prop.target === "Accordion"),
  },
  {
    title: "AccordionTrigger",
    props: accordionProps.filter((prop) => prop.target === "AccordionTrigger"),
  },
];

function UiComponent() {
  const { component } = Route.useParams();
  const [accordionSettings, setAccordionSettings] = useState({
    borders: false,
    multiple: false,
    showArrow: true,
    underline: true,
  });
  const activeComponent = isComponentSlug(component)
    ? (componentBySlug.get(component) ?? componentBySlug.get("accordion"))
    : componentBySlug.get("accordion");

  if (!activeComponent) {
    throw new Error("accordion component metadata is missing");
  }

  const title = activeComponent.label;
  const importCode =
    activeComponent.slug === "accordion"
      ? `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";`
      : `import { ${toPascalCase(title)} } from "@/components/ui/${activeComponent.slug}";`;
  const usageCode =
    activeComponent.slug === "accordion"
      ? `<Accordion defaultValue={["item-1"]}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It follows accessible disclosure behavior.
    </AccordionContent>
  </AccordionItem>
</Accordion>`
      : `<${toPascalCase(title)} />`;
  const settings: ComponentSettings = {
    accordion: accordionSettings,
  };
  const tocItems = useMemo(
    () => [
      { id: "showcase", label: "Showcase" },
      { id: "installation", label: "Installation" },
      { id: "usage", label: "Usage" },
      { id: "props", label: "Props" },
    ],
    []
  );

  useEffect(() => {
    setAccordionSettings({
      borders: false,
      multiple: false,
      showArrow: true,
      underline: true,
    });
  }, [activeComponent.slug]);

  const controls =
    activeComponent.slug === "accordion" ? (
      <div className="space-y-4 text-xs">
        <div className="flex items-center gap-2 border-border border-b pb-3 font-medium text-foreground">
          <HugeiconsIcon
            aria-hidden
            icon={Settings03Icon}
            size={14}
            strokeWidth={2}
          />
          Settings
        </div>

        <div className="space-y-2">
          <p className="font-medium text-foreground">Accordion</p>
          <div className="space-y-1.5 rounded-md bg-muted/40 p-2.5">
            <label className="flex items-center justify-between gap-3 text-muted-foreground">
              Multiple
              <Switch
                checked={accordionSettings.multiple}
                onCheckedChange={(checked) => {
                  setAccordionSettings((current) => ({
                    ...current,
                    multiple: checked,
                  }));
                }}
                size="sm"
              />
            </label>
            <label className="flex items-center justify-between gap-3 text-muted-foreground">
              Borders
              <Switch
                checked={accordionSettings.borders}
                onCheckedChange={(checked) => {
                  setAccordionSettings((current) => ({
                    ...current,
                    borders: checked,
                  }));
                }}
                size="sm"
              />
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <p className="font-medium text-foreground">AccordionTrigger</p>
          <div className="rounded-md bg-muted/40 p-2.5">
            <div className="space-y-1.5">
              <label className="flex items-center justify-between gap-3 text-muted-foreground">
                Show Arrow
                <Switch
                  checked={accordionSettings.showArrow}
                  onCheckedChange={(checked) => {
                    setAccordionSettings((current) => ({
                      ...current,
                      showArrow: checked,
                    }));
                  }}
                  size="sm"
                />
              </label>
              <label className="flex items-center justify-between gap-3 text-muted-foreground">
                Underline
                <Switch
                  checked={accordionSettings.underline}
                  onCheckedChange={(checked) => {
                    setAccordionSettings((current) => ({
                      ...current,
                      underline: checked,
                    }));
                  }}
                  size="sm"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    ) : null;

  return (
    <ShowcaseLayout activeSlug={activeComponent.slug} tocItems={tocItems}>
      <article className="scroll-mt-7 pt-7 pb-10 lg:px-16" id="showcase">
        <div className="text-sm font-medium text-muted-foreground">
          Components <span className="px-2">›</span>
          <span className="text-foreground">{title}</span>
        </div>

        <div className="mt-6 space-y-4">
          <h1 className="text-4xl font-semibold tracking-normal capitalize">
            {title}
          </h1>
          <p className="max-w-3xl text-lg text-muted-foreground">
            {activeComponent.slug === "accordion"
              ? "A vertically stacked set of interactive headings that each reveal a section of content."
              : "Temporary component preview while the docs system is shaped."}
          </p>
          <div className="flex gap-2">
            <Button variant="outline">Docs</Button>
            <Button variant="outline">Component API</Button>
          </div>
        </div>

        <div className="mt-12">
          <ShowcaseExample
            code={getComponentExampleCode(activeComponent.slug, settings)}
            controls={controls}
            preview={
              <ComponentPreview
                component={activeComponent.slug}
                settings={settings}
              />
            }
            resetKey={activeComponent.slug}
          />
        </div>

        <section className="mt-12 scroll-mt-7" id="installation">
          <h2 className="border-b border-border pb-4 text-2xl font-semibold">
            Installation
          </h2>
          <pre className="mt-6 overflow-x-auto rounded-lg border border-border bg-muted/30 p-6 font-mono text-sm text-muted-foreground">
            <code>{`bunx --bun shadcn@latest add ${activeComponent.slug} --cwd packages/ui`}</code>
          </pre>
        </section>

        <section className="mt-12 scroll-mt-7" id="usage">
          <h2 className="border-b border-border pb-4 text-2xl font-semibold">
            Usage
          </h2>
          <div className="mt-6 grid gap-4">
            <div className="overflow-hidden rounded-lg border border-border bg-muted/30">
              <CodeBlock code={importCode} />
            </div>
            <div className="overflow-hidden rounded-lg border border-border bg-muted/30">
              <CodeBlock code={usageCode} />
            </div>
          </div>
        </section>

        <section className="mt-12 scroll-mt-7" id="props">
          <h2 className="border-b border-border pb-4 text-2xl font-semibold">
            Props
          </h2>
          <div className="mt-6 space-y-8">
            {activeComponent.slug === "accordion" ? (
              propGroups.map((group) => (
                <div className="space-y-3" key={group.title}>
                  <h3 className="text-base font-medium text-foreground">
                    {group.title}
                  </h3>
                  <div className="showcase-scrollbar overflow-x-auto rounded-lg border border-border">
                    <table className="w-full min-w-[720px] text-left text-sm">
                      <thead className="bg-muted/30 text-muted-foreground">
                        <tr>
                          <th className="px-4 py-3 font-medium">Prop</th>
                          <th className="px-4 py-3 font-medium">Type</th>
                          <th className="px-4 py-3 font-medium">Default</th>
                          <th className="px-4 py-3 font-medium">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {group.props.map((prop) => (
                          <tr key={prop.name}>
                            <td className="px-4 py-3 font-mono text-foreground">
                              {prop.name}
                            </td>
                            <td className="px-4 py-3 font-mono text-muted-foreground">
                              {prop.type}
                            </td>
                            <td className="px-4 py-3 font-mono text-muted-foreground">
                              {prop.defaultValue}
                            </td>
                            <td className="px-4 py-3 text-muted-foreground">
                              {prop.description}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-lg border border-border px-4 py-3 text-sm text-muted-foreground">
                No custom props documented yet.
              </div>
            )}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Also supports Base UI accordion primitive props. See{" "}
            <a
              className="underline underline-offset-3 hover:text-foreground"
              href="https://base-ui.com/react/components/accordion"
              rel="noreferrer"
              target="_blank"
            >
              Base UI Accordion
            </a>
            .
          </p>
        </section>
      </article>
    </ShowcaseLayout>
  );
}
