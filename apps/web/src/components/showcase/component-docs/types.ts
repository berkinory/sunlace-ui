import type { ReactNode } from "react";

import type { ComponentSettings } from "../component-catalog";

export type ComponentProp = {
  defaultValue: string;
  description: string;
  name: string;
  type: string;
};

export type ComponentPropGroup = {
  props: ComponentProp[];
  title: string;
};

export type ComponentDocExample = {
  code: string;
  preview: ReactNode;
  resetKey: string;
  title: string;
};

export type ComponentDocDefinition = {
  description: string;
  examples?: ComponentDocExample[];
  getShowcaseCode: (settings?: ComponentSettings) => string;
  importCode: string;
  primitiveDocsUrl?: string;
  props?: ComponentPropGroup[];
  renderPreview: (settings?: ComponentSettings) => ReactNode;
  usageCode: string;
};
