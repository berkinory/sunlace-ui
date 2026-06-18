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

function ComboboxSettings({
  children,
}: Pick<ComponentSettingsControllerProps, "children">) {
  const [settings, setSettings] = useState<
    NonNullable<ComponentSettings["combobox"]>
  >({
    autoHighlight: true,
    disabled: false,
    showClear: false,
    showTrigger: true,
    side: "bottom",
  });

  const controls = (
    <SettingsShell title="Combobox">
      <label className="flex items-center justify-between gap-3 text-muted-foreground">
        Side
        <DropdownMenu>
          <DropdownMenuTrigger
            className="min-w-24 justify-between"
            render={<Button size="sm" variant="outline" />}
          >
            {settings.side === "bottom" ? "Bottom" : "Top"}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuRadioGroup
              onValueChange={(side) => {
                setSettings((current) => ({
                  ...current,
                  side: side as NonNullable<
                    ComponentSettings["combobox"]
                  >["side"],
                }));
              }}
              value={settings.side}
            >
              <DropdownMenuRadioItem value="bottom">
                Bottom
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </label>
      <label className="flex items-center justify-between gap-3 text-muted-foreground">
        Auto Highlight
        <Switch
          checked={settings.autoHighlight}
          onCheckedChange={(autoHighlight) => {
            setSettings((current) => ({ ...current, autoHighlight }));
          }}
          size="sm"
        />
      </label>
      <label className="flex items-center justify-between gap-3 text-muted-foreground">
        Clear
        <Switch
          checked={settings.showClear}
          onCheckedChange={(showClear) => {
            setSettings((current) => ({ ...current, showClear }));
          }}
          size="sm"
        />
      </label>
      <label className="flex items-center justify-between gap-3 text-muted-foreground">
        Trigger
        <Switch
          checked={settings.showTrigger}
          onCheckedChange={(showTrigger) => {
            setSettings((current) => ({ ...current, showTrigger }));
          }}
          size="sm"
        />
      </label>
      <label className="flex items-center justify-between gap-3 text-muted-foreground">
        Disabled
        <Switch
          checked={settings.disabled}
          onCheckedChange={(disabled) => {
            setSettings((current) => ({ ...current, disabled }));
          }}
          size="sm"
        />
      </label>
    </SettingsShell>
  );

  return children({ controls, settings: { combobox: settings } });
}

function DialogSettings({
  children,
}: Pick<ComponentSettingsControllerProps, "children">) {
  const [settings, setSettings] = useState<
    NonNullable<ComponentSettings["dialog"]>
  >({
    showCloseButton: true,
    showFooter: true,
  });

  const controls = (
    <SettingsShell title="Dialog">
      <label className="flex items-center justify-between gap-3 text-muted-foreground">
        Close Button
        <Switch
          checked={settings.showCloseButton}
          onCheckedChange={(showCloseButton) => {
            setSettings((current) => ({ ...current, showCloseButton }));
          }}
          size="sm"
        />
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
    </SettingsShell>
  );

  return children({ controls, settings: { dialog: settings } });
}

function DropdownMenuSettings({
  children,
}: Pick<ComponentSettingsControllerProps, "children">) {
  const [settings, setSettings] = useState<
    NonNullable<ComponentSettings["dropdownMenu"]>
  >({
    align: "start",
    disabledItem: false,
    showDestructive: true,
    showLabels: true,
    showShortcuts: true,
    side: "bottom",
  });

  const controls = (
    <SettingsShell title="Dropdown Menu">
      <label className="flex items-center justify-between gap-3 text-muted-foreground">
        Side
        <DropdownMenu>
          <DropdownMenuTrigger
            className="min-w-24 justify-between"
            render={<Button size="sm" variant="outline" />}
          >
            {settings.side === "bottom" ? "Bottom" : "Top"}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuRadioGroup
              onValueChange={(side) => {
                setSettings((current) => ({
                  ...current,
                  side: side as NonNullable<
                    ComponentSettings["dropdownMenu"]
                  >["side"],
                }));
              }}
              value={settings.side}
            >
              <DropdownMenuRadioItem value="bottom">
                Bottom
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </label>
      <label className="flex items-center justify-between gap-3 text-muted-foreground">
        Align
        <DropdownMenu>
          <DropdownMenuTrigger
            className="min-w-24 justify-between"
            render={<Button size="sm" variant="outline" />}
          >
            {settings.align === "start" ? "Start" : "End"}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuRadioGroup
              onValueChange={(align) => {
                setSettings((current) => ({
                  ...current,
                  align: align as NonNullable<
                    ComponentSettings["dropdownMenu"]
                  >["align"],
                }));
              }}
              value={settings.align}
            >
              <DropdownMenuRadioItem value="start">Start</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="end">End</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </label>
      <label className="flex items-center justify-between gap-3 text-muted-foreground">
        Labels
        <Switch
          checked={settings.showLabels}
          onCheckedChange={(showLabels) => {
            setSettings((current) => ({ ...current, showLabels }));
          }}
          size="sm"
        />
      </label>
      <label className="flex items-center justify-between gap-3 text-muted-foreground">
        Shortcuts
        <Switch
          checked={settings.showShortcuts}
          onCheckedChange={(showShortcuts) => {
            setSettings((current) => ({ ...current, showShortcuts }));
          }}
          size="sm"
        />
      </label>
      <label className="flex items-center justify-between gap-3 text-muted-foreground">
        Destructive
        <Switch
          checked={settings.showDestructive}
          onCheckedChange={(showDestructive) => {
            setSettings((current) => ({ ...current, showDestructive }));
          }}
          size="sm"
        />
      </label>
      <label className="flex items-center justify-between gap-3 text-muted-foreground">
        Disabled Item
        <Switch
          checked={settings.disabledItem}
          onCheckedChange={(disabledItem) => {
            setSettings((current) => ({ ...current, disabledItem }));
          }}
          size="sm"
        />
      </label>
    </SettingsShell>
  );

  return children({ controls, settings: { dropdownMenu: settings } });
}

function SelectSettings({
  children,
}: Pick<ComponentSettingsControllerProps, "children">) {
  const [settings, setSettings] = useState<
    NonNullable<ComponentSettings["select"]>
  >({
    align: "center",
    alignItemWithTrigger: false,
    disabled: false,
    grouped: true,
    side: "bottom",
  });

  const controls = (
    <SettingsShell title="Select">
      <label className="flex items-center justify-between gap-3 text-muted-foreground">
        Side
        <DropdownMenu>
          <DropdownMenuTrigger
            className="min-w-24 justify-between"
            render={<Button size="sm" variant="outline" />}
          >
            {settings.side === "bottom" ? "Bottom" : "Top"}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuRadioGroup
              onValueChange={(side) => {
                setSettings((current) => ({
                  ...current,
                  side: side as NonNullable<
                    ComponentSettings["select"]
                  >["side"],
                }));
              }}
              value={settings.side}
            >
              <DropdownMenuRadioItem value="bottom">
                Bottom
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </label>
      <label className="flex items-center justify-between gap-3 text-muted-foreground">
        Align
        <DropdownMenu>
          <DropdownMenuTrigger
            className="min-w-24 justify-between"
            render={<Button size="sm" variant="outline" />}
          >
            {settings.align === "center" ? "Center" : "Start"}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuRadioGroup
              onValueChange={(align) => {
                setSettings((current) => ({
                  ...current,
                  align: align as NonNullable<
                    ComponentSettings["select"]
                  >["align"],
                }));
              }}
              value={settings.align}
            >
              <DropdownMenuRadioItem value="center">
                Center
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="start">Start</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </label>
      <label className="flex items-center justify-between gap-3 text-muted-foreground">
        Align Selected
        <Switch
          checked={settings.alignItemWithTrigger}
          onCheckedChange={(alignItemWithTrigger) => {
            setSettings((current) => ({
              ...current,
              alignItemWithTrigger,
            }));
          }}
          size="sm"
        />
      </label>
      <label className="flex items-center justify-between gap-3 text-muted-foreground">
        Groups
        <Switch
          checked={settings.grouped}
          onCheckedChange={(grouped) => {
            setSettings((current) => ({ ...current, grouped }));
          }}
          size="sm"
        />
      </label>
      <label className="flex items-center justify-between gap-3 text-muted-foreground">
        Disabled
        <Switch
          checked={settings.disabled}
          onCheckedChange={(disabled) => {
            setSettings((current) => ({ ...current, disabled }));
          }}
          size="sm"
        />
      </label>
    </SettingsShell>
  );

  return children({ controls, settings: { select: settings } });
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
    case "combobox":
      return <ComboboxSettings>{children}</ComboboxSettings>;
    case "dither-avatar":
      return <DitherAvatarSettings>{children}</DitherAvatarSettings>;
    case "dialog":
      return <DialogSettings>{children}</DialogSettings>;
    case "dropdown-menu":
      return <DropdownMenuSettings>{children}</DropdownMenuSettings>;
    case "select":
      return <SelectSettings>{children}</SelectSettings>;
    default:
      return children({ controls: null, settings: {} });
  }
}

export { ComponentSettingsController };
