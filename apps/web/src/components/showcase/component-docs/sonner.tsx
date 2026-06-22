import { Button } from "@sunlace/ui";
import { toast } from "sonner";

import type { ComponentSettings } from "../component-catalog";
import type { ComponentDocDefinition } from "./types";

function getShowcaseCode(settings?: ComponentSettings) {
  const sonner = settings?.sonner;
  const positionProp =
    sonner?.position && sonner.position !== "bottom-right"
      ? ` position="${sonner.position}"`
      : "";
  const expandProp = sonner?.expand ? " expand" : "";
  const closeButtonProp = sonner?.closeButton ? " closeButton" : "";

  return `import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export function SonnerDemo() {
  return (
    <>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={() => toast("sunlace toast")}>
          Default
        </Button>
        <Button variant="success" onClick={() => toast.success("Changes saved")}>
          Success
        </Button>
        <Button variant="warning" onClick={() => toast.warning("Storage almost full")}>
          Warning
        </Button>
        <Button variant="info" onClick={() => toast.info("New version available")}>
          Info
        </Button>
        <Button variant="destructive" onClick={() => toast.error("Save failed")}>
          Error
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            const id = toast.loading("Uploading file");
            setTimeout(() => toast.success("Upload complete", { id }), 1600);
          }}
        >
          Loading
        </Button>
        <Button
          onClick={() =>
            toast("File deleted", {
              description: "restore it within 30 seconds.",
              action: {
                label: "Undo",
                onClick: () => toast.success("File restored"),
              },
            })
          }
        >
          With Action
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            const promise = new Promise((resolve) => setTimeout(resolve, 1800));
            toast.promise(promise, {
              loading: "Deploying sunlace...",
              success: "Deployment live",
              error: "Deployment failed",
            });
          }}
        >
          Promise
        </Button>
      </div>
      <Toaster${positionProp}${expandProp}${closeButtonProp} />
    </>
  );
}`;
}

function Preview() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button variant="outline" onClick={() => toast("sunlace toast")}>
        Default
      </Button>
      <Button variant="success" onClick={() => toast.success("Changes saved")}>
        Success
      </Button>
      <Button
        variant="warning"
        onClick={() => toast.warning("Storage almost full")}
      >
        Warning
      </Button>
      <Button
        variant="info"
        onClick={() => toast.info("New version available")}
      >
        Info
      </Button>
      <Button variant="destructive" onClick={() => toast.error("Save failed")}>
        Error
      </Button>
      <Button
        variant="secondary"
        onClick={() => {
          const id = toast.loading("Uploading file");
          setTimeout(() => toast.success("Upload complete", { id }), 1600);
        }}
      >
        Loading
      </Button>
      <Button
        onClick={() =>
          toast("File deleted", {
            description: "restore it within 30 seconds.",
            action: {
              label: "Undo",
              onClick: () => toast.success("File restored"),
            },
          })
        }
      >
        With Action
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          const promise = new Promise((resolve) => setTimeout(resolve, 1800));
          toast.promise(promise, {
            loading: "Deploying sunlace...",
            success: "Deployment live",
            error: "Deployment failed",
          });
        }}
      >
        Promise
      </Button>
    </div>
  );
}

const actionCode = `import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export function SonnerActionDemo() {
  return (
    <>
      <Button
        onClick={() =>
          toast("File deleted", {
            description: "restore it within 30 seconds.",
            action: {
              label: "Undo",
              onClick: () => toast.success("File restored"),
            },
          })
        }
      >
        Delete file
      </Button>
      <Toaster />
    </>
  );
}`;

function ActionExample() {
  return (
    <Button
      onClick={() =>
        toast("File deleted", {
          description: "restore it within 30 seconds.",
          action: {
            label: "Undo",
            onClick: () => toast.success("File restored"),
          },
        })
      }
    >
      Delete file
    </Button>
  );
}

export const sonnerDocs: ComponentDocDefinition = {
  description: "A toast system for transient feedback and notifications.",
  examples: [
    {
      code: actionCode,
      preview: <ActionExample />,
      resetKey: "sonner-action-example",
      title: "With Action",
    },
  ],
  getShowcaseCode,
  importCode: `import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";`,
  primitiveName: "sonner",
  primitiveDocsUrl: "https://sonner.emilkowal.ski/",
  props: [
    {
      title: "Toaster",
      props: [
        {
          name: "position",
          type: '"bottom-left" | "bottom-center" | "bottom-right" | "top-left" | "top-center" | "top-right"',
          defaultValue: '"bottom-right"',
          description: "Where toasts anchor on the viewport.",
        },
        {
          name: "expand",
          type: "boolean",
          defaultValue: "false",
          description:
            "Expands the stacked toast queue instead of collapsing it.",
        },
        {
          name: "closeButton",
          type: "boolean",
          defaultValue: "false",
          description: "Renders an explicit close control on each toast.",
        },
        {
          name: "duration",
          type: "number",
          defaultValue: "4000",
          description: "Milliseconds before a toast auto-dismisses.",
        },
        {
          name: "richColors",
          type: "boolean",
          defaultValue: "false",
          description:
            "Uses sonner's saturated intent backgrounds. Sunlace ships token-driven tinted surfaces by default.",
        },
        {
          name: "theme",
          type: '"light" | "dark" | "system"',
          defaultValue: '"system"',
          description:
            "Overrides the toast color theme. Defaults to next-themes.",
        },
      ],
    },
  ],
  renderPreview: () => <Preview />,
  usageCode: `<Button onClick={() => toast.success("Saved")}>Save</Button>
<Toaster />`,
};
