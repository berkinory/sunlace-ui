import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Calendar,
  Card,
  CardContent,
  CardDescription,
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

export function ComponentPreview({ component }: { component: ComponentSlug }) {
  const preview = previews[component] ?? (
    <PreviewShell>{component.replaceAll("-", " ")}</PreviewShell>
  );

  return preview;
}

function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div className="text-center">
      <p className="text-sm font-medium capitalize">{children}</p>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Temporary Preview.
      </p>
    </div>
  );
}

const previews: Partial<Record<ComponentSlug, ReactNode>> = {
  accordion: (
    <Accordion className="w-full max-w-xl" defaultValue={["item-1"]}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is It Accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It Uses Base UI Primitives And Keeps Keyboard Behavior Intact.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is It Customizable?</AccordionTrigger>
        <AccordionContent>
          Yes. Source Files Live In The Repo And Are Meant To Be Edited.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Can It Be Animated?</AccordionTrigger>
        <AccordionContent>
          Yes. Motion Stays CSS Based Through Tailwind Utilities.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  avatar: (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarFallback>SL</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>UI</AvatarFallback>
      </Avatar>
    </div>
  ),
  badge: (
    <div className="flex gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
  button: (
    <div className="flex flex-wrap justify-center gap-2">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
  calendar: <Calendar />,
  card: (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Component Card</CardTitle>
        <CardDescription>Temporary Showcase Preview.</CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full">Continue</Button>
      </CardContent>
    </Card>
  ),
  checkbox: (
    <label className="flex items-center gap-3 text-sm">
      <Checkbox defaultChecked /> Accept Terms
    </label>
  ),
  combobox: (
    <Combobox>
      <ComboboxInput placeholder="Search Component" />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxItem value="accordion">Accordion</ComboboxItem>
          <ComboboxItem value="button">Button</ComboboxItem>
          <ComboboxItem value="dialog">Dialog</ComboboxItem>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
  "context-menu": (
    <ContextMenu>
      <ContextMenuTrigger className="rounded-lg border border-border px-8 py-6 text-sm text-muted-foreground">
        Right Click Area
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Copy</ContextMenuItem>
        <ContextMenuItem>Rename</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
  dialog: (
    <Dialog>
      <DialogTrigger render={<Button />}>Open Dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog</DialogTitle>
          <DialogDescription>Temporary Component Preview.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ),
  drawer: (
    <Drawer>
      <DrawerTrigger className="inline-flex h-8 items-center justify-center rounded-lg border border-transparent bg-primary px-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80">
        Open Drawer
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer</DrawerTitle>
          <DrawerDescription>Temporary Component Preview.</DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  ),
  "dropdown-menu": (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button />}>Open Menu</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  input: <Input className="max-w-sm" placeholder="email@example.com" />,
  kbd: (
    <div className="flex gap-1">
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </div>
  ),
  popover: (
    <Popover>
      <PopoverTrigger render={<Button />}>Open Popover</PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Popover</PopoverTitle>
          <PopoverDescription>Temporary Component Preview.</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  ),
  progress: <Progress className="w-full max-w-sm" value={64} />,
  "radio-group": (
    <RadioGroup className="max-w-sm" defaultValue="comfortable">
      <label className="flex items-center gap-3 text-sm">
        <RadioGroupItem value="default" /> Default
      </label>
      <label className="flex items-center gap-3 text-sm">
        <RadioGroupItem value="comfortable" /> Comfortable
      </label>
    </RadioGroup>
  ),
  "scroll-area": (
    <ScrollArea className="h-40 w-full max-w-sm rounded-lg border border-border p-4">
      <div className="space-y-3 text-sm">
        {Array.from({ length: 8 }, (_, index) => (
          <p key={index}>Scroll Row {index + 1}</p>
        ))}
      </div>
    </ScrollArea>
  ),
  select: (
    <Select defaultValue="design">
      <SelectTrigger>
        <SelectValue placeholder="Select A Role" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="design">Design</SelectItem>
        <SelectItem value="engineering">Engineering</SelectItem>
      </SelectContent>
    </Select>
  ),
  separator: (
    <div className="w-full max-w-sm space-y-4">
      <div>
        <p className="text-sm font-medium">sunlace</p>
        <p className="text-sm text-muted-foreground">Component System</p>
      </div>
      <Separator />
      <p className="text-sm text-muted-foreground">Separated Content</p>
    </div>
  ),
  skeleton: (
    <div className="w-full max-w-sm space-y-3">
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  ),
  slider: <Slider className="max-w-sm" defaultValue={[44]} />,
  sonner: (
    <div className="flex flex-col items-center gap-4">
      <Button onClick={() => toast("sunlace toast")}>Toast Preview</Button>
      <Toaster />
    </div>
  ),
  spinner: <Spinner className="size-6" />,
  switch: (
    <label className="flex items-center gap-3 text-sm">
      <Switch defaultChecked /> Enable
    </label>
  ),
  tabs: (
    <Tabs className="w-full max-w-sm" defaultValue="preview">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">Component Preview</TabsContent>
      <TabsContent value="code">Import From @sunlace/ui</TabsContent>
    </Tabs>
  ),
  textarea: <Textarea className="max-w-sm" placeholder="Write A Note" />,
  toggle: <Toggle defaultPressed>Toggle</Toggle>,
  tooltip: (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button />}>Hover Me</TooltipTrigger>
        <TooltipContent>Tooltip Preview</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};
