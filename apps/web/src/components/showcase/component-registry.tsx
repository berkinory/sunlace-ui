import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
  Badge,
  Button,
  Calendar,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DitherAvatar,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
  Kbd,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
  Progress,
  RadioGroup,
  RadioGroupItem,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Skeleton,
  Slider,
  Spinner,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Toggle,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Toaster,
} from "@sunlace/ui";
import type { ReactNode } from "react";
import { toast } from "sonner";

export const componentItems = [
  { slug: "accordion", label: "Accordion" },
  { slug: "avatar", label: "Avatar" },
  { slug: "badge", label: "Badge" },
  { slug: "button", label: "Button" },
  { slug: "calendar", label: "Calendar" },
  { slug: "card", label: "Card" },
  { slug: "checkbox", label: "Checkbox" },
  { slug: "combobox", label: "Combobox" },
  { slug: "context-menu", label: "Context Menu" },
  { slug: "dialog", label: "Dialog" },
  { slug: "dither-avatar", label: "Dither Avatar" },
  { slug: "drawer", label: "Drawer" },
  { slug: "dropdown-menu", label: "Dropdown Menu" },
  { slug: "input", label: "Input" },
  { slug: "kbd", label: "Kbd" },
  { slug: "popover", label: "Popover" },
  { slug: "progress", label: "Progress" },
  { slug: "radio-group", label: "Radio Group" },
  { slug: "scroll-area", label: "Scroll Area" },
  { slug: "select", label: "Select" },
  { slug: "separator", label: "Separator" },
  { slug: "skeleton", label: "Skeleton" },
  { slug: "slider", label: "Slider" },
  { slug: "sonner", label: "Sonner" },
  { slug: "spinner", label: "Spinner" },
  { slug: "switch", label: "Switch" },
  { slug: "tabs", label: "Tabs" },
  { slug: "textarea", label: "Textarea" },
  { slug: "toggle", label: "Toggle" },
  { slug: "tooltip", label: "Tooltip" },
] as const;

export type ComponentSlug = (typeof componentItems)[number]["slug"];

export type ComponentSettings = {
  accordion?: {
    borders: boolean;
    multiple: boolean;
    showArrow: boolean;
    underline: boolean;
  };
  avatar?: {
    shape: "circle" | "rounded" | "square";
  };
  ditherAvatar?: {
    dotScale: 1 | 2 | 3 | 4 | 5;
    shape: "circle" | "rounded" | "square";
  };
  card?: {
    showAction: boolean;
    showFooter: boolean;
    size: "default" | "sm";
    variant: "default" | "shine" | "animated-border";
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

export function ComponentPreview({
  component,
  settings,
}: {
  component: ComponentSlug;
  settings?: ComponentSettings;
}) {
  const preview = previews[component]?.(settings) ?? (
    <PreviewShell>{component.replaceAll("-", " ")}</PreviewShell>
  );

  return preview;
}

export function getComponentExampleCode(
  component: ComponentSlug,
  settings?: ComponentSettings
) {
  return (
    exampleCode[component]?.(settings) ??
    `import { ${toPascalCase(component.replaceAll("-", " "))} } from "@/components/ui/${component}";

export function ${toPascalCase(component.replaceAll("-", " "))}Demo() {
  return <${toPascalCase(component.replaceAll("-", " "))} />;
}`
  );
}

function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div className="text-center">
      <p className="text-sm font-medium capitalize">{children}</p>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Temporary preview.
      </p>
    </div>
  );
}

const previews: Partial<
  Record<ComponentSlug, (settings?: ComponentSettings) => ReactNode>
> = {
  accordion: (settings) => (
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
  ),
  avatar: (settings) => (
    <div className="flex flex-col items-center gap-7">
      <div className="flex items-end gap-4">
        <Avatar className="size-14" shape={settings?.avatar?.shape}>
          <AvatarImage
            alt="Ava"
            src="https://avatars.githubusercontent.com/u/61243523?v=4"
          />
          <AvatarFallback>AV</AvatarFallback>
        </Avatar>
        <Avatar className="size-14" shape={settings?.avatar?.shape}>
          <AvatarFallback>UI</AvatarFallback>
        </Avatar>
      </div>
      <AvatarGroup>
        <Avatar className="size-10" shape={settings?.avatar?.shape}>
          <AvatarFallback>BK</AvatarFallback>
        </Avatar>
        <Avatar className="size-10" shape={settings?.avatar?.shape}>
          <AvatarFallback>AR</AvatarFallback>
        </Avatar>
        <Avatar className="size-10" shape={settings?.avatar?.shape}>
          <AvatarFallback>DS</AvatarFallback>
        </Avatar>
        <AvatarGroupCount className="size-10">+4</AvatarGroupCount>
      </AvatarGroup>
    </div>
  ),
  badge: () => (
    <div className="flex flex-col items-center gap-7">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="ghost">Ghost</Badge>
        <Badge variant="link">Link</Badge>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="destructive">Destructive</Badge>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Badge variant="shine">Shine</Badge>
        <Badge variant="animated-border">Animated Border</Badge>
        <Badge variant="rotate-border">Rotate Border</Badge>
      </div>
    </div>
  ),
  button: () => (
    <div className="flex flex-col items-center gap-7">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button variant="success">Success</Button>
        <Button variant="warning">Warning</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button variant="shine">Shine</Button>
        <Button variant="animated-border">Animated Border</Button>
        <Button variant="rotate-border">Rotate Border</Button>
      </div>
    </div>
  ),
  calendar: () => <Calendar />,
  card: (settings) => {
    const size = settings?.card?.size ?? "default";
    const variant = settings?.card?.variant ?? "default";
    const showFooter = settings?.card?.showFooter ?? true;
    const showAction = settings?.card?.showAction ?? false;

    return (
      <Card className="w-full max-w-sm" size={size} variant={variant}>
        <CardHeader>
          <CardTitle>Workspace</CardTitle>
          <CardDescription>
            Grouped content with bordered surfaces and soft depth.
          </CardDescription>
          {showAction ? (
            <CardAction>
              <Button size="sm" variant="outline">
                Edit
              </Button>
            </CardAction>
          ) : null}
        </CardHeader>
        <CardContent className="text-muted-foreground">
          Cards use a light border, soft drop shadow, and inset highlight.
        </CardContent>
        {showFooter ? (
          <CardFooter className="justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button>Continue</Button>
          </CardFooter>
        ) : null}
      </Card>
    );
  },
  checkbox: () => (
    <label className="flex items-center gap-3 text-sm">
      <Checkbox defaultChecked /> Accept Terms
    </label>
  ),
  combobox: () => (
    <Combobox>
      <ComboboxInput placeholder="Search component" />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxItem value="accordion">Accordion</ComboboxItem>
          <ComboboxItem value="button">Button</ComboboxItem>
          <ComboboxItem value="dialog">Dialog</ComboboxItem>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
  "context-menu": () => (
    <ContextMenu>
      <ContextMenuTrigger className="rounded-lg border border-border px-8 py-6 text-sm text-muted-foreground">
        Right click area
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Copy</ContextMenuItem>
        <ContextMenuItem>Rename</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
  dialog: () => (
    <Dialog>
      <DialogTrigger render={<Button />}>Open dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog</DialogTitle>
          <DialogDescription>Temporary component preview.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ),
  "dither-avatar": (settings) => (
    <div className="flex flex-col items-center gap-7">
      <div className="flex items-end gap-4">
        <DitherAvatar
          className="size-14"
          dotScale={settings?.ditherAvatar?.dotScale}
          hash="sunlace"
          shape={settings?.ditherAvatar?.shape}
        />
        <DitherAvatar
          className="size-14"
          dotScale={settings?.ditherAvatar?.dotScale}
          hash="ui"
          shape={settings?.ditherAvatar?.shape}
        />
      </div>
      <div className="flex gap-3">
        <DitherAvatar
          className="size-10"
          dotScale={settings?.ditherAvatar?.dotScale}
          hash="medhy.eth"
          shape={settings?.ditherAvatar?.shape}
        />
        <DitherAvatar
          className="size-10"
          dotScale={settings?.ditherAvatar?.dotScale}
          hash="0x742…44e"
          shape={settings?.ditherAvatar?.shape}
        />
        <DitherAvatar
          className="size-10"
          dotScale={settings?.ditherAvatar?.dotScale}
          hash="satoshi"
          shape={settings?.ditherAvatar?.shape}
        />
        <DitherAvatar
          className="size-10"
          dotScale={settings?.ditherAvatar?.dotScale}
          hash="saira"
          shape={settings?.ditherAvatar?.shape}
        />
      </div>
    </div>
  ),
  drawer: () => (
    <Drawer>
      <DrawerTrigger className="inline-flex h-8 items-center justify-center rounded-lg border border-transparent bg-primary px-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80">
        Open drawer
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer</DrawerTitle>
          <DrawerDescription>Temporary component preview.</DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  ),
  "dropdown-menu": () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button />}>Open menu</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  input: () => <Input className="max-w-sm" placeholder="email@example.com" />,
  kbd: () => (
    <div className="flex gap-1">
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </div>
  ),
  popover: () => (
    <Popover>
      <PopoverTrigger render={<Button />}>Open popover</PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Popover</PopoverTitle>
          <PopoverDescription>Temporary component preview.</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  ),
  progress: () => <Progress className="w-full max-w-sm" value={64} />,
  "radio-group": () => (
    <RadioGroup className="max-w-sm" defaultValue="comfortable">
      <label className="flex items-center gap-3 text-sm">
        <RadioGroupItem value="default" /> Default
      </label>
      <label className="flex items-center gap-3 text-sm">
        <RadioGroupItem value="comfortable" /> Comfortable
      </label>
    </RadioGroup>
  ),
  "scroll-area": () => (
    <ScrollArea className="h-40 w-full max-w-sm rounded-lg border border-border p-4">
      <div className="space-y-3 text-sm">
        {Array.from({ length: 8 }, (_, index) => (
          <p key={index}>Scroll Row {index + 1}</p>
        ))}
      </div>
    </ScrollArea>
  ),
  select: () => (
    <Select defaultValue="design">
      <SelectTrigger>
        <SelectValue placeholder="Select a role" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="design">Design</SelectItem>
        <SelectItem value="engineering">Engineering</SelectItem>
      </SelectContent>
    </Select>
  ),
  separator: () => (
    <div className="w-full max-w-sm space-y-4">
      <div>
        <p className="text-sm font-medium">sunlace</p>
        <p className="text-sm text-muted-foreground">Component system</p>
      </div>
      <Separator />
      <p className="text-sm text-muted-foreground">Separated content</p>
    </div>
  ),
  skeleton: () => (
    <div className="w-full max-w-sm space-y-3">
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  ),
  slider: () => <Slider className="w-full max-w-sm" defaultValue={[44]} />,
  sonner: () => (
    <div className="flex flex-col items-center gap-4">
      <Button onClick={() => toast("sunlace toast")}>Toast Preview</Button>
      <Toaster />
    </div>
  ),
  spinner: () => <Spinner className="size-6" />,
  switch: () => (
    <label className="flex items-center gap-3 text-sm">
      <Switch defaultChecked /> Enable
    </label>
  ),
  tabs: () => (
    <Tabs className="w-full max-w-sm" defaultValue="preview">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">Component preview</TabsContent>
      <TabsContent value="code">Import from @sunlace/ui</TabsContent>
    </Tabs>
  ),
  textarea: () => <Textarea className="max-w-sm" placeholder="Write a note" />,
  toggle: () => <Toggle defaultPressed>Toggle</Toggle>,
  tooltip: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button />}>Hover Me</TooltipTrigger>
        <TooltipContent>Tooltip Preview</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

const exampleCode: Partial<
  Record<ComponentSlug, (settings?: ComponentSettings) => string>
> = {
  accordion: (settings) => `import {
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
}`,
  avatar: (settings) => `import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";

export function AvatarDemo() {
  return (
    <AvatarGroup>
      <Avatar${settings?.avatar?.shape && settings.avatar.shape !== "circle" ? ` shape="${settings.avatar.shape}"` : ""}>
        <AvatarImage alt="Ava" src="https://avatars.githubusercontent.com/u/61243523?v=4" />
        <AvatarFallback>AV</AvatarFallback>
        <AvatarBadge />
      </Avatar>
      <Avatar${settings?.avatar?.shape && settings.avatar.shape !== "circle" ? ` shape="${settings.avatar.shape}"` : ""}>
        <AvatarFallback>SL</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>+4</AvatarGroupCount>
    </AvatarGroup>
  );
}`,
  "dither-avatar": (
    settings
  ) => `import { DitherAvatar } from "@/components/ui/dither-avatar";

export function DitherAvatarDemo() {
  return (
    <div className="flex items-center gap-3">
      <DitherAvatar${settings?.ditherAvatar?.shape && settings.ditherAvatar.shape !== "circle" ? ` shape="${settings.ditherAvatar.shape}"` : ""}${settings?.ditherAvatar?.dotScale && settings.ditherAvatar.dotScale !== 1 ? ` dotScale={${settings.ditherAvatar.dotScale}}` : ""} hash="sunlace" />
      <DitherAvatar${settings?.ditherAvatar?.shape && settings.ditherAvatar.shape !== "circle" ? ` shape="${settings.ditherAvatar.shape}"` : ""}${settings?.ditherAvatar?.dotScale && settings.ditherAvatar.dotScale !== 1 ? ` dotScale={${settings.ditherAvatar.dotScale}}` : ""} hash="ui" />
    </div>
  );
}`,
  badge: () => `import { Badge } from "@/components/ui/badge";

export function BadgeDemo() {
  return (
    <div className="flex flex-col items-center gap-7">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="ghost">Ghost</Badge>
        <Badge variant="link">Link</Badge>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="destructive">Destructive</Badge>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Badge variant="shine">Shine</Badge>
        <Badge variant="animated-border">Animated Border</Badge>
        <Badge variant="rotate-border">Rotate Border</Badge>
      </div>
    </div>
  );
}`,
  button: () => `import { Button } from "@/components/ui/button";

export function ButtonDemo() {
  return (
    <div className="flex flex-col items-center gap-7">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button variant="success">Success</Button>
        <Button variant="warning">Warning</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button variant="shine">Shine</Button>
        <Button variant="animated-border">Animated Border</Button>
        <Button variant="rotate-border">Rotate Border</Button>
      </div>
    </div>
  );
}`,
  checkbox: () => `import { Checkbox } from "@/components/ui/checkbox";

export function CheckboxDemo() {
  return (
    <label className="flex items-center gap-3 text-sm">
      <Checkbox defaultChecked />
      Accept Terms
    </label>
  );
}`,
  card: (settings) => {
    const size = settings?.card?.size ?? "default";
    const sizeAttr = size !== "default" ? ` size="${size}"` : "";
    const variant = settings?.card?.variant ?? "default";
    const variantAttr = variant !== "default" ? ` variant="${variant}"` : "";
    const showFooter = settings?.card?.showFooter ?? true;
    const showAction = settings?.card?.showAction ?? false;

    return `import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function CardDemo() {
  return (
    <Card className="w-full max-w-sm"${sizeAttr}${variantAttr}>
      <CardHeader>
        <CardTitle>Workspace</CardTitle>
        <CardDescription>
          Grouped content with bordered surfaces and soft depth.
        </CardDescription>${
          showAction
            ? `
        <CardAction>
          <Button size="sm" variant="outline">Edit</Button>
        </CardAction>`
            : ""
        }
      </CardHeader>
      <CardContent className="text-muted-foreground">
        Cards use a light border, soft drop shadow, and inset highlight.
      </CardContent>${
        showFooter
          ? `
      <CardFooter className="justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Continue</Button>
      </CardFooter>`
          : ""
      }
    </Card>
  );
}`;
  },
};
