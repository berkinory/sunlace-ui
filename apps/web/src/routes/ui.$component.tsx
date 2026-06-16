import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from "@sunlace/ui";
import { Link, createFileRoute, redirect } from "@tanstack/react-router";

const componentItems = [
  { slug: "accordion", label: "accordion" },
  { slug: "avatar", label: "avatar" },
  { slug: "badge", label: "badge" },
  { slug: "button", label: "button" },
  { slug: "calendar", label: "calendar" },
  { slug: "card", label: "card" },
  { slug: "checkbox", label: "checkbox" },
  { slug: "combobox", label: "combobox" },
  { slug: "context-menu", label: "context menu" },
  { slug: "dialog", label: "dialog" },
  { slug: "drawer", label: "drawer" },
  { slug: "dropdown-menu", label: "dropdown menu" },
  { slug: "input", label: "input" },
  { slug: "kbd", label: "kbd" },
  { slug: "popover", label: "popover" },
  { slug: "progress", label: "progress" },
  { slug: "radio-group", label: "radio group" },
  { slug: "scroll-area", label: "scroll area" },
  { slug: "select", label: "select" },
  { slug: "separator", label: "separator" },
  { slug: "skeleton", label: "skeleton" },
  { slug: "slider", label: "slider" },
  { slug: "sonner", label: "sonner" },
  { slug: "spinner", label: "spinner" },
  { slug: "switch", label: "switch" },
  { slug: "tabs", label: "tabs" },
  { slug: "textarea", label: "textarea" },
  { slug: "toggle", label: "toggle" },
  { slug: "tooltip", label: "tooltip" },
] as const;

type ComponentSlug = (typeof componentItems)[number]["slug"];

const componentBySlug = new Map<ComponentSlug, (typeof componentItems)[number]>(
  componentItems.map((item) => [item.slug, item])
);

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
  const activeComponent = isComponentSlug(component)
    ? (componentBySlug.get(component) ?? componentItems[0])
    : componentItems[0];
  const title = activeComponent.label;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-y-0 left-[8vw] hidden border-l border-dotted border-border lg:block" />
      <div className="pointer-events-none fixed inset-y-0 right-[8vw] hidden border-l border-dotted border-border lg:block" />
      <div className="border-y border-dotted border-border">
        <header className="mx-auto flex h-16 max-w-[1624px] items-center justify-between px-6 lg:px-[10vw]">
          <Link to="/" className="text-xl font-semibold tracking-tight">
            sunlace
          </Link>
          <nav className="flex items-center gap-8 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">
              get started
            </Link>
            <Link
              to="/ui/$component"
              params={{ component: "accordion" }}
              className="font-medium text-foreground"
            >
              components
            </Link>
            <span>updates</span>
          </nav>
        </header>
      </div>

      <div className="mx-auto grid max-w-[1624px] grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)] lg:px-[8vw]">
        <aside className="hidden min-h-[calc(100vh-66px)] border-r border-dotted border-border px-6 py-10 lg:block">
          <nav className="space-y-6">
            <div className="space-y-2">
              <p className="px-3 text-sm text-muted-foreground">get started</p>
              <a className="block px-3 py-1.5 text-sm">installation</a>
              <a className="block px-3 py-1.5 text-sm">cli</a>
            </div>

            <div>
              <p className="mb-3 px-3 text-sm text-muted-foreground">
                components
              </p>
              <div className="space-y-1">
                {componentItems.map((item) => (
                  <Link
                    className="block rounded-md px-3 py-2 text-sm capitalize text-muted-foreground transition-colors hover:bg-muted hover:text-foreground data-active:bg-muted data-active:text-foreground"
                    data-active={
                      item.slug === activeComponent.slug ? true : undefined
                    }
                    key={item.slug}
                    params={{ component: item.slug }}
                    to="/ui/$component"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </aside>

        <section className="grid min-h-[calc(100vh-66px)] grid-cols-1 xl:grid-cols-[minmax(0,1fr)_240px]">
          <article className="px-6 py-10 lg:px-16">
            <div className="text-sm font-medium text-muted-foreground">
              components <span className="px-2">›</span>
              <span className="text-foreground">{title}</span>
            </div>

            <div className="mt-8 space-y-4">
              <h1 className="text-4xl font-semibold tracking-normal capitalize">
                {title}
              </h1>
              <p className="max-w-3xl text-lg text-muted-foreground">
                {activeComponent.slug === "accordion"
                  ? "displays a simple disclosure stack with accessible keyboard behavior."
                  : "component documentation shell. preview examples will be added as we customize each primitive."}
              </p>
              <div className="flex gap-2">
                <Button variant="outline">docs</Button>
                <Button variant="outline">component api</Button>
              </div>
            </div>

            <div className="mt-24 flex items-center justify-between border-b border-border pb-4 text-sm">
              <div className="flex gap-5">
                <span className="font-medium">preview</span>
                <span className="text-muted-foreground">code</span>
              </div>
              <button className="text-muted-foreground hover:text-foreground">
                copy code
              </button>
            </div>

            <div className="flex min-h-[420px] items-center justify-center rounded-lg border border-border bg-card/20 p-8">
              {activeComponent.slug === "accordion" ? (
                <Accordion
                  className="w-full max-w-xl"
                  defaultValue={["item-1"]}
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger>is it accessible?</AccordionTrigger>
                    <AccordionContent>
                      yes. it uses base ui primitives and keeps keyboard
                      behavior intact.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>is it customizable?</AccordionTrigger>
                    <AccordionContent>
                      yes. source files live in the repo and are meant to be
                      edited.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>can it be animated?</AccordionTrigger>
                    <AccordionContent>
                      yes. motion stays css based through tailwind utilities.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ) : (
                <div className="text-center">
                  <p className="text-sm font-medium capitalize">{title}</p>
                  <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                    preview pending.
                  </p>
                </div>
              )}
            </div>

            <section className="mt-24" id="usage">
              <h2 className="border-b border-border pb-4 text-2xl font-semibold">
                usage
              </h2>
              <pre className="mt-8 overflow-x-auto rounded-lg border border-border bg-muted/30 p-6 text-sm text-muted-foreground">
                <code>{`import { ${toPascalCase(title)} } from "@sunlace/ui"`}</code>
              </pre>
            </section>
          </article>

          <aside className="hidden px-8 py-16 xl:block">
            <div className="sticky top-24 space-y-3 text-sm">
              <a className="block font-medium text-foreground" href="#usage">
                usage
              </a>
              <a className="block text-muted-foreground" href="#installation">
                installation
              </a>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

function toPascalCase(value: string) {
  return value
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function isComponentSlug(value: string): value is ComponentSlug {
  return componentBySlug.has(value as ComponentSlug);
}
