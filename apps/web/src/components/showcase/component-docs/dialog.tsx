import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
} from "@sunlace/ui";

import type { ComponentSettings } from "../component-catalog";
import type { ComponentDocDefinition } from "./types";

function getShowcaseCode(settings?: ComponentSettings) {
  const dialog = settings?.dialog;

  return `import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>Edit Profile</DialogTrigger>
      <DialogContent${dialog?.showCloseButton === false ? " showCloseButton={false}" : ""}>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update the details visible to your workspace.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="display-name">
            Display Name
          </label>
          <input
            className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            defaultValue="Ada Lovelace"
            id="display-name"
          />
        </div>${
          dialog?.showFooter === false
            ? ""
            : `
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
          <DialogClose render={<Button />}>Save Changes</DialogClose>
        </DialogFooter>`
        }
      </DialogContent>
    </Dialog>
  );
}`;
}

const confirmationCode = `import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DeleteProjectDialog() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="destructive" />}>
        Delete Project
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Project?</DialogTitle>
          <DialogDescription>
            This permanently removes the project and its deployment history.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
          <Button variant="destructive">Delete Project</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}`;

function Preview({ settings }: { settings?: ComponentSettings }) {
  const dialog = settings?.dialog;

  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Edit Profile
      </DialogTrigger>
      <DialogContent showCloseButton={dialog?.showCloseButton}>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update the details visible to your workspace.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          <label
            className="text-sm font-medium"
            htmlFor="showcase-display-name"
          >
            Display Name
          </label>
          <Input defaultValue="Ada Lovelace" id="showcase-display-name" />
        </div>
        {dialog?.showFooter === false ? null : (
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>
              Cancel
            </DialogClose>
            <DialogClose render={<Button />}>Save Changes</DialogClose>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

function ConfirmationExample() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="destructive" />}>
        Delete Project
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Project?</DialogTitle>
          <DialogDescription>
            This permanently removes the project and its deployment history.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Cancel
          </DialogClose>
          <Button variant="destructive">Delete Project</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export const dialogDocs: ComponentDocDefinition = {
  description:
    "A focused modal surface for forms, confirmations, and short decision flows.",
  examples: [
    {
      code: confirmationCode,
      preview: <ConfirmationExample />,
      resetKey: "dialog-confirmation-example",
      title: "Destructive Confirmation",
    },
  ],
  getShowcaseCode,
  importCode: `import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";`,
  primitiveDocsUrl: "https://base-ui.com/react/components/dialog",
  props: [
    {
      title: "Dialog",
      props: [
        {
          name: "open",
          type: "boolean",
          defaultValue: "-",
          description: "Controls whether the dialog is open.",
        },
        {
          name: "defaultOpen",
          type: "boolean",
          defaultValue: "false",
          description: "Sets the initial uncontrolled open state.",
        },
        {
          name: "onOpenChange",
          type: "(open: boolean) => void",
          defaultValue: "-",
          description: "Runs when the open state changes.",
        },
      ],
    },
    {
      title: "DialogContent",
      props: [
        {
          name: "showCloseButton",
          type: "boolean",
          defaultValue: "true",
          description: "Shows the close button in the top-right corner.",
        },
      ],
    },
    {
      title: "DialogFooter",
      props: [
        {
          name: "showCloseButton",
          type: "boolean",
          defaultValue: "false",
          description: "Adds a default outlined close action.",
        },
      ],
    },
  ],
  renderPreview: (settings) => <Preview settings={settings} />,
  usageCode: `<Dialog>
  <DialogTrigger render={<Button variant="outline" />}>Open Dialog</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Supporting detail.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
      <Button>Continue</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
};
