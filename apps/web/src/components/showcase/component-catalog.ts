export const componentItems = [
  { slug: "accordion", label: "Accordion" },
  { slug: "badge", label: "Badge" },
  { slug: "button", label: "Button" },
  { slug: "calendar", label: "Calendar" },
  { slug: "card", label: "Card" },
  { slug: "checkbox", label: "Checkbox" },
  { slug: "combobox", label: "Combobox" },
  { slug: "dialog", label: "Dialog" },
  { slug: "dither-avatar", label: "Dither Avatar" },
  { slug: "drawer", label: "Drawer" },
  { slug: "dropdown-menu", label: "Dropdown Menu" },
  { slug: "input", label: "Input" },
  { slug: "popover", label: "Popover" },
  { slug: "progress", label: "Progress" },
  { slug: "radio", label: "Radio" },
  { slug: "select", label: "Select" },
  { slug: "shimmer-text", label: "Shimmer Text" },
  { slug: "skeleton", label: "Skeleton" },
  { slug: "slider", label: "Slider" },
  { slug: "sonner", label: "Sonner" },
  { slug: "spinner", label: "Spinner" },
  { slug: "switch", label: "Switch" },
  { slug: "tabs", label: "Tabs" },
  { slug: "toggle", label: "Toggle" },
  { slug: "tooltip", label: "Tooltip" },
] as const;

export const componentNavGroups = [
  {
    label: "Components",
    items: componentItems,
  },
] as const;

export type ComponentSlug = (typeof componentItems)[number]["slug"];

export type ComponentSettings = {
  accordion?: {
    borders: boolean;
    multiple: boolean;
    showArrow: boolean;
    underline: boolean;
  };
  card?: {
    showAction: boolean;
    showFooter: boolean;
    variant: "default" | "shine" | "animated-border";
  };
  calendar?: {
    easyNavigation: boolean;
    mode: "range" | "single";
    showOutsideDays: boolean;
  };
  combobox?: {
    autoHighlight: boolean;
    disabled: boolean;
    showClear: boolean;
    showTrigger: boolean;
    side: "bottom" | "top";
  };
  dialog?: {
    showCloseButton: boolean;
    showFooter: boolean;
  };
  drawer?: {
    direction: "bottom" | "left" | "right" | "top";
    showFooter: boolean;
  };
  ditherAvatar?: {
    dotScale: 1 | 2 | 3 | 4 | 5;
    shape: "circle" | "rounded" | "square";
  };
  dropdownMenu?: {
    align: "end" | "start";
    disabledItem: boolean;
    showDestructive: boolean;
    showLabels: boolean;
    showShortcuts: boolean;
    side: "bottom" | "top";
  };
  input?: {
    clearable: boolean;
    disabled: boolean;
    invalid: boolean;
    revealable: boolean;
    startIcon: boolean;
  };
  popover?: {
    align: "center" | "end" | "start";
    side: "bottom" | "left" | "right" | "top";
  };
  progress?: {
    indeterminate: boolean;
    showLabel: boolean;
  };
  select?: {
    align: "center" | "start";
    alignItemWithTrigger: boolean;
    disabled: boolean;
    grouped: boolean;
    side: "bottom" | "top";
  };
  skeleton?: {
    animation: "none" | "pulse" | "shimmer";
  };
  sonner?: {
    closeButton: boolean;
    expand: boolean;
    position:
      | "bottom-center"
      | "bottom-left"
      | "bottom-right"
      | "top-center"
      | "top-left"
      | "top-right";
  };
  slider?: {
    disabled: boolean;
    orientation: "horizontal" | "vertical";
    range: boolean;
  };
  spinner?: {
    speed: "fast" | "normal" | "slow";
    variant: "icon" | "ring";
  };
  tooltip?: {
    showArrow: boolean;
    side: "bottom" | "left" | "right" | "top";
  };
};

export const defaultComponentSlug = componentItems[0].slug;

export const componentBySlug = new Map<
  ComponentSlug,
  (typeof componentItems)[number]
>(componentItems.map((item) => [item.slug, item]));

export function isComponentSlug(value: string): value is ComponentSlug {
  return componentBySlug.has(value as ComponentSlug);
}

export function toPascalCase(value: string) {
  return value
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}
