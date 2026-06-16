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
    });
  }, [activeComponent.slug]);

  return (
    <ShowcaseLayout activeSlug={activeComponent.slug}>
      <article className="pt-7 pb-10 lg:px-20">
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

        <div className="mt-12 space-y-3">
          {activeComponent.slug === "accordion" ? (
            <div className="flex flex-wrap items-center gap-5 text-sm">
              <label className="flex items-center gap-2 text-muted-foreground">
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
                Show Arrow
              </label>
              <label className="flex items-center gap-2 text-muted-foreground">
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
                Multiple
              </label>
              <label className="flex items-center gap-2 text-muted-foreground">
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
                Borders
              </label>
            </div>
          ) : null}
          <ShowcaseExample
            code={getComponentExampleCode(activeComponent.slug, settings)}
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
