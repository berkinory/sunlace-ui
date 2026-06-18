import { DitherAvatar } from "@sunlace/ui";

import type { ComponentSettings } from "../component-catalog";
import type { ComponentDocDefinition } from "./types";

const gridCode = `import { DitherAvatar } from "@/components/ui/dither-avatar";

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

const identities = [
  { hash: "sunlace", dotScale: 1 },
  { hash: "interface", dotScale: 2 },
  { hash: "system", dotScale: 3 },
  { hash: "token", dotScale: 1 },
  { hash: "motion", dotScale: 2 },
  { hash: "craft", dotScale: 3 },
] as const;

function GridExample() {
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

const listCode = `import { DitherAvatar } from "@/components/ui/dither-avatar";

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

const wallets = [
  { hash: "medhy.eth", label: "medhy.eth", dotScale: 1 },
  {
    hash: "0x742d35cc6634c0532925a3b844bc454e4438f44e",
    label: "0x742...44e",
    dotScale: 2,
  },
  { hash: "vitalik.eth", label: "vitalik.eth", dotScale: 3 },
] as const;

function ListExample() {
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

function renderPreview(settings?: ComponentSettings) {
  return (
    <div className="flex flex-col items-center gap-7">
      <div className="flex items-end gap-4">
        <DitherAvatar
          className="size-14"
          dotScale={settings?.ditherAvatar?.dotScale}
          hash="sunlace"
          shape={settings?.ditherAvatar?.shape}
        />
        <DitherAvatar
          className="size-14"
          dotScale={settings?.ditherAvatar?.dotScale}
          hash="ui"
          shape={settings?.ditherAvatar?.shape}
        />
      </div>
      <div className="flex gap-3">
        {["medhy.eth", "0x742…44e", "satoshi", "saira"].map((hash) => (
          <DitherAvatar
            className="size-10"
            dotScale={settings?.ditherAvatar?.dotScale}
            hash={hash}
            key={hash}
            shape={settings?.ditherAvatar?.shape}
          />
        ))}
      </div>
    </div>
  );
}

function getShowcaseCode(settings?: ComponentSettings) {
  const shape =
    settings?.ditherAvatar?.shape && settings.ditherAvatar.shape !== "circle"
      ? ` shape="${settings.ditherAvatar.shape}"`
      : "";
  const dotScale =
    settings?.ditherAvatar?.dotScale && settings.ditherAvatar.dotScale !== 1
      ? ` dotScale={${settings.ditherAvatar.dotScale}}`
      : "";

  return `import { DitherAvatar } from "@/components/ui/dither-avatar";

export function DitherAvatarDemo() {
  return (
    <div className="flex items-center gap-3">
      <DitherAvatar${shape}${dotScale} hash="sunlace" />
      <DitherAvatar${shape}${dotScale} hash="ui" />
    </div>
  );
}`;
}

export const ditherAvatarDocs: ComponentDocDefinition = {
  description:
    "A deterministic dithered identity surface generated from any string.",
  examples: [
    {
      code: gridCode,
      preview: <GridExample />,
      resetKey: "dither-identity-grid-example",
      title: "Identity Grid",
    },
    {
      code: listCode,
      preview: <ListExample />,
      resetKey: "dither-wallet-list-example",
      title: "Wallet List",
    },
  ],
  getShowcaseCode,
  importCode: `import { DitherAvatar } from "@/components/ui/dither-avatar";`,
  props: [
    {
      title: "DitherAvatar",
      props: [
        {
          name: "hash",
          type: "string",
          defaultValue: "-",
          description: "Seed string used to generate the deterministic image.",
        },
        {
          name: "shape",
          type: '"circle" | "rounded" | "square"',
          defaultValue: '"circle"',
          description: "Controls the avatar corner treatment.",
        },
        {
          name: "size",
          type: '"sm" | "default" | "lg"',
          defaultValue: '"default"',
          description: "Controls the avatar dimensions.",
        },
        {
          name: "dotScale",
          type: "number",
          defaultValue: "1",
          description: "Controls the dither cell size.",
        },
        {
          name: "tones",
          type: "HashvatarOptions['tones']",
          defaultValue: "-",
          description: "Restricts generated colors to selected tone families.",
        },
      ],
    },
  ],
  renderPreview,
  usageCode: `<div className="flex items-center gap-3">
  <DitherAvatar hash="sunlace" />
  <DitherAvatar hash="ui" />
</div>`,
};
