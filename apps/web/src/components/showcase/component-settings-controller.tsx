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
import { useState, type ReactNode } from "react";

import type { ComponentSettings, ComponentSlug } from "./component-registry";

type SettingsRenderProps = {
  controls: ReactNode;
  settings: ComponentSettings;
};

type ComponentSettingsControllerProps = {
  children: (props: SettingsRenderProps) => ReactNode;
  component: ComponentSlug;
};

const cardVariantLabels = {
  default: "Default",
  shine: "Shine",
  "animated-border": "Animated",
} as const;

function SettingsShell({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
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
        <div className="space-y-1.5 rounded-md bg-muted/40 p-2.5">
          {children}
        </div>
      </div>
    </div>
  );
}

function AccordionSettings({
  children,
}: Pick<ComponentSettingsControllerProps, "children">) {
  const [settings, setSettings] = useState<
    NonNullable<ComponentSettings["accordion"]>
  >({
    borders: false,
    multiple: false,
    showArrow: true,
    underline: true,
  });

  const controls = (
    <SettingsShell title="Accordion">
      <label className="flex items-center justify-between gap-3 text-muted-foreground">
        Multiple
        <Switch
          checked={settings.multiple}
          onCheckedChange={(multiple) => {
            setSettings((current) => ({ ...current, multiple }));
          }}
          size="sm"
        />
      </label>
      <label className="flex items-center justify-between gap-3 text-muted-foreground">
        Borders
        <Switch
          checked={settings.borders}
          onCheckedChange={(borders) => {
            setSettings((current) => ({ ...current, borders }));
          }}
          size="sm"
        />
      </label>
      <label className="flex items-center justify-between gap-3 text-muted-foreground">
        Show Arrow
        <Switch
          checked={settings.showArrow}
          onCheckedChange={(showArrow) => {
            setSettings((current) => ({ ...current, showArrow }));
          }}
          size="sm"
        />
      </label>
      <label className="flex items-center justify-between gap-3 text-muted-foreground">
        Underline
        <Switch
          checked={settings.underline}
          onCheckedChange={(underline) => {
            setSettings((current) => ({ ...current, underline }));
          }}
          size="sm"
        />
      </label>
    </SettingsShell>
  );

  return children({ controls, settings: { accordion: settings } });
}

function DitherAvatarSettings({
  children,
}: Pick<ComponentSettingsControllerProps, "children">) {
  const [settings, setSettings] = useState<
    NonNullable<ComponentSettings["ditherAvatar"]>
  >({
    dotScale: 1,
    shape: "circle",
  });

  const controls = (
    <SettingsShell title="Dither Avatar">
      <ShapeControl
        onChange={(shape) => {
          setSettings((current) => ({ ...current, shape }));
        }}
        value={settings.shape}
      />
      <label className="flex items-center justify-between gap-3 text-muted-foreground">
        Dots
        <DropdownMenu>
          <DropdownMenuTrigger
            className="min-w-24 justify-between"
            render={<Button size="sm" variant="outline" />}
          >
            {settings.dotScale}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuRadioGroup
              onValueChange={(value) => {
                setSettings((current) => ({
                  ...current,
                  dotScale: Number(value) as NonNullable<
                    ComponentSettings["ditherAvatar"]
                  >["dotScale"],
                }));
              }}
              value={String(settings.dotScale)}
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <DropdownMenuRadioItem key={value} value={String(value)}>
                  {value}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </label>
    </SettingsShell>
  );

  return children({ controls, settings: { ditherAvatar: settings } });
}

function CardSettings({
  children,
}: Pick<ComponentSettingsControllerProps, "children">) {
  const [settings, setSettings] = useState<
    NonNullable<ComponentSettings["card"]>
  >({
    showAction: false,
    showFooter: true,
    size: "default",
    variant: "default",
  });

  const controls = (
    <SettingsShell title="Card">
      <label className="flex items-center justify-between gap-3 text-muted-foreground">
        Variant
        <DropdownMenu>
          <DropdownMenuTrigger
            className="w-24 min-w-0 justify-between"
            render={<Button size="sm" variant="outline" />}
          >
            {cardVariantLabels[settings.variant]}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuRadioGroup
              onValueChange={(variant) => {
                setSettings((current) => ({
                  ...current,
                  variant: variant as NonNullable<
                    ComponentSettings["card"]
                  >["variant"],
                }));
              }}
              value={settings.variant}
            >
              <DropdownMenuRadioItem value="default">
                Default
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="shine">Shine</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="animated-border">
                Animated
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </label>
      <label className="flex items-center justify-between gap-3 text-muted-foreground">
        Size
        <DropdownMenu>
          <DropdownMenuTrigger
            className="min-w-24 justify-between"
            render={<Button size="sm" variant="outline" />}
          >
            {settings.size === "sm" ? "Sm" : "Default"}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuRadioGroup
              onValueChange={(size) => {
                setSettings((current) => ({
                  ...current,
                  size: size as NonNullable<ComponentSettings["card"]>["size"],
                }));
              }}
              value={settings.size}
            >
              <DropdownMenuRadioItem value="default">
                Default
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="sm">Sm</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </label>
      <label className="flex items-center justify-between gap-3 text-muted-foreground">
        Footer
        <Switch
          checked={settings.showFooter}
          onCheckedChange={(showFooter) => {
            setSettings((current) => ({ ...current, showFooter }));
          }}
          size="sm"
        />
      </label>
      <label className="flex items-center justify-between gap-3 text-muted-foreground">
        Action
        <Switch
          checked={settings.showAction}
          onCheckedChange={(showAction) => {
            setSettings((current) => ({ ...current, showAction }));
          }}
          size="sm"
        />
      </label>
    </SettingsShell>
  );

  return children({ controls, settings: { card: settings } });
}

function ShapeControl({
  onChange,
  value,
}: {
  onChange: (value: "circle" | "rounded" | "square") => void;
  value: "circle" | "rounded" | "square";
}) {
  return (
    <label className="flex items-center justify-between gap-3 text-muted-foreground">
      Shape
      <DropdownMenu>
        <DropdownMenuTrigger
          className="min-w-24 justify-between"
          render={<Button size="sm" variant="outline" />}
        >
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuRadioGroup
            onValueChange={(shape) => {
              onChange(shape as "circle" | "rounded" | "square");
            }}
            value={value}
          >
            <DropdownMenuRadioItem value="circle">Circle</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="rounded">
              Rounded
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="square">Square</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </label>
  );
}

function ComponentSettingsController({
  children,
  component,
}: ComponentSettingsControllerProps) {
  switch (component) {
    case "accordion":
      return <AccordionSettings>{children}</AccordionSettings>;
    case "card":
      return <CardSettings>{children}</CardSettings>;
    case "dither-avatar":
      return <DitherAvatarSettings>{children}</DitherAvatarSettings>;
    default:
      return children({ controls: null, settings: {} });
  }
}

export { ComponentSettingsController };
