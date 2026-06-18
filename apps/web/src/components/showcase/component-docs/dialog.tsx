import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@sunlace/ui";

import type { ComponentDocDefinition } from "./types";

const showcaseCode = `import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button />}>Open dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog</DialogTitle>
          <DialogDescription>Dialog content and supporting detail.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}`;

function Preview() {
  return (
    <Dialog>
      <DialogTrigger render={<Button />}>Open dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog</DialogTitle>
          <DialogDescription>Temporary component preview.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export const dialogDocs: ComponentDocDefinition = {
  description: "A modal surface for focused tasks and important decisions.",
  getShowcaseCode: () => showcaseCode,
  importCode: `import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";`,
  renderPreview: () => <Preview />,
  usageCode: `<Dialog>
  <DialogTrigger>Open dialog</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog</DialogTitle>
      <DialogDescription>Supporting detail.</DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>`,
};
