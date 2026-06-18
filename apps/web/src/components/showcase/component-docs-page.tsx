import { Button } from "@sunlace/ui";
import type { ReactNode } from "react";

import { componentDocs } from "./component-docs";
import type { ComponentProp } from "./component-docs/types";
import { type ComponentSlug, componentBySlug } from "./component-registry";
import { ComponentSettingsController } from "./component-settings-controller";
import { CodeBlock, ShowcaseExample } from "./showcase-example";
import { ShowcaseLayout } from "./showcase-layout";

const tocItems = [
  { id: "showcase", label: "Showcase" },
  { id: "installation", label: "Installation" },
  { id: "usage", label: "Usage" },
  { id: "examples", label: "Examples" },
  { id: "props", label: "Props" },
];

function ComponentDocsPage({ component }: { component: ComponentSlug }) {
  const metadata = componentBySlug.get(component);

  if (!metadata) {
    throw new Error(`component metadata is missing for ${component}`);
  }

  const docs = componentDocs[component];
  const title = metadata.label;

  return (
    <ComponentSettingsController component={component}>
      {({ controls, settings }) => {
        const examples = docs.examples ?? [
          {
            code: docs.getShowcaseCode(settings),
            preview: docs.renderPreview(settings),
            resetKey: `${component}-example`,
            title: `${title} Example`,
          },
        ];

        return (
          <ShowcaseLayout activeSlug={component} tocItems={tocItems}>
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
                  {docs.description}
                </p>
                <div className="flex gap-2">
                  <Button variant="outline">Docs</Button>
                  <Button variant="outline">Component API</Button>
                </div>
              </div>

              <div className="mt-12">
                <ShowcaseExample
                  code={docs.getShowcaseCode(settings)}
                  controls={controls}
                  preview={docs.renderPreview(settings)}
                  resetKey={component}
                />
              </div>

              <Section id="installation" title="Installation">
                <pre className="overflow-x-auto rounded-lg border border-border bg-muted/30 p-6 font-mono text-sm text-muted-foreground">
                  <code>{`bunx --bun shadcn@latest add ${component} --cwd packages/ui`}</code>
                </pre>
              </Section>

              <Section id="usage" title="Usage">
                <div className="grid gap-4">
                  <div className="overflow-hidden rounded-lg border border-border bg-muted/30">
                    <CodeBlock code={docs.importCode} />
                  </div>
                  <div className="overflow-hidden rounded-lg border border-border bg-muted/30">
                    <CodeBlock code={docs.usageCode} />
                  </div>
                </div>
              </Section>

              <Section id="examples" title="Examples">
                <div className="space-y-8">
                  {examples.map((example) => (
                    <div key={example.resetKey}>
                      <p className="mb-3 text-base font-medium text-foreground">
                        {example.title}
                      </p>
                      <ShowcaseExample
                        code={example.code}
                        preview={example.preview}
                        resetKey={example.resetKey}
                      />
                    </div>
                  ))}
                </div>
              </Section>

              <Section id="props" title="Props">
                {docs.props?.length ? (
                  <div className="space-y-8">
                    {docs.props.map((group) => (
                      <div className="space-y-3" key={group.title}>
                        <h3 className="text-base font-medium text-foreground">
                          {group.title}
                        </h3>
                        <PropsTable props={group.props} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-border px-4 py-3 text-sm text-muted-foreground">
                    No custom props documented yet.
                  </div>
                )}
                <PropsFootnote
                  component={component}
                  primitiveDocsUrl={docs.primitiveDocsUrl}
                  title={title}
                />
              </Section>
            </article>
          </ShowcaseLayout>
        );
      }}
    </ComponentSettingsController>
  );
}

function Section({
  children,
  id,
  title,
}: {
  children: ReactNode;
  id: string;
  title: string;
}) {
  return (
    <section className="mt-12 scroll-mt-7" id={id}>
      <h2 className="border-b border-border pb-4 text-2xl font-semibold">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function PropsTable({ props }: { props: ComponentProp[] }) {
  return (
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
          {props.map((prop) => (
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
  );
}

function PropsFootnote({
  component,
  primitiveDocsUrl,
  title,
}: {
  component: ComponentSlug;
  primitiveDocsUrl?: string;
  title: string;
}) {
  if (component === "badge") {
    return (
      <p className="mt-3 text-sm text-muted-foreground">
        Also supports{" "}
        <a
          className="underline underline-offset-3 hover:text-foreground"
          href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/span"
          rel="noreferrer"
          target="_blank"
        >
          native span props
        </a>{" "}
        through the{" "}
        <a
          className="underline underline-offset-3 hover:text-foreground"
          href="https://base-ui.com/react/overview/composition"
          rel="noreferrer"
          target="_blank"
        >
          render API
        </a>
        .
      </p>
    );
  }

  if (!primitiveDocsUrl) {
    return null;
  }

  return (
    <p className="mt-3 text-sm text-muted-foreground">
      Also supports Base UI {title.toLowerCase()} primitive props. See{" "}
      <a
        className="underline underline-offset-3 hover:text-foreground"
        href={primitiveDocsUrl}
        rel="noreferrer"
        target="_blank"
      >
        Base UI {title}
      </a>
      .
    </p>
  );
}

export { ComponentDocsPage };
