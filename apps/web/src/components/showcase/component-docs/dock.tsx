import {
  AlignLeftIcon,
  AlignRightIcon,
  Calendar02Icon,
  CropIcon,
  Home05Icon,
  Image02Icon,
  Mail02Icon,
  MusicNote02Icon,
  Redo02Icon,
  Settings03Icon,
  SparklesIcon,
  Undo02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Dock, DockItem, DockSeparator } from "@sunlace/ui";
import { useState } from "react";

import type { ComponentDocDefinition } from "./types";

const showcaseCode = `import {
  Calendar02Icon,
  Home05Icon,
  Mail02Icon,
  MusicNote02Icon,
  Settings03Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Dock, DockItem, DockSeparator } from "@/components/ui/dock";
import { useState } from "react";

export function DockDemo() {
  const [active, setActive] = useState("home");

  return (
    <Dock>
      <DockItem
        id="home"
        active={active === "home"}
        onClick={() => setActive("home")}
        aria-label="Home"
      >
        <HugeiconsIcon icon={Home05Icon} className="size-5" />
      </DockItem>
      <DockItem
        id="mail"
        active={active === "mail"}
        onClick={() => setActive("mail")}
        aria-label="Mail"
      >
        <HugeiconsIcon icon={Mail02Icon} className="size-5" />
      </DockItem>
      <DockItem
        id="calendar"
        active={active === "calendar"}
        onClick={() => setActive("calendar")}
        aria-label="Calendar"
      >
        <HugeiconsIcon icon={Calendar02Icon} className="size-5" />
      </DockItem>
      <DockItem
        id="music"
        active={active === "music"}
        onClick={() => setActive("music")}
        aria-label="Music"
      >
        <HugeiconsIcon icon={MusicNote02Icon} className="size-5" />
      </DockItem>
      <DockItem
        id="discover"
        active={active === "discover"}
        onClick={() => setActive("discover")}
        aria-label="Discover"
      >
        <HugeiconsIcon icon={SparklesIcon} className="size-5" />
      </DockItem>
      <DockSeparator />
      <DockItem
        id="settings"
        active={active === "settings"}
        onClick={() => setActive("settings")}
        aria-label="Settings"
      >
        <HugeiconsIcon icon={Settings03Icon} className="size-5" />
      </DockItem>
    </Dock>
  );
}`;

function Preview() {
  const [active, setActive] = useState("home");

  const items = [
    { id: "home", icon: Home05Icon, label: "Home" },
    { id: "mail", icon: Mail02Icon, label: "Mail" },
    { id: "calendar", icon: Calendar02Icon, label: "Calendar" },
    { id: "music", icon: MusicNote02Icon, label: "Music" },
    { id: "discover", icon: SparklesIcon, label: "Discover" },
  ];

  return (
    <Dock defaultActiveId="home">
      {items.map(({ id, icon, label }) => (
        <DockItem
          active={active === id}
          aria-label={label}
          id={id}
          key={id}
          onClick={() => setActive(id)}
        >
          <HugeiconsIcon className="size-5" icon={icon} />
        </DockItem>
      ))}
      <DockSeparator />
      <DockItem
        active={active === "settings"}
        aria-label="Settings"
        id="settings"
        onClick={() => setActive("settings")}
      >
        <HugeiconsIcon className="size-5" icon={Settings03Icon} />
      </DockItem>
    </Dock>
  );
}

const toolbarCode = `import {
  AlignLeftIcon,
  AlignRightIcon,
  CropIcon,
  Image02Icon,
  Redo02Icon,
  Undo02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Dock, DockItem, DockSeparator } from "@/components/ui/dock";
import { useState } from "react";

export function EditorToolbar() {
  const [active, setActive] = useState("align-left");

  return (
    <Dock defaultActiveId="align-left" size={36}>
      <DockItem
        id="undo"
        aria-label="Undo"
        onClick={() => setActive("undo")}
        active={active === "undo"}
      >
        <HugeiconsIcon icon={Undo02Icon} className="size-4" />
      </DockItem>
      <DockItem
        id="redo"
        aria-label="Redo"
        onClick={() => setActive("redo")}
        active={active === "redo"}
      >
        <HugeiconsIcon icon={Redo02Icon} className="size-4" />
      </DockItem>
      <DockSeparator />
      <DockItem
        id="align-left"
        aria-label="Align left"
        onClick={() => setActive("align-left")}
        active={active === "align-left"}
      >
        <HugeiconsIcon icon={AlignLeftIcon} className="size-4" />
      </DockItem>
      <DockItem
        id="align-right"
        aria-label="Align right"
        onClick={() => setActive("align-right")}
        active={active === "align-right"}
      >
        <HugeiconsIcon icon={AlignRightIcon} className="size-4" />
      </DockItem>
      <DockSeparator />
      <DockItem
        id="crop"
        aria-label="Crop"
        onClick={() => setActive("crop")}
        active={active === "crop"}
      >
        <HugeiconsIcon icon={CropIcon} className="size-4" />
      </DockItem>
      <DockItem
        id="image"
        aria-label="Image"
        onClick={() => setActive("image")}
        active={active === "image"}
      >
        <HugeiconsIcon icon={Image02Icon} className="size-4" />
      </DockItem>
    </Dock>
  );
}`;

function ToolbarExample() {
  const [active, setActive] = useState("align-left");

  const tools = [
    { id: "undo", icon: Undo02Icon, label: "Undo" },
    { id: "redo", icon: Redo02Icon, label: "Redo" },
  ];
  const align = [
    { id: "align-left", icon: AlignLeftIcon, label: "Align left" },
    { id: "align-right", icon: AlignRightIcon, label: "Align right" },
  ];
  const media = [
    { id: "crop", icon: CropIcon, label: "Crop" },
    { id: "image", icon: Image02Icon, label: "Image" },
  ];

  return (
    <Dock defaultActiveId="align-left" size={36}>
      {tools.map(({ id, icon, label }) => (
        <DockItem
          active={active === id}
          aria-label={label}
          id={id}
          key={id}
          onClick={() => setActive(id)}
        >
          <HugeiconsIcon className="size-4" icon={icon} />
        </DockItem>
      ))}
      <DockSeparator />
      {align.map(({ id, icon, label }) => (
        <DockItem
          active={active === id}
          aria-label={label}
          id={id}
          key={id}
          onClick={() => setActive(id)}
        >
          <HugeiconsIcon className="size-4" icon={icon} />
        </DockItem>
      ))}
      <DockSeparator />
      {media.map(({ id, icon, label }) => (
        <DockItem
          active={active === id}
          aria-label={label}
          id={id}
          key={id}
          onClick={() => setActive(id)}
        >
          <HugeiconsIcon className="size-4" icon={icon} />
        </DockItem>
      ))}
    </Dock>
  );
}

export const dockDocs: ComponentDocDefinition = {
  description: "A macOS-style dock with a gliding active pill.",
  examples: [
    {
      code: toolbarCode,
      preview: <ToolbarExample />,
      resetKey: "dock-toolbar-example",
      title: "Editor toolbar",
    },
  ],
  getShowcaseCode: () => showcaseCode,
  importCode: `import { Dock, DockItem, DockSeparator } from "@/components/ui/dock";`,
  props: [
    {
      title: "Dock",
      props: [
        {
          name: "size",
          type: "number",
          defaultValue: "44",
          description: "Size of each dock item in pixels.",
        },
        {
          name: "defaultActiveId",
          type: "string",
          defaultValue: "-",
          description: "Sets the initially active item.",
        },
      ],
    },
    {
      title: "DockItem",
      props: [
        {
          name: "id",
          type: "string",
          defaultValue: "-",
          description: "Unique identifier for the active pill tracking.",
        },
        {
          name: "active",
          type: "boolean",
          defaultValue: "false",
          description: "Shows the active pill behind this item.",
        },
        {
          name: "onClick",
          type: "() => void",
          defaultValue: "-",
          description:
            "When set, the item renders as a button and triggers the active pill.",
        },
      ],
    },
  ],
  renderPreview: () => <Preview />,
  usageCode: `<Dock>
  <DockItem id="home" active onClick={() => {}}>
    <Icon />
  </DockItem>
  <DockSeparator />
  <DockItem id="settings" onClick={() => {}}>
    <Icon />
  </DockItem>
</Dock>`,
};
