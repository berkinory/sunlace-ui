import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@sunlace/ui";

import type { ComponentDocDefinition } from "./types";

const showcaseCode = `import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger>Open drawer</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer</DrawerTitle>
          <DrawerDescription>Drawer content and supporting detail.</DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}`;

function Preview() {
  return (
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
  );
}

export const drawerDocs: ComponentDocDefinition = {
  description: "A bottom sheet for focused actions and mobile-friendly detail.",
  getShowcaseCode: () => showcaseCode,
  importCode: `import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";`,
  renderPreview: () => <Preview />,
  usageCode: `<Drawer>
  <DrawerTrigger>Open drawer</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Drawer</DrawerTitle>
    </DrawerHeader>
  </DrawerContent>
</Drawer>`,
};
