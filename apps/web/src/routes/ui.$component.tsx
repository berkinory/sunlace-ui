import { Settings03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button, Switch } from "@sunlace/ui";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import {
  ComponentPreview,
  type ComponentSettings,
  componentBySlug,
  getComponentExampleCode,
  isComponentSlug,
} from "@/components/showcase/component-registry";
import { ShowcaseExample } from "@/components/showcase/showcase-example";
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
  const settings: ComponentSettings = {
    accordion: accordionSettings,
  };

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
    <ShowcaseLayout activeSlug={activeComponent.slug}>
      <article className="pt-7 pb-10 lg:px-16">
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

        <section className="mt-12" id="installation">
          <h2 className="border-b border-border pb-4 text-2xl font-semibold">
            Installation
          </h2>
          <pre className="mt-6 overflow-x-auto rounded-lg border border-border bg-muted/30 p-6 font-mono text-sm text-muted-foreground">
            <code>{`bunx --bun shadcn@latest add ${activeComponent.slug} --cwd packages/ui`}</code>
          </pre>
        </section>
      </article>
    </ShowcaseLayout>
  );
}
