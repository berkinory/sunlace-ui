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

import type { ComponentDocDefinition } from "./types";

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

export function TabsDemo() {
  return (
    <Tabs className="w-full max-w-sm" defaultValue="login">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Log In</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      <Card className="min-h-72">
        <TabsContent value="login">
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Log in to continue to your account.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Input aria-label="Email" placeholder="Email" type="email" />
            <Input
              aria-label="Password"
              placeholder="Password"
              type="password"
            />
            <Button className="mt-1 w-full">Log In</Button>
          </CardContent>
        </TabsContent>
        <TabsContent value="register">
          <CardHeader>
            <CardTitle>Create an Account</CardTitle>
            <CardDescription>Get started with a new account.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Input aria-label="Name" placeholder="Name" />
            <Input aria-label="Email" placeholder="Email" type="email" />
            <Input
              aria-label="Password"
              placeholder="Password"
              type="password"
            />
            <Button className="mt-1 w-full">Create Account</Button>
          </CardContent>
        </TabsContent>
      </Card>
    </Tabs>
  );
}`;

function Preview() {
  return (
    <Tabs className="w-full max-w-sm" defaultValue="login">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Log In</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      <Card className="min-h-72">
        <TabsContent value="login">
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>
              Log in to continue to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Input aria-label="Email" placeholder="Email" type="email" />
            <Input
              aria-label="Password"
              placeholder="Password"
              type="password"
            />
            <Button className="mt-1 w-full">Log In</Button>
          </CardContent>
        </TabsContent>
        <TabsContent value="register">
          <CardHeader>
            <CardTitle>Create an Account</CardTitle>
            <CardDescription>Get started with a new account.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Input aria-label="Name" placeholder="Name" />
            <Input aria-label="Email" placeholder="Email" type="email" />
            <Input
              aria-label="Password"
              placeholder="Password"
              type="password"
            />
            <Button className="mt-1 w-full">Create Account</Button>
          </CardContent>
        </TabsContent>
      </Card>
    </Tabs>
  );
}

export const tabsDocs: ComponentDocDefinition = {
  description: "A set of layered panels switched by a shared tab list.",
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
    <TabsTrigger value="login">Log In</TabsTrigger>
    <TabsTrigger value="register">Register</TabsTrigger>
  </TabsList>
  <TabsContent value="login">Log in form</TabsContent>
  <TabsContent value="register">Registration form</TabsContent>
</Tabs>`,
};
