import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Switch,
} from "@sunlace/ui";

import type { ComponentSettings } from "../component-catalog";
import type { ComponentDocDefinition } from "./types";

function getShowcaseCode(settings?: ComponentSettings) {
  const drawer = settings?.drawer;

  return `import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export function DrawerDemo() {
  return (
    <Drawer${drawer?.direction && drawer.direction !== "bottom" ? ` direction="${drawer.direction}"` : ""}>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Preferences</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Workspace Preferences</DrawerTitle>
          <DrawerDescription>
            Choose how your workspace behaves across devices.
          </DrawerDescription>
        </DrawerHeader>
        <div className="grid gap-3 px-5 pb-5">
          <div className="flex items-center justify-between gap-4">
            <span>Activity Notifications</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between gap-4">
            <span>Weekly Summary</span>
            <Switch />
          </div>
        </div>${
          drawer?.showFooter === false
            ? ""
            : `
        <DrawerFooter>
          <DrawerClose asChild>
            <Button>Save Preferences</Button>
          </DrawerClose>
        </DrawerFooter>`
        }
      </DrawerContent>
    </Drawer>
  );
}`;
}

const activityCode = `import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const activity = [
  { event: "Deployment completed", time: "2 minutes ago" },
  { event: "Domain connected", time: "18 minutes ago" },
  { event: "Member invited", time: "1 hour ago" },
];

export function ActivityDrawer() {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline">View Activity</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Project Activity</DrawerTitle>
          <DrawerDescription>
            Recent changes across the Acme workspace.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 space-y-1 overflow-y-auto px-3 pb-5">
          {activity.map((item) => (
            <div className="rounded-lg px-2 py-3 hover:bg-muted/50" key={item.event}>
              <p className="font-medium">{item.event}</p>
              <p className="text-xs text-muted-foreground">{item.time}</p>
            </div>
          ))}
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close Activity</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}`;

function Preview({ settings }: { settings?: ComponentSettings }) {
  const drawer = settings?.drawer;

  return (
    <Drawer direction={drawer?.direction}>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Preferences</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Workspace Preferences</DrawerTitle>
          <DrawerDescription>
            Choose how your workspace behaves across devices.
          </DrawerDescription>
        </DrawerHeader>
        <div className="grid gap-3 overflow-y-auto px-5 pb-5">
          <label className="flex items-center justify-between gap-4">
            <span>Activity Notifications</span>
            <Switch defaultChecked />
          </label>
          <label className="flex items-center justify-between gap-4">
            <span>Weekly Summary</span>
            <Switch />
          </label>
        </div>
        {drawer?.showFooter === false ? null : (
          <DrawerFooter>
            <DrawerClose asChild>
              <Button>Save Preferences</Button>
            </DrawerClose>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}

const activity = [
  { event: "Deployment Completed", time: "2 minutes ago" },
  { event: "Domain Connected", time: "18 minutes ago" },
  { event: "Member Invited", time: "1 hour ago" },
];

function ActivityExample() {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline">View Activity</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Project Activity</DrawerTitle>
          <DrawerDescription>
            Recent changes across the Acme workspace.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 space-y-1 overflow-y-auto px-3 pb-5">
          {activity.map((item) => (
            <div
              className="rounded-lg px-2 py-3 hover:bg-muted/50"
              key={item.event}
            >
              <p className="font-medium">{item.event}</p>
              <p className="text-xs text-muted-foreground">{item.time}</p>
            </div>
          ))}
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close Activity</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export const drawerDocs: ComponentDocDefinition = {
  description:
    "A gesture-driven sheet for mobile actions, compact forms, and progressive detail.",
  examples: [
    {
      code: activityCode,
      preview: <ActivityExample />,
      resetKey: "drawer-activity-example",
      title: "Activity Panel",
    },
  ],
  getShowcaseCode,
  importCode: `import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";`,
  primitiveDocsUrl: "https://vaul.emilkowal.ski/",
  props: [
    {
      title: "Drawer",
      props: [
        {
          name: "direction",
          type: '"top" | "right" | "bottom" | "left"',
          defaultValue: '"bottom"',
          description: "Sets the edge the drawer enters from.",
        },
        {
          name: "snapPoints",
          type: "(number | string)[]",
          defaultValue: "-",
          description: "Defines the draggable resting positions.",
        },
        {
          name: "dismissible",
          type: "boolean",
          defaultValue: "true",
          description: "Allows dragging or interacting outside to dismiss.",
        },
        {
          name: "modal",
          type: "boolean",
          defaultValue: "true",
          description: "Traps focus and blocks interaction behind the drawer.",
        },
      ],
    },
  ],
  renderPreview: (settings) => <Preview settings={settings} />,
  usageCode: `<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">Open Drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Drawer Title</DrawerTitle>
      <DrawerDescription>Supporting detail.</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <DrawerClose asChild>
        <Button>Done</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`,
};
