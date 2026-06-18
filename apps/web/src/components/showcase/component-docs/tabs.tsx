import { Tabs, TabsContent, TabsList, TabsTrigger } from "@sunlace/ui";

import type { ComponentDocDefinition } from "./types";

const showcaseCode = `import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export function TabsDemo() {
  return (
    <Tabs defaultValue="preview">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">Component preview</TabsContent>
      <TabsContent value="code">Import from @sunlace/ui</TabsContent>
    </Tabs>
  );
}`;

function Preview() {
  return (
    <Tabs className="w-full max-w-sm" defaultValue="preview">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">Component preview</TabsContent>
      <TabsContent value="code">Import from @sunlace/ui</TabsContent>
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
  renderPreview: () => <Preview />,
  usageCode: `<Tabs defaultValue="preview">
  <TabsList>
    <TabsTrigger value="preview">Preview</TabsTrigger>
  </TabsList>
  <TabsContent value="preview">Component preview</TabsContent>
</Tabs>`,
};
