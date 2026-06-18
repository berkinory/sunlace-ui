import {
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@sunlace/ui";

import type { ComponentSettings } from "../component-catalog";
import type { ComponentDocDefinition } from "./types";

const surfaceCode = `import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function CardSurfaceDemo() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Card className="w-72" variant="shine">
        <CardHeader>
          <CardTitle>Release Window</CardTitle>
          <CardDescription>Production deploy</CardDescription>
        </CardHeader>
        <CardContent>
          The shine surface gives important grouped content a stronger frame.
        </CardContent>
      </Card>
      <Card className="w-72" variant="animated-border">
        <CardHeader>
          <CardTitle>Sync Status</CardTitle>
          <CardDescription>Queue is healthy</CardDescription>
        </CardHeader>
        <CardContent>
          The border animation keeps attention on a quiet operational card.
        </CardContent>
      </Card>
    </div>
  );
}`;

function SurfaceExample() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Card className="w-72" variant="shine">
        <CardHeader>
          <CardTitle>Release Window</CardTitle>
          <CardDescription>Production deploy</CardDescription>
        </CardHeader>
        <CardContent>
          The shine surface gives important grouped content a stronger frame.
        </CardContent>
      </Card>
      <Card className="w-72" variant="animated-border">
        <CardHeader>
          <CardTitle>Sync Status</CardTitle>
          <CardDescription>Queue is healthy</CardDescription>
        </CardHeader>
        <CardContent>
          The border animation keeps attention on a quiet operational card.
        </CardContent>
      </Card>
    </div>
  );
}

const metricCode = `import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function CardMetricDemo() {
  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Revenue</CardTitle>
        <CardDescription>Last 30 days</CardDescription>
        <CardAction>
          <span className="rounded-full bg-[oklch(0.93_0.07_145)] px-2 py-1 text-xs font-medium text-[oklch(0.43_0.13_145)] dark:bg-[oklch(0.34_0.06_145)] dark:text-[oklch(0.74_0.16_145)]">
            +12.8%
          </span>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-semibold tracking-tight">$42,804</p>
        <p className="mt-2 text-muted-foreground">
          Pipeline health is trending above the quarterly baseline.
        </p>
      </CardContent>
    </Card>
  );
}`;

function MetricExample() {
  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Revenue</CardTitle>
        <CardDescription>Last 30 days</CardDescription>
        <CardAction>
          <span className="rounded-full bg-[oklch(0.93_0.07_145)] px-2 py-1 text-xs font-medium text-[oklch(0.43_0.13_145)] dark:bg-[oklch(0.34_0.06_145)] dark:text-[oklch(0.74_0.16_145)]">
            +12.8%
          </span>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-semibold tracking-tight">$42,804</p>
        <p className="mt-2 text-muted-foreground">
          Pipeline health is trending above the quarterly baseline.
        </p>
      </CardContent>
    </Card>
  );
}

const billingCode = `import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function CardBillingDemo() {
  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Pro Workspace</CardTitle>
        <CardDescription>Renewing on July 17</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-1">
          <span className="text-3xl font-semibold">$29</span>
          <span className="pb-1 text-muted-foreground">/ month</span>
        </div>
        <div className="mt-4 grid gap-2 text-muted-foreground">
          <p>Unlimited projects</p>
          <p>Team permissions</p>
          <p>Priority component reviews</p>
        </div>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline">Manage</Button>
        <Button>Upgrade</Button>
      </CardFooter>
    </Card>
  );
}`;

function BillingExample() {
  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Pro Workspace</CardTitle>
        <CardDescription>Renewing on July 17</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-1">
          <span className="text-3xl font-semibold">$29</span>
          <span className="pb-1 text-muted-foreground">/ month</span>
        </div>
        <div className="mt-4 grid gap-2 text-muted-foreground">
          <p>Unlimited projects</p>
          <p>Team permissions</p>
          <p>Priority component reviews</p>
        </div>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline">Manage</Button>
        <Button>Upgrade</Button>
      </CardFooter>
    </Card>
  );
}

function renderPreview(settings?: ComponentSettings) {
  const size = settings?.card?.size ?? "default";
  const variant = settings?.card?.variant ?? "default";
  const showFooter = settings?.card?.showFooter ?? true;
  const showAction = settings?.card?.showAction ?? false;

  return (
    <Card className="w-full max-w-sm" size={size} variant={variant}>
      <CardHeader>
        <CardTitle>Workspace</CardTitle>
        <CardDescription>
          Grouped content with bordered surfaces and soft depth.
        </CardDescription>
        {showAction ? (
          <CardAction>
            <Button size="sm" variant="outline">
              Edit
            </Button>
          </CardAction>
        ) : null}
      </CardHeader>
      <CardContent className="text-muted-foreground">
        Cards use a light border, soft drop shadow, and inset highlight.
      </CardContent>
      {showFooter ? (
        <CardFooter className="justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Continue</Button>
        </CardFooter>
      ) : null}
    </Card>
  );
}

function getShowcaseCode(settings?: ComponentSettings) {
  const size = settings?.card?.size ?? "default";
  const sizeAttr = size !== "default" ? ` size="${size}"` : "";
  const variant = settings?.card?.variant ?? "default";
  const variantAttr = variant !== "default" ? ` variant="${variant}"` : "";
  const showFooter = settings?.card?.showFooter ?? true;
  const showAction = settings?.card?.showAction ?? false;

  return `import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function CardDemo() {
  return (
    <Card className="w-full max-w-sm"${sizeAttr}${variantAttr}>
      <CardHeader>
        <CardTitle>Workspace</CardTitle>
        <CardDescription>
          Grouped content with bordered surfaces and soft depth.
        </CardDescription>${
          showAction
            ? `
        <CardAction>
          <Button size="sm" variant="outline">Edit</Button>
        </CardAction>`
            : ""
        }
      </CardHeader>
      <CardContent className="text-muted-foreground">
        Cards use a light border, soft drop shadow, and inset highlight.
      </CardContent>${
        showFooter
          ? `
      <CardFooter className="justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Continue</Button>
      </CardFooter>`
          : ""
      }
    </Card>
  );
}`;
}

export const cardDocs: ComponentDocDefinition = {
  description:
    "A bordered surface for grouped content, header actions, body detail, and footer controls.",
  examples: [
    {
      code: surfaceCode,
      preview: <SurfaceExample />,
      resetKey: "card-surface-example",
      title: "Surface Variants",
    },
    {
      code: metricCode,
      preview: <MetricExample />,
      resetKey: "card-metric-example",
      title: "Metric Card",
    },
    {
      code: billingCode,
      preview: <BillingExample />,
      resetKey: "card-billing-example",
      title: "Billing Card",
    },
  ],
  getShowcaseCode,
  importCode: `import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";`,
  props: [
    {
      title: "Card",
      props: [
        {
          name: "variant",
          type: '"default" | "shine" | "animated-border"',
          defaultValue: '"default"',
          description: "Controls the card surface treatment.",
        },
        {
          name: "size",
          type: '"default" | "sm"',
          defaultValue: '"default"',
          description: "Controls card padding and title scale.",
        },
      ],
    },
  ],
  renderPreview,
  usageCode: `<Card className="w-full max-w-sm">
  <CardHeader>
    <CardTitle>Workspace</CardTitle>
    <CardDescription>Grouped content with actions and detail.</CardDescription>
  </CardHeader>
  <CardContent>Card body content.</CardContent>
  <CardFooter className="justify-end gap-2">
    <Button variant="outline">Cancel</Button>
    <Button>Continue</Button>
  </CardFooter>
</Card>`,
};
