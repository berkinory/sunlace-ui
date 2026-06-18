import { Button, Toaster } from "@sunlace/ui";
import { toast } from "sonner";

import type { ComponentDocDefinition } from "./types";

const showcaseCode = `import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export function SonnerDemo() {
  return (
    <>
      <Button onClick={() => toast("sunlace toast")}>Toast Preview</Button>
      <Toaster />
    </>
  );
}`;

function Preview() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Button onClick={() => toast("sunlace toast")}>Toast Preview</Button>
      <Toaster />
    </div>
  );
}

export const sonnerDocs: ComponentDocDefinition = {
  description: "A toast system for transient feedback and notifications.",
  getShowcaseCode: () => showcaseCode,
  importCode: `import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";`,
  renderPreview: () => <Preview />,
  usageCode: `<Button onClick={() => toast("Saved")}>Save</Button>
<Toaster />`,
};
