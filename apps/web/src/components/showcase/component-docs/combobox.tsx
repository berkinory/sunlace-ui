import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@sunlace/ui";

import type { ComponentDocDefinition } from "./types";

const showcaseCode = `import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

export function ComboboxDemo() {
  return (
    <Combobox>
      <ComboboxInput placeholder="Search component" />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxItem value="accordion">Accordion</ComboboxItem>
          <ComboboxItem value="button">Button</ComboboxItem>
          <ComboboxItem value="dialog">Dialog</ComboboxItem>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}`;

function Preview() {
  return (
    <Combobox>
      <ComboboxInput placeholder="Search component" />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxItem value="accordion">Accordion</ComboboxItem>
          <ComboboxItem value="button">Button</ComboboxItem>
          <ComboboxItem value="dialog">Dialog</ComboboxItem>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export const comboboxDocs: ComponentDocDefinition = {
  description: "A searchable input for selecting one value from a list.",
  getShowcaseCode: () => showcaseCode,
  importCode: `import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";`,
  renderPreview: () => <Preview />,
  usageCode: `<Combobox>
  <ComboboxInput placeholder="Search component" />
  <ComboboxContent>
    <ComboboxList>
      <ComboboxItem value="button">Button</ComboboxItem>
    </ComboboxList>
  </ComboboxContent>
</Combobox>`,
};
