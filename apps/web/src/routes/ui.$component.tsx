import { Settings03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  Switch,
} from "@sunlace/ui";
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

const avatarProps = [
  {
    name: "shape",
    target: "Avatar",
    type: '"circle" | "rounded" | "square"',
    defaultValue: '"circle"',
    description: "Controls the avatar corner treatment.",
  },
  {
    name: "size",
    target: "Avatar",
    type: '"sm" | "default" | "lg"',
    defaultValue: '"default"',
    description: "Controls the avatar dimensions.",
  },
];

const ditherAvatarProps = [
  {
    name: "hash",
    target: "DitherAvatar",
    type: "string",
    defaultValue: "-",
    description: "Seed string used to generate the deterministic dither image.",
  },
  {
    name: "shape",
    target: "DitherAvatar",
    type: '"circle" | "rounded" | "square"',
    defaultValue: '"circle"',
    description: "Controls the avatar corner treatment.",
  },
  {
    name: "size",
    target: "DitherAvatar",
    type: '"sm" | "default" | "lg"',
    defaultValue: '"default"',
    description: "Controls the avatar dimensions.",
  },
  {
    name: "dotScale",
    target: "DitherAvatar",
    type: "number",
    defaultValue: "1",
    description: "Controls the dither cell size.",
  },
  {
    name: "tones",
    target: "DitherAvatar",
    type: "HashvatarOptions['tones']",
    defaultValue: "-",
    description: "Restricts generated colors to selected tone families.",
  },
];

const componentPropGroups = {
  accordion: [
    {
      title: "Accordion",
      props: accordionProps.filter((prop) => prop.target === "Accordion"),
    },
    {
      title: "AccordionTrigger",
      props: accordionProps.filter(
        (prop) => prop.target === "AccordionTrigger"
      ),
    },
  ],
  avatar: [
    {
      title: "Avatar",
      props: avatarProps.filter((prop) => prop.target === "Avatar"),
    },
  ],
  "dither-avatar": [
    {
      title: "DitherAvatar",
      props: ditherAvatarProps.filter((prop) => prop.target === "DitherAvatar"),
    },
  ],
};

function UiComponent() {
  const { component } = Route.useParams();
  const [accordionSettings, setAccordionSettings] = useState({
    borders: false,
    multiple: false,
    showArrow: true,
    underline: true,
  });
  const [avatarSettings, setAvatarSettings] = useState<
    NonNullable<ComponentSettings["avatar"]>
  >({
    shape: "circle",
  });
  const [ditherAvatarSettings, setDitherAvatarSettings] = useState<
    NonNullable<ComponentSettings["ditherAvatar"]>
  >({
    dotScale: 1,
    shape: "circle",
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
      : activeComponent.slug === "avatar"
        ? `import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";`
        : activeComponent.slug === "dither-avatar"
          ? `import { DitherAvatar } from "@/components/ui/dither-avatar";`
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
      : activeComponent.slug === "avatar"
        ? `<AvatarGroup>
  <Avatar>
    <AvatarImage alt="Ava" src="/avatars/ava.jpg" />
    <AvatarFallback>AV</AvatarFallback>
    <AvatarBadge />
  </Avatar>
  <Avatar>
    <AvatarFallback>SL</AvatarFallback>
  </Avatar>
  <AvatarGroupCount>+4</AvatarGroupCount>
</AvatarGroup>`
        : activeComponent.slug === "dither-avatar"
          ? `<div className="flex items-center gap-3">
  <DitherAvatar hash="sunlace" />
  <DitherAvatar hash="ui" />
</div>`
          : `<${toPascalCase(title)} />`;
  const settings: ComponentSettings = {
    accordion: accordionSettings,
    avatar: avatarSettings,
    ditherAvatar: ditherAvatarSettings,
  };
  const propGroups =
    componentPropGroups[
      activeComponent.slug as keyof typeof componentPropGroups
    ] ?? [];
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
    setAvatarSettings({
      shape: "circle",
    });
    setDitherAvatarSettings({
      dotScale: 1,
      shape: "circle",
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
    ) : activeComponent.slug === "avatar" ||
      activeComponent.slug === "dither-avatar" ? (
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
          <p className="font-medium text-foreground">{title}</p>
          <div className="rounded-md bg-muted/40 p-2.5">
            <label className="flex items-center justify-between gap-3 text-muted-foreground">
              Shape
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="min-w-24 justify-between"
                  render={<Button size="sm" variant="outline" />}
                >
                  {(activeComponent.slug === "avatar"
                    ? avatarSettings.shape
                    : ditherAvatarSettings.shape
                  )
                    .charAt(0)
                    .toUpperCase() +
                    (activeComponent.slug === "avatar"
                      ? avatarSettings.shape
                      : ditherAvatarSettings.shape
                    ).slice(1)}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuRadioGroup
                    value={
                      activeComponent.slug === "avatar"
                        ? avatarSettings.shape
                        : ditherAvatarSettings.shape
                    }
                    onValueChange={(shape) => {
                      if (activeComponent.slug === "avatar") {
                        setAvatarSettings({
                          shape: shape as NonNullable<
                            ComponentSettings["avatar"]
                          >["shape"],
                        });
                        return;
                      }

                      setDitherAvatarSettings((current) => ({
                        ...current,
                        shape: shape as NonNullable<
                          ComponentSettings["ditherAvatar"]
                        >["shape"],
                      }));
                    }}
                  >
                    <DropdownMenuRadioItem value="circle">
                      Circle
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="rounded">
                      Rounded
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="square">
                      Square
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </label>
            {activeComponent.slug === "dither-avatar" ? (
              <label className="mt-1.5 flex items-center justify-between gap-3 text-muted-foreground">
                Dots
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className="min-w-24 justify-between"
                    render={<Button size="sm" variant="outline" />}
                  >
                    {ditherAvatarSettings.dotScale}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuRadioGroup
                      value={String(ditherAvatarSettings.dotScale)}
                      onValueChange={(dotScale) => {
                        setDitherAvatarSettings((current) => ({
                          ...current,
                          dotScale: Number(dotScale) as NonNullable<
                            ComponentSettings["ditherAvatar"]
                          >["dotScale"],
                        }));
                      }}
                    >
                      <DropdownMenuRadioItem value="1">1</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="2">2</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="3">3</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="4">4</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="5">5</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </label>
            ) : null}
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
              : activeComponent.slug === "avatar"
                ? "A compact identity surface for people, teams, status, and stacked presence."
                : activeComponent.slug === "dither-avatar"
                  ? "A deterministic dithered identity surface generated from any string."
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
            {propGroups.length > 0 ? (
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
          {activeComponent.slug === "accordion" ? (
            <p className="mt-3 text-sm text-muted-foreground">
              Also supports Base UI {title.toLowerCase()} primitive props. See{" "}
              <a
                className="underline underline-offset-3 hover:text-foreground"
                href={`https://base-ui.com/react/components/${activeComponent.slug}`}
                rel="noreferrer"
                target="_blank"
              >
                Base UI {title}
              </a>
              .
            </p>
          ) : null}
        </section>
      </article>
    </ShowcaseLayout>
  );
}
