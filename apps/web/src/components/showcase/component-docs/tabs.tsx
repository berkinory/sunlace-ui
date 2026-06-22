import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@sunlace/ui";
import { useState } from "react";

import type { ComponentDocDefinition } from "./types";

const resizeCardClass =
  "overflow-hidden transition-[height] duration-[var(--resize-dur)] ease-[var(--resize-ease)] will-change-[height] [--resize-dur:300ms] [--resize-ease:cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";

const showcaseCode = `import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useState } from "react";

export function TabsDemo() {
  const [tab, setTab] = useState("login");

  return (
    <Tabs className="w-full max-w-sm gap-4" onValueChange={setTab} value={tab}>
      <TabsList>
        <TabsTrigger value="login">Log in</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      <Card
        className={
          tab === "login"
            ? "h-60 overflow-hidden transition-[height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
            : "h-72 overflow-hidden transition-[height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        }
      >
        <TabsContent value="login">
          <CardHeader>
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>Log in to continue.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Input aria-label="Email" placeholder="Email" type="email" />
            <Input
              aria-label="Password"
              placeholder="Password"
              type="password"
            />
            <Button className="mt-1 w-full">Log in</Button>
          </CardContent>
        </TabsContent>
        <TabsContent value="register">
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>Finish the extra details before starting.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Input aria-label="Name" placeholder="Name" />
            <Input aria-label="Email" placeholder="Email" type="email" />
            <Input
              aria-label="Password"
              placeholder="Password"
              type="password"
            />
            <Button className="mt-1 w-full">Create account</Button>
          </CardContent>
        </TabsContent>
      </Card>
    </Tabs>
  );
}`;

const projectCode = `import { Card, CardContent } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export function ProjectTabs() {
  return (
    <Tabs className="w-80 gap-4" defaultValue="overview">
      <TabsList variant="line">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <Card>
        <TabsContent value="overview">
          <CardContent className="text-muted-foreground">
            Track launch status, ownership, and current project health.
          </CardContent>
        </TabsContent>
        <TabsContent value="activity">
          <CardContent className="text-muted-foreground">
            Review recent deploys, comments, and handoff notes.
          </CardContent>
        </TabsContent>
        <TabsContent value="settings">
          <CardContent className="text-muted-foreground">
            Manage access, notifications, and automation rules.
          </CardContent>
        </TabsContent>
      </Card>
    </Tabs>
  );
}`;

function ProjectExample() {
  return (
    <Tabs className="w-80 gap-4" defaultValue="overview">
      <TabsList variant="line">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <Card>
        <TabsContent value="overview">
          <CardContent className="text-muted-foreground">
            Track launch status, ownership, and current project health.
          </CardContent>
        </TabsContent>
        <TabsContent value="activity">
          <CardContent className="text-muted-foreground">
            Review recent deploys, comments, and handoff notes.
          </CardContent>
        </TabsContent>
        <TabsContent value="settings">
          <CardContent className="text-muted-foreground">
            Manage access, notifications, and automation rules.
          </CardContent>
        </TabsContent>
      </Card>
    </Tabs>
  );
}

function Preview() {
  const [tab, setTab] = useState("login");

  return (
    <Tabs className="w-full max-w-sm gap-4" onValueChange={setTab} value={tab}>
      <TabsList>
        <TabsTrigger value="login">Log in</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      <Card
        className={`${resizeCardClass} ${tab === "login" ? "h-60" : "h-72"}`}
      >
        <TabsContent value="login">
          <CardHeader>
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>Log in to continue.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Input aria-label="Email" placeholder="Email" type="email" />
            <Input
              aria-label="Password"
              placeholder="Password"
              type="password"
            />
            <Button className="mt-1 w-full">Log in</Button>
          </CardContent>
        </TabsContent>
        <TabsContent value="register">
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
              Finish the extra details before starting.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Input aria-label="Name" placeholder="Name" />
            <Input aria-label="Email" placeholder="Email" type="email" />
            <Input
              aria-label="Password"
              placeholder="Password"
              type="password"
            />
            <Button className="mt-1 w-full">Create account</Button>
          </CardContent>
        </TabsContent>
      </Card>
    </Tabs>
  );
}

export const tabsDocs: ComponentDocDefinition = {
  description: "A set of panels switched by a shared tab list.",
  examples: [
    {
      code: projectCode,
      preview: <ProjectExample />,
      resetKey: "tabs-project-example",
      title: "Project sections",
    },
  ],
  getShowcaseCode: () => showcaseCode,
  importCode: `import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";`,
  primitiveDocsUrl: "https://base-ui.com/react/components/tabs",
  props: [
    {
      title: "Tabs",
      props: [
        {
          name: "value",
          type: "string",
          defaultValue: "-",
          description: "Controls the active tab.",
        },
        {
          name: "defaultValue",
          type: "string",
          defaultValue: "-",
          description: "Sets the initial active tab when uncontrolled.",
        },
        {
          name: "onValueChange",
          type: "(value: string) => void",
          defaultValue: "-",
          description: "Runs when the active tab changes.",
        },
        {
          name: "orientation",
          type: '"horizontal" | "vertical"',
          defaultValue: '"horizontal"',
          description: "Sets the tab list direction.",
        },
      ],
    },
    {
      title: "TabsList",
      props: [
        {
          name: "variant",
          type: '"default" | "line"',
          defaultValue: '"default"',
          description: "Sets the list presentation.",
        },
        {
          name: "activateOnFocus",
          type: "boolean",
          defaultValue: "false",
          description: "Activates tabs while moving keyboard focus.",
        },
      ],
    },
    {
      title: "TabsTrigger",
      props: [
        {
          name: "value",
          type: "string",
          defaultValue: "-",
          description: "Connects the trigger to its content panel.",
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
          description: "Prevents selecting the tab.",
        },
      ],
    },
    {
      title: "TabsContent",
      props: [
        {
          name: "value",
          type: "string",
          defaultValue: "-",
          description: "Connects the panel to its trigger.",
        },
      ],
    },
  ],
  renderPreview: () => <Preview />,
  usageCode: `<Tabs defaultValue="login">
  <TabsList>
    <TabsTrigger value="login">Log in</TabsTrigger>
    <TabsTrigger value="register">Register</TabsTrigger>
  </TabsList>
  <TabsContent value="login">Log in form</TabsContent>
  <TabsContent value="register">Registration form</TabsContent>
</Tabs>`,
};
