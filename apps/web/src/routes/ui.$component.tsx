import { Settings03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  DitherAvatar,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  Switch,
} from "@sunlace/ui";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import {
  ComponentPreview,
  type ComponentSettings,
  componentBySlug,
  getComponentExampleCode,
  isComponentSlug,
  toPascalCase,
} from "@/components/showcase/component-registry";
import {
  CodeBlock,
  ShowcaseExample,
} from "@/components/showcase/showcase-example";
import { ShowcaseLayout } from "@/components/showcase/showcase-layout";

export const Route = createFileRoute("/ui/$component")({
  beforeLoad: ({ params }) => {
    if (!isComponentSlug(params.component)) {
      throw redirect({
        to: "/ui/$component",
        params: { component: "accordion" },
      });
    }
  },
  component: UiComponent,
  head: ({ params }) => ({
    meta: [{ title: `${params.component} - sunlace` }],
  }),
});

const accordionProps = [
  {
    name: "borders",
    target: "Accordion",
    type: "boolean",
    defaultValue: "false",
    description: "Wraps the accordion in a connected border treatment.",
  },
  {
    name: "multiple",
    target: "Accordion",
    type: "boolean",
    defaultValue: "false",
    description: "Allows more than one item to stay open at the same time.",
  },
  {
    name: "showArrow",
    target: "AccordionTrigger",
    type: "boolean",
    defaultValue: "true",
    description: "Shows or hides the trigger arrow icon.",
  },
  {
    name: "underline",
    target: "AccordionTrigger",
    type: "boolean",
    defaultValue: "true",
    description: "Controls the trigger underline on hover.",
  },
];

const avatarProps = [
  {
    name: "shape",
    target: "Avatar",
    type: '"circle" | "rounded" | "square"',
    defaultValue: '"circle"',
    description: "Controls the avatar corner treatment.",
  },
  {
    name: "size",
    target: "Avatar",
    type: '"sm" | "default" | "lg"',
    defaultValue: '"default"',
    description: "Controls the avatar dimensions.",
  },
];

const buttonProps = [
  {
    name: "variant",
    target: "Button",
    type: '"default" | "secondary" | "outline" | "ghost" | "link" | "success" | "warning" | "destructive" | "shine" | "animated-border" | "rotate-border"',
    defaultValue: '"default"',
    description: "Controls the visual style and emphasis of the button.",
  },
  {
    name: "size",
    target: "Button",
    type: '"default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"',
    defaultValue: '"default"',
    description: "Controls the button height, padding, and icon dimensions.",
  },
  {
    name: "disabled",
    target: "Button",
    type: "boolean",
    defaultValue: "false",
    description: "Prevents interaction and lowers visual emphasis.",
  },
];

const badgeProps = [
  {
    name: "variant",
    target: "Badge",
    type: '"default" | "secondary" | "outline" | "ghost" | "link" | "success" | "warning" | "destructive" | "shine" | "animated-border" | "rotate-border"',
    defaultValue: '"default"',
    description: "Controls the visual style and emphasis of the badge.",
  },
];

const cardProps = [
  {
    name: "size",
    target: "Card",
    type: '"default" | "sm"',
    defaultValue: '"default"',
    description: "Controls card padding and title scale.",
  },
];

const ditherAvatarProps = [
  {
    name: "hash",
    target: "DitherAvatar",
    type: "string",
    defaultValue: "-",
    description: "Seed string used to generate the deterministic dither image.",
  },
  {
    name: "shape",
    target: "DitherAvatar",
    type: '"circle" | "rounded" | "square"',
    defaultValue: '"circle"',
    description: "Controls the avatar corner treatment.",
  },
  {
    name: "size",
    target: "DitherAvatar",
    type: '"sm" | "default" | "lg"',
    defaultValue: '"default"',
    description: "Controls the avatar dimensions.",
  },
  {
    name: "dotScale",
    target: "DitherAvatar",
    type: "number",
    defaultValue: "1",
    description: "Controls the dither cell size.",
  },
  {
    name: "tones",
    target: "DitherAvatar",
    type: "HashvatarOptions['tones']",
    defaultValue: "-",
    description: "Restricts generated colors to selected tone families.",
  },
];

const componentPropGroups = {
  accordion: [
    {
      title: "Accordion",
      props: accordionProps.filter((prop) => prop.target === "Accordion"),
    },
    {
      title: "AccordionTrigger",
      props: accordionProps.filter(
        (prop) => prop.target === "AccordionTrigger"
      ),
    },
  ],
  avatar: [
    {
      title: "Avatar",
      props: avatarProps.filter((prop) => prop.target === "Avatar"),
    },
  ],
  badge: [
    {
      title: "Badge",
      props: badgeProps.filter((prop) => prop.target === "Badge"),
    },
  ],
  button: [
    {
      title: "Button",
      props: buttonProps.filter((prop) => prop.target === "Button"),
    },
  ],
  card: [
    {
      title: "Card",
      props: cardProps.filter((prop) => prop.target === "Card"),
    },
  ],
  "dither-avatar": [
    {
      title: "DitherAvatar",
      props: ditherAvatarProps.filter((prop) => prop.target === "DitherAvatar"),
    },
  ],
};

const accordionCardExampleCode = `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function AccordionCardDemo() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Release Checklist</CardTitle>
        <CardDescription>
          Track the final passes before publishing a component update.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion defaultValue={["design"]}>
          <AccordionItem value="design">
            <AccordionTrigger>Design Review</AccordionTrigger>
            <AccordionContent>
              Validate spacing, color tokens, focus states, and dark mode.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="qa">
            <AccordionTrigger>QA Pass</AccordionTrigger>
            <AccordionContent>
              Test keyboard navigation across desktop and mobile viewports.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="docs">
            <AccordionTrigger>Docs Update</AccordionTrigger>
            <AccordionContent>
              Keep the usage snippet aligned with the shipped component API.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}`;

function AccordionCardExample() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Release Checklist</CardTitle>
        <CardDescription>
          Track the final passes before publishing a component update.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion defaultValue={["design"]}>
          <AccordionItem value="design">
            <AccordionTrigger>Design Review</AccordionTrigger>
            <AccordionContent>
              Validate spacing, color tokens, focus states, and dark mode.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="qa">
            <AccordionTrigger>QA Pass</AccordionTrigger>
            <AccordionContent>
              Test keyboard navigation across desktop and mobile viewports.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="docs">
            <AccordionTrigger>Docs Update</AccordionTrigger>
            <AccordionContent>
              Keep the usage snippet aligned with the shipped component API.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}

const badgeStatusExampleCode = `import { Badge } from "@/components/ui/badge";

export function BadgeStatusDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success">Synced</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="destructive">Failed</Badge>
      <Badge variant="outline">Draft</Badge>
    </div>
  );
}`;

function BadgeStatusExample() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success">Synced</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="destructive">Failed</Badge>
      <Badge variant="outline">Draft</Badge>
    </div>
  );
}

const buttonVariantExampleCode = `import { Button } from "@/components/ui/button";

export function ButtonVariantDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button>Save Changes</Button>
      <Button variant="secondary">Preview</Button>
      <Button variant="outline">Cancel</Button>
      <Button variant="ghost">Dismiss</Button>
      <Button variant="link">View Logs</Button>
    </div>
  );
}`;

function ButtonVariantExample() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button>Save Changes</Button>
      <Button variant="secondary">Preview</Button>
      <Button variant="outline">Cancel</Button>
      <Button variant="ghost">Dismiss</Button>
      <Button variant="link">View Logs</Button>
    </div>
  );
}

const buttonIntentExampleCode = `import { Button } from "@/components/ui/button";

export function ButtonIntentDemo() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        <Button variant="success">Approve</Button>
        <Button variant="warning">Review</Button>
        <Button variant="destructive">Delete</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="shine">Upgrade</Button>
        <Button variant="animated-border">Sync</Button>
        <Button variant="rotate-border">Deploy</Button>
      </div>
    </div>
  );
}`;

function ButtonIntentExample() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        <Button variant="success">Approve</Button>
        <Button variant="warning">Review</Button>
        <Button variant="destructive">Delete</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="shine">Upgrade</Button>
        <Button variant="animated-border">Sync</Button>
        <Button variant="rotate-border">Deploy</Button>
      </div>
    </div>
  );
}

const cardMetricExampleCode = `import {
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

function CardMetricExample() {
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

const cardBillingExampleCode = `import { Button } from "@/components/ui/button";
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

function CardBillingExample() {
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

const cardActivityExampleCode = `import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const activity = [
  ["10:42", "Button variants approved"],
  ["11:08", "Badge warning state tuned"],
  ["11:31", "Card examples published"],
];

export function CardActivityDemo() {
  return (
    <Card className="w-80" size="sm">
      <CardHeader>
        <CardTitle>Activity</CardTitle>
        <CardDescription>Today</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        {activity.map(([time, label]) => (
          <div className="grid grid-cols-[3rem_1fr] gap-3" key={label}>
            <span className="font-mono text-muted-foreground text-xs">{time}</span>
            <span>{label}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}`;

const activity = [
  ["10:42", "Button variants approved"],
  ["11:08", "Badge warning state tuned"],
  ["11:31", "Card examples published"],
];

function CardActivityExample() {
  return (
    <Card className="w-80" size="sm">
      <CardHeader>
        <CardTitle>Activity</CardTitle>
        <CardDescription>Today</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        {activity.map(([time, label]) => (
          <div className="grid grid-cols-[3rem_1fr] gap-3" key={label}>
            <span className="font-mono text-muted-foreground text-xs">
              {time}
            </span>
            <span>{label}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

const avatarGroupExampleCode = `import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";

export function AvatarGroupDemo() {
  return (
    <AvatarGroup>
      <Avatar>
        <AvatarImage alt="Ava" src="https://avatars.githubusercontent.com/u/61243523?v=4" />
        <AvatarFallback>AV</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>BK</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>DS</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>+4</AvatarGroupCount>
    </AvatarGroup>
  );
}`;

function AvatarGroupExample() {
  return (
    <AvatarGroup>
      <Avatar className="size-12">
        <AvatarImage
          alt="Ava"
          src="https://avatars.githubusercontent.com/u/61243523?v=4"
        />
        <AvatarFallback>AV</AvatarFallback>
      </Avatar>
      <Avatar className="size-12">
        <AvatarFallback>BK</AvatarFallback>
      </Avatar>
      <Avatar className="size-12">
        <AvatarFallback>DS</AvatarFallback>
      </Avatar>
      <AvatarGroupCount className="size-12">+4</AvatarGroupCount>
    </AvatarGroup>
  );
}

const avatarBadgeExampleCode = `import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

export function AvatarBadgeDemo() {
  return (
    <Avatar shape="rounded">
      <AvatarImage alt="Ava" src="https://avatars.githubusercontent.com/u/61243523?v=4" />
      <AvatarFallback>AV</AvatarFallback>
      <AvatarBadge />
    </Avatar>
  );
}`;

function AvatarBadgeExample() {
  return (
    <Avatar className="size-16" shape="rounded">
      <AvatarImage
        alt="Ava"
        src="https://avatars.githubusercontent.com/u/61243523?v=4"
      />
      <AvatarFallback>AV</AvatarFallback>
      <AvatarBadge />
    </Avatar>
  );
}

const avatarProfileCardExampleCode = `import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

export function AvatarProfileCardDemo() {
  return (
    <Card className="w-80">
      <CardContent className="flex items-center gap-3">
        <Avatar>
          <AvatarImage alt="Ava" src="https://avatars.githubusercontent.com/u/61243523?v=4" />
          <AvatarFallback>AV</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">Ava Brooks</p>
          <p className="text-muted-foreground">Design Systems</p>
        </div>
      </CardContent>
    </Card>
  );
}`;

function AvatarProfileCardExample() {
  return (
    <Card className="w-80">
      <CardContent className="flex items-center gap-3">
        <Avatar className="size-12">
          <AvatarImage
            alt="Ava"
            src="https://avatars.githubusercontent.com/u/61243523?v=4"
          />
          <AvatarFallback>AV</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">Ava Brooks</p>
          <p className="text-muted-foreground">Design Systems</p>
        </div>
      </CardContent>
    </Card>
  );
}

const ditherIdentityGridExampleCode = `import { DitherAvatar } from "@/components/ui/dither-avatar";

const identities = [
  { hash: "sunlace", dotScale: 1 },
  { hash: "interface", dotScale: 2 },
  { hash: "system", dotScale: 3 },
  { hash: "token", dotScale: 1 },
  { hash: "motion", dotScale: 2 },
  { hash: "craft", dotScale: 3 },
];

export function DitherIdentityGridDemo() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {identities.map((identity) => (
        <div className="flex flex-col items-center gap-2" key={identity.hash}>
          <DitherAvatar
            className="size-12"
            dotScale={identity.dotScale}
            hash={identity.hash}
          />
          <span className="text-xs text-muted-foreground">{identity.hash}</span>
        </div>
      ))}
    </div>
  );
}`;

function DitherIdentityGridExample() {
  const identities = [
    { hash: "sunlace", dotScale: 1 },
    { hash: "interface", dotScale: 2 },
    { hash: "system", dotScale: 3 },
    { hash: "token", dotScale: 1 },
    { hash: "motion", dotScale: 2 },
    { hash: "craft", dotScale: 3 },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {identities.map((identity) => (
        <div className="flex flex-col items-center gap-2" key={identity.hash}>
          <DitherAvatar
            className="size-12"
            dotScale={identity.dotScale}
            hash={identity.hash}
          />
          <span className="text-xs text-muted-foreground">{identity.hash}</span>
        </div>
      ))}
    </div>
  );
}

const ditherWalletListExampleCode = `import { DitherAvatar } from "@/components/ui/dither-avatar";

const wallets = [
  { hash: "medhy.eth", label: "medhy.eth", dotScale: 1 },
  { hash: "0x742d35cc6634c0532925a3b844bc454e4438f44e", label: "0x742...44e", dotScale: 2 },
  { hash: "vitalik.eth", label: "vitalik.eth", dotScale: 3 },
];

export function DitherWalletListDemo() {
  return (
    <div className="w-80 space-y-3">
      {wallets.map((wallet) => (
        <div className="flex items-center gap-3" key={wallet.hash}>
          <DitherAvatar
            className="size-10"
            dotScale={wallet.dotScale}
            hash={wallet.hash}
          />
          <span className="font-mono text-sm">{wallet.label}</span>
        </div>
      ))}
    </div>
  );
}`;

function DitherWalletListExample() {
  const wallets = [
    { hash: "medhy.eth", label: "medhy.eth", dotScale: 1 },
    {
      hash: "0x742d35cc6634c0532925a3b844bc454e4438f44e",
      label: "0x742...44e",
      dotScale: 2,
    },
    { hash: "vitalik.eth", label: "vitalik.eth", dotScale: 3 },
  ];

  return (
    <div className="w-80 space-y-3">
      {wallets.map((wallet) => (
        <div className="flex items-center gap-3" key={wallet.hash}>
          <DitherAvatar
            className="size-10"
            dotScale={wallet.dotScale}
            hash={wallet.hash}
          />
          <span className="font-mono text-sm">{wallet.label}</span>
        </div>
      ))}
    </div>
  );
}

function UiComponent() {
  const { component } = Route.useParams();
  const [accordionSettings, setAccordionSettings] = useState({
    borders: false,
    multiple: false,
    showArrow: true,
    underline: true,
  });
  const [avatarSettings, setAvatarSettings] = useState<
    NonNullable<ComponentSettings["avatar"]>
  >({
    shape: "circle",
  });
  const [ditherAvatarSettings, setDitherAvatarSettings] = useState<
    NonNullable<ComponentSettings["ditherAvatar"]>
  >({
    dotScale: 1,
    shape: "circle",
  });
  const [cardSettings, setCardSettings] = useState<
    NonNullable<ComponentSettings["card"]>
  >({
    showAction: false,
    showFooter: true,
    size: "default",
  });
  const activeComponent = isComponentSlug(component)
    ? (componentBySlug.get(component) ?? componentBySlug.get("accordion"))
    : componentBySlug.get("accordion");

  if (!activeComponent) {
    throw new Error("accordion component metadata is missing");
  }

  const title = activeComponent.label;
  const importCode =
    activeComponent.slug === "accordion"
      ? `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";`
      : activeComponent.slug === "avatar"
        ? `import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";`
        : activeComponent.slug === "dither-avatar"
          ? `import { DitherAvatar } from "@/components/ui/dither-avatar";`
          : activeComponent.slug === "badge"
            ? `import { Badge } from "@/components/ui/badge";`
            : activeComponent.slug === "button"
              ? `import { Button } from "@/components/ui/button";`
              : activeComponent.slug === "card"
                ? `import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";`
                : `import { ${toPascalCase(title)} } from "@/components/ui/${activeComponent.slug}";`;
  const usageCode =
    activeComponent.slug === "accordion"
      ? `<Accordion defaultValue={["item-1"]}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It follows accessible disclosure behavior.
    </AccordionContent>
  </AccordionItem>
</Accordion>`
      : activeComponent.slug === "avatar"
        ? `<AvatarGroup>
  <Avatar>
    <AvatarImage alt="Ava" src="https://avatars.githubusercontent.com/u/61243523?v=4" />
    <AvatarFallback>AV</AvatarFallback>
    <AvatarBadge />
  </Avatar>
  <Avatar>
    <AvatarFallback>SL</AvatarFallback>
  </Avatar>
  <AvatarGroupCount>+4</AvatarGroupCount>
</AvatarGroup>`
        : activeComponent.slug === "dither-avatar"
          ? `<div className="flex items-center gap-3">
  <DitherAvatar hash="sunlace" />
  <DitherAvatar hash="ui" />
</div>`
          : activeComponent.slug === "badge"
            ? `<div className="flex gap-2">
  <Badge>Default</Badge>
  <Badge variant="outline">Outline</Badge>
  <Badge variant="success">Success</Badge>
  <Badge variant="warning">Warning</Badge>
</div>`
            : activeComponent.slug === "button"
              ? `<div className="flex gap-2">
  <Button>Continue</Button>
  <Button variant="outline">Cancel</Button>
</div>`
              : activeComponent.slug === "card"
                ? `<Card className="w-full max-w-sm">
  <CardHeader>
    <CardTitle>Workspace</CardTitle>
    <CardDescription>Grouped content with actions and detail.</CardDescription>
  </CardHeader>
  <CardContent>Card body content.</CardContent>
  <CardFooter className="justify-end gap-2">
    <Button variant="outline">Cancel</Button>
    <Button>Continue</Button>
  </CardFooter>
</Card>`
                : `<${toPascalCase(title)} />`;
  const settings: ComponentSettings = {
    accordion: accordionSettings,
    avatar: avatarSettings,
    card: cardSettings,
    ditherAvatar: ditherAvatarSettings,
  };
  const propGroups =
    componentPropGroups[
      activeComponent.slug as keyof typeof componentPropGroups
    ] ?? [];
  const tocItems = useMemo(() => {
    const items = [
      { id: "showcase", label: "Showcase" },
      { id: "installation", label: "Installation" },
      { id: "usage", label: "Usage" },
    ];

    if (
      activeComponent.slug === "accordion" ||
      activeComponent.slug === "avatar" ||
      activeComponent.slug === "badge" ||
      activeComponent.slug === "button" ||
      activeComponent.slug === "card" ||
      activeComponent.slug === "dither-avatar"
    ) {
      items.push({ id: "examples", label: "Examples" });
    }

    items.push({ id: "props", label: "Props" });

    return items;
  }, [activeComponent.slug]);

  useEffect(() => {
    setAccordionSettings({
      borders: false,
      multiple: false,
      showArrow: true,
      underline: true,
    });
    setAvatarSettings({
      shape: "circle",
    });
    setDitherAvatarSettings({
      dotScale: 1,
      shape: "circle",
    });
    setCardSettings({
      showAction: false,
      showFooter: true,
      size: "default",
    });
  }, [activeComponent.slug]);

  const controls =
    activeComponent.slug === "accordion" ? (
      <div className="space-y-4 text-xs">
        <div className="flex items-center gap-2 border-border border-b pb-3 font-medium text-foreground">
          <HugeiconsIcon
            aria-hidden
            icon={Settings03Icon}
            size={14}
            strokeWidth={2}
          />
          Settings
        </div>

        <div className="space-y-2">
          <p className="font-medium text-foreground">Accordion</p>
          <div className="space-y-1.5 rounded-md bg-muted/40 p-2.5">
            <label className="flex items-center justify-between gap-3 text-muted-foreground">
              Multiple
              <Switch
                checked={accordionSettings.multiple}
                onCheckedChange={(checked) => {
                  setAccordionSettings((current) => ({
                    ...current,
                    multiple: checked,
                  }));
                }}
                size="sm"
              />
            </label>
            <label className="flex items-center justify-between gap-3 text-muted-foreground">
              Borders
              <Switch
                checked={accordionSettings.borders}
                onCheckedChange={(checked) => {
                  setAccordionSettings((current) => ({
                    ...current,
                    borders: checked,
                  }));
                }}
                size="sm"
              />
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <p className="font-medium text-foreground">AccordionTrigger</p>
          <div className="rounded-md bg-muted/40 p-2.5">
            <div className="space-y-1.5">
              <label className="flex items-center justify-between gap-3 text-muted-foreground">
                Show Arrow
                <Switch
                  checked={accordionSettings.showArrow}
                  onCheckedChange={(checked) => {
                    setAccordionSettings((current) => ({
                      ...current,
                      showArrow: checked,
                    }));
                  }}
                  size="sm"
                />
              </label>
              <label className="flex items-center justify-between gap-3 text-muted-foreground">
                Underline
                <Switch
                  checked={accordionSettings.underline}
                  onCheckedChange={(checked) => {
                    setAccordionSettings((current) => ({
                      ...current,
                      underline: checked,
                    }));
                  }}
                  size="sm"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    ) : activeComponent.slug === "avatar" ||
      activeComponent.slug === "dither-avatar" ? (
      <div className="space-y-4 text-xs">
        <div className="flex items-center gap-2 border-border border-b pb-3 font-medium text-foreground">
          <HugeiconsIcon
            aria-hidden
            icon={Settings03Icon}
            size={14}
            strokeWidth={2}
          />
          Settings
        </div>

        <div className="space-y-2">
          <p className="font-medium text-foreground">{title}</p>
          <div className="rounded-md bg-muted/40 p-2.5">
            <label className="flex items-center justify-between gap-3 text-muted-foreground">
              Shape
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="min-w-24 justify-between"
                  render={<Button size="sm" variant="outline" />}
                >
                  {(activeComponent.slug === "avatar"
                    ? avatarSettings.shape
                    : ditherAvatarSettings.shape
                  )
                    .charAt(0)
                    .toUpperCase() +
                    (activeComponent.slug === "avatar"
                      ? avatarSettings.shape
                      : ditherAvatarSettings.shape
                    ).slice(1)}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuRadioGroup
                    value={
                      activeComponent.slug === "avatar"
                        ? avatarSettings.shape
                        : ditherAvatarSettings.shape
                    }
                    onValueChange={(shape) => {
                      if (activeComponent.slug === "avatar") {
                        setAvatarSettings({
                          shape: shape as NonNullable<
                            ComponentSettings["avatar"]
                          >["shape"],
                        });
                        return;
                      }

                      setDitherAvatarSettings((current) => ({
                        ...current,
                        shape: shape as NonNullable<
                          ComponentSettings["ditherAvatar"]
                        >["shape"],
                      }));
                    }}
                  >
                    <DropdownMenuRadioItem value="circle">
                      Circle
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="rounded">
                      Rounded
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="square">
                      Square
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </label>
            {activeComponent.slug === "dither-avatar" ? (
              <label className="mt-1.5 flex items-center justify-between gap-3 text-muted-foreground">
                Dots
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className="min-w-24 justify-between"
                    render={<Button size="sm" variant="outline" />}
                  >
                    {ditherAvatarSettings.dotScale}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuRadioGroup
                      value={String(ditherAvatarSettings.dotScale)}
                      onValueChange={(dotScale) => {
                        setDitherAvatarSettings((current) => ({
                          ...current,
                          dotScale: Number(dotScale) as NonNullable<
                            ComponentSettings["ditherAvatar"]
                          >["dotScale"],
                        }));
                      }}
                    >
                      <DropdownMenuRadioItem value="1">1</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="2">2</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="3">3</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="4">4</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="5">5</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </label>
            ) : null}
          </div>
        </div>
      </div>
    ) : activeComponent.slug === "card" ? (
      <div className="space-y-4 text-xs">
        <div className="flex items-center gap-2 border-border border-b pb-3 font-medium text-foreground">
          <HugeiconsIcon
            aria-hidden
            icon={Settings03Icon}
            size={14}
            strokeWidth={2}
          />
          Settings
        </div>

        <div className="space-y-2">
          <p className="font-medium text-foreground">Card</p>
          <div className="space-y-1.5 rounded-md bg-muted/40 p-2.5">
            <label className="flex items-center justify-between gap-3 text-muted-foreground">
              Size
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="min-w-24 justify-between"
                  render={<Button size="sm" variant="outline" />}
                >
                  {cardSettings.size.charAt(0).toUpperCase() +
                    cardSettings.size.slice(1)}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuRadioGroup
                    value={cardSettings.size}
                    onValueChange={(size) => {
                      setCardSettings((current) => ({
                        ...current,
                        size: size as NonNullable<
                          ComponentSettings["card"]
                        >["size"],
                      }));
                    }}
                  >
                    <DropdownMenuRadioItem value="default">
                      Default
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="sm">Sm</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </label>
            <label className="flex items-center justify-between gap-3 text-muted-foreground">
              Footer
              <Switch
                checked={cardSettings.showFooter}
                onCheckedChange={(checked) => {
                  setCardSettings((current) => ({
                    ...current,
                    showFooter: checked,
                  }));
                }}
                size="sm"
              />
            </label>
            <label className="flex items-center justify-between gap-3 text-muted-foreground">
              Action
              <Switch
                checked={cardSettings.showAction}
                onCheckedChange={(checked) => {
                  setCardSettings((current) => ({
                    ...current,
                    showAction: checked,
                  }));
                }}
                size="sm"
              />
            </label>
          </div>
        </div>
      </div>
    ) : null;

  return (
    <ShowcaseLayout activeSlug={activeComponent.slug} tocItems={tocItems}>
      <article className="scroll-mt-7 pt-7 pb-10 lg:px-16" id="showcase">
        <div className="text-sm font-medium text-muted-foreground">
          Components <span className="px-2">›</span>
          <span className="text-foreground">{title}</span>
        </div>

        <div className="mt-6 space-y-4">
          <h1 className="text-4xl font-semibold tracking-normal capitalize">
            {title}
          </h1>
          <p className="max-w-3xl text-lg text-muted-foreground">
            {activeComponent.slug === "accordion"
              ? "A vertically stacked set of interactive headings that each reveal a section of content."
              : activeComponent.slug === "avatar"
                ? "A compact identity surface for people, teams, status, and stacked presence."
                : activeComponent.slug === "badge"
                  ? "A compact label for status, metadata, and low-friction emphasis."
                  : activeComponent.slug === "button"
                    ? "A clickable action control with variants for hierarchy, semantics, sizing, and icon-only usage."
                    : activeComponent.slug === "card"
                      ? "A bordered surface for grouped content, header actions, body detail, and footer controls."
                      : activeComponent.slug === "dither-avatar"
                        ? "A deterministic dithered identity surface generated from any string."
                        : "Temporary component preview while the docs system is shaped."}
          </p>
          <div className="flex gap-2">
            <Button variant="outline">Docs</Button>
            <Button variant="outline">Component API</Button>
          </div>
        </div>

        <div className="mt-12">
          <ShowcaseExample
            code={getComponentExampleCode(activeComponent.slug, settings)}
            controls={controls}
            preview={
              <ComponentPreview
                component={activeComponent.slug}
                settings={settings}
              />
            }
            resetKey={activeComponent.slug}
          />
        </div>

        <section className="mt-12 scroll-mt-7" id="installation">
          <h2 className="border-b border-border pb-4 text-2xl font-semibold">
            Installation
          </h2>
          <pre className="mt-6 overflow-x-auto rounded-lg border border-border bg-muted/30 p-6 font-mono text-sm text-muted-foreground">
            <code>{`bunx --bun shadcn@latest add ${activeComponent.slug} --cwd packages/ui`}</code>
          </pre>
        </section>

        <section className="mt-12 scroll-mt-7" id="usage">
          <h2 className="border-b border-border pb-4 text-2xl font-semibold">
            Usage
          </h2>
          <div className="mt-6 grid gap-4">
            <div className="overflow-hidden rounded-lg border border-border bg-muted/30">
              <CodeBlock code={importCode} />
            </div>
            <div className="overflow-hidden rounded-lg border border-border bg-muted/30">
              <CodeBlock code={usageCode} />
            </div>
          </div>
        </section>

        {activeComponent.slug === "accordion" ||
        activeComponent.slug === "avatar" ||
        activeComponent.slug === "badge" ||
        activeComponent.slug === "button" ||
        activeComponent.slug === "card" ||
        activeComponent.slug === "dither-avatar" ? (
          <section className="mt-12 scroll-mt-7" id="examples">
            <h2 className="border-b border-border pb-4 text-2xl font-semibold">
              Examples
            </h2>
            {activeComponent.slug === "accordion" ? (
              <div className="mt-6">
                <p className="mb-3 text-base font-medium text-foreground">
                  Card Wrapped Accordion
                </p>
                <ShowcaseExample
                  code={accordionCardExampleCode}
                  preview={
                    <div className="w-[28rem] max-w-full">
                      <AccordionCardExample />
                    </div>
                  }
                  resetKey="accordion-card-example"
                />
              </div>
            ) : activeComponent.slug === "avatar" ? (
              <div className="mt-6 space-y-8">
                <div>
                  <p className="mb-3 text-base font-medium text-foreground">
                    Avatar Group
                  </p>
                  <ShowcaseExample
                    code={avatarGroupExampleCode}
                    preview={<AvatarGroupExample />}
                    resetKey="avatar-group-example"
                  />
                </div>
                <div>
                  <p className="mb-3 text-base font-medium text-foreground">
                    Avatar Badge
                  </p>
                  <ShowcaseExample
                    code={avatarBadgeExampleCode}
                    preview={<AvatarBadgeExample />}
                    resetKey="avatar-badge-example"
                  />
                </div>
                <div>
                  <p className="mb-3 text-base font-medium text-foreground">
                    Profile Card
                  </p>
                  <ShowcaseExample
                    code={avatarProfileCardExampleCode}
                    preview={<AvatarProfileCardExample />}
                    resetKey="avatar-profile-card-example"
                  />
                </div>
              </div>
            ) : activeComponent.slug === "badge" ? (
              <div className="mt-6">
                <p className="mb-3 text-base font-medium text-foreground">
                  Status Badges
                </p>
                <ShowcaseExample
                  code={badgeStatusExampleCode}
                  preview={<BadgeStatusExample />}
                  resetKey="badge-status-example"
                />
              </div>
            ) : activeComponent.slug === "button" ? (
              <div className="mt-6 space-y-8">
                <div>
                  <p className="mb-3 text-base font-medium text-foreground">
                    Action Variants
                  </p>
                  <ShowcaseExample
                    code={buttonVariantExampleCode}
                    preview={<ButtonVariantExample />}
                    resetKey="button-variant-example"
                  />
                </div>
                <div>
                  <p className="mb-3 text-base font-medium text-foreground">
                    Intent Variants
                  </p>
                  <ShowcaseExample
                    code={buttonIntentExampleCode}
                    preview={<ButtonIntentExample />}
                    resetKey="button-intent-example"
                  />
                </div>
              </div>
            ) : activeComponent.slug === "card" ? (
              <div className="mt-6 space-y-8">
                <div>
                  <p className="mb-3 text-base font-medium text-foreground">
                    Metric Card
                  </p>
                  <ShowcaseExample
                    code={cardMetricExampleCode}
                    preview={<CardMetricExample />}
                    resetKey="card-metric-example"
                  />
                </div>
                <div>
                  <p className="mb-3 text-base font-medium text-foreground">
                    Billing Card
                  </p>
                  <ShowcaseExample
                    code={cardBillingExampleCode}
                    preview={<CardBillingExample />}
                    resetKey="card-billing-example"
                  />
                </div>
                <div>
                  <p className="mb-3 text-base font-medium text-foreground">
                    Activity Card
                  </p>
                  <ShowcaseExample
                    code={cardActivityExampleCode}
                    preview={<CardActivityExample />}
                    resetKey="card-activity-example"
                  />
                </div>
              </div>
            ) : (
              <div className="mt-6 space-y-8">
                <div>
                  <p className="mb-3 text-base font-medium text-foreground">
                    Identity Grid
                  </p>
                  <ShowcaseExample
                    code={ditherIdentityGridExampleCode}
                    preview={<DitherIdentityGridExample />}
                    resetKey="dither-identity-grid-example"
                  />
                </div>
                <div>
                  <p className="mb-3 text-base font-medium text-foreground">
                    Wallet List
                  </p>
                  <ShowcaseExample
                    code={ditherWalletListExampleCode}
                    preview={<DitherWalletListExample />}
                    resetKey="dither-wallet-list-example"
                  />
                </div>
              </div>
            )}
          </section>
        ) : null}

        <section className="mt-12 scroll-mt-7" id="props">
          <h2 className="border-b border-border pb-4 text-2xl font-semibold">
            Props
          </h2>
          <div className="mt-6 space-y-8">
            {propGroups.length > 0 ? (
              propGroups.map((group) => (
                <div className="space-y-3" key={group.title}>
                  <h3 className="text-base font-medium text-foreground">
                    {group.title}
                  </h3>
                  <div className="showcase-scrollbar overflow-x-auto rounded-lg border border-border">
                    <table className="w-full min-w-[720px] text-left text-sm">
                      <thead className="bg-muted/30 text-muted-foreground">
                        <tr>
                          <th className="px-4 py-3 font-medium">Prop</th>
                          <th className="px-4 py-3 font-medium">Type</th>
                          <th className="px-4 py-3 font-medium">Default</th>
                          <th className="px-4 py-3 font-medium">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {group.props.map((prop) => (
                          <tr key={prop.name}>
                            <td className="px-4 py-3 font-mono text-foreground">
                              {prop.name}
                            </td>
                            <td className="px-4 py-3 font-mono text-muted-foreground">
                              {prop.type}
                            </td>
                            <td className="px-4 py-3 font-mono text-muted-foreground">
                              {prop.defaultValue}
                            </td>
                            <td className="px-4 py-3 text-muted-foreground">
                              {prop.description}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-lg border border-border px-4 py-3 text-sm text-muted-foreground">
                No custom props documented yet.
              </div>
            )}
          </div>
          {activeComponent.slug === "badge" ? (
            <p className="mt-3 text-sm text-muted-foreground">
              Also supports{" "}
              <a
                className="underline underline-offset-3 hover:text-foreground"
                href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/span"
                rel="noreferrer"
                target="_blank"
              >
                native span props
              </a>{" "}
              through the{" "}
              <a
                className="underline underline-offset-3 hover:text-foreground"
                href="https://base-ui.com/react/overview/composition"
                rel="noreferrer"
                target="_blank"
              >
                render API
              </a>
              .
            </p>
          ) : activeComponent.slug === "accordion" ||
            activeComponent.slug === "avatar" ||
            activeComponent.slug === "button" ? (
            <p className="mt-3 text-sm text-muted-foreground">
              Also supports Base UI {title.toLowerCase()} primitive props. See{" "}
              <a
                className="underline underline-offset-3 hover:text-foreground"
                href={`https://base-ui.com/react/components/${activeComponent.slug}`}
                rel="noreferrer"
                target="_blank"
              >
                Base UI {title}
              </a>
              .
            </p>
          ) : null}
        </section>
      </article>
    </ShowcaseLayout>
  );
}
