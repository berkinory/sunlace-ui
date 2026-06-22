import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@sunlace/ui";

import type { ComponentSettings } from "../component-catalog";
import type { ComponentDocDefinition } from "./types";

const components = [
  { label: "Accordion", value: "accordion" },
  { label: "Button", value: "button" },
  { label: "Card", value: "card" },
  { label: "Checkbox", value: "checkbox" },
  { label: "Dialog", value: "dialog" },
];

const skills = [
  { label: "Accessibility", value: "accessibility" },
  { label: "Design Systems", value: "design-systems" },
  { label: "React", value: "react" },
  { label: "TypeScript", value: "typescript" },
  { label: "UI Engineering", value: "ui-engineering" },
];

const people = [
  {
    email: "maya@sunlace.dev",
    label: "Maya Chen",
    role: "Product Designer",
    value: "maya",
  },
  {
    email: "noah@sunlace.dev",
    label: "Noah Williams",
    role: "Frontend Engineer",
    value: "noah",
  },
  {
    email: "sara@sunlace.dev",
    label: "Sara Ahmed",
    role: "Design Engineer",
    value: "sara",
  },
  {
    email: "theo@sunlace.dev",
    label: "Theo Martin",
    role: "Product Manager",
    value: "theo",
  },
];

function getShowcaseCode(settings?: ComponentSettings) {
  const combobox = settings?.combobox;

  return `import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

const components = [
  { label: "Accordion", value: "accordion" },
  { label: "Button", value: "button" },
  { label: "Card", value: "card" },
  { label: "Checkbox", value: "checkbox" },
  { label: "Dialog", value: "dialog" },
];

export function ComboboxDemo() {
  return (
    <Combobox items={components}${combobox?.autoHighlight === false ? "" : " autoHighlight"}${combobox?.disabled ? " disabled" : ""}>
      <ComboboxInput
        className="w-48"
        placeholder="Search component"${combobox?.disabled ? "\n        disabled" : ""}${combobox?.showClear ? "\n        showClear" : ""}${combobox?.showTrigger === false ? "\n        showTrigger={false}" : ""}
      />
      <ComboboxContent${combobox?.side === "top" ? ' side="top"' : ""}>
        <ComboboxList>
          {(component) => (
            <ComboboxItem key={component.value} value={component}>
              {component.label}
            </ComboboxItem>
          )}
        </ComboboxList>
        <ComboboxEmpty>No components found.</ComboboxEmpty>
      </ComboboxContent>
    </Combobox>
  );
}`;
}

const multipleCode = `import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";

const skills = [
  { label: "Accessibility", value: "accessibility" },
  { label: "Design Systems", value: "design-systems" },
  { label: "React", value: "react" },
  { label: "TypeScript", value: "typescript" },
  { label: "UI Engineering", value: "ui-engineering" },
];

export function SkillsComboboxDemo() {
  const anchor = useComboboxAnchor();

  return (
    <Combobox items={skills} multiple>
      <ComboboxChips className="w-72" ref={anchor}>
        <ComboboxValue>
          {(selectedSkills) => (
            <>
              {selectedSkills.map((skill) => (
                <ComboboxChip key={skill.value}>{skill.label}</ComboboxChip>
              ))}
              <ComboboxChipsInput placeholder="Add skills" />
            </>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxList>
          {(skill) => (
            <ComboboxItem key={skill.value} value={skill}>
              {skill.label}
            </ComboboxItem>
          )}
        </ComboboxList>
        <ComboboxEmpty>No skills found.</ComboboxEmpty>
      </ComboboxContent>
    </Combobox>
  );
}`;

const richResultsCode = `import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

const people = [
  {
    email: "maya@sunlace.dev",
    label: "Maya Chen",
    role: "Product Designer",
    value: "maya",
  },
  {
    email: "noah@sunlace.dev",
    label: "Noah Williams",
    role: "Frontend Engineer",
    value: "noah",
  },
  {
    email: "sara@sunlace.dev",
    label: "Sara Ahmed",
    role: "Design Engineer",
    value: "sara",
  },
];

export function PeopleComboboxDemo() {
  return (
    <Combobox
      items={people}
      itemToStringLabel={(person) => person.label}
    >
      <ComboboxInput className="w-64" placeholder="Search people" />
      <ComboboxContent>
        <ComboboxList>
          {(person) => (
            <ComboboxItem key={person.value} value={person}>
              <span className="grid min-w-0">
                <span className="font-medium">{person.label}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {person.role} · {person.email}
                </span>
              </span>
            </ComboboxItem>
          )}
        </ComboboxList>
        <ComboboxEmpty>No people found.</ComboboxEmpty>
      </ComboboxContent>
    </Combobox>
  );
}`;

function renderPreview(settings?: ComponentSettings) {
  const combobox = settings?.combobox;

  return (
    <Combobox
      autoHighlight={combobox?.autoHighlight}
      disabled={combobox?.disabled}
      items={components}
    >
      <ComboboxInput
        className="w-48"
        disabled={combobox?.disabled}
        placeholder="Search component"
        showClear={combobox?.showClear}
        showTrigger={combobox?.showTrigger}
      />
      <ComboboxContent side={combobox?.side}>
        <ComboboxList>
          {(component) => (
            <ComboboxItem key={component.value} value={component}>
              {component.label}
            </ComboboxItem>
          )}
        </ComboboxList>
        <ComboboxEmpty>No components found.</ComboboxEmpty>
      </ComboboxContent>
    </Combobox>
  );
}

function MultipleExample() {
  const anchor = useComboboxAnchor();

  return (
    <Combobox items={skills} multiple>
      <ComboboxChips className="w-72 max-w-full" ref={anchor}>
        <ComboboxValue>
          {(selectedSkills: typeof skills) => (
            <>
              {selectedSkills.map((skill) => (
                <ComboboxChip key={skill.value}>{skill.label}</ComboboxChip>
              ))}
              <ComboboxChipsInput placeholder="Add skills" />
            </>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxList>
          {(skill) => (
            <ComboboxItem key={skill.value} value={skill}>
              {skill.label}
            </ComboboxItem>
          )}
        </ComboboxList>
        <ComboboxEmpty>No skills found.</ComboboxEmpty>
      </ComboboxContent>
    </Combobox>
  );
}

function RichResultsExample() {
  return (
    <Combobox
      itemToStringLabel={(person: (typeof people)[number]) => person.label}
      items={people}
    >
      <ComboboxInput className="w-64" placeholder="Search people" />
      <ComboboxContent>
        <ComboboxList>
          {(person) => (
            <ComboboxItem key={person.value} value={person}>
              <span className="grid min-w-0">
                <span className="font-medium">{person.label}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {person.role} · {person.email}
                </span>
              </span>
            </ComboboxItem>
          )}
        </ComboboxList>
        <ComboboxEmpty>No people found.</ComboboxEmpty>
      </ComboboxContent>
    </Combobox>
  );
}

export const comboboxDocs: ComponentDocDefinition = {
  description:
    "A searchable selection control with filtering and keyboard navigation.",
  examples: [
    {
      code: multipleCode,
      preview: <MultipleExample />,
      resetKey: "combobox-multiple-example",
      title: "Multiple selection",
    },
    {
      code: richResultsCode,
      preview: <RichResultsExample />,
      resetKey: "combobox-rich-results-example",
      title: "Rich search results",
    },
  ],
  getShowcaseCode,
  importCode: `import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";`,
  primitiveDocsUrl: "https://base-ui.com/react/components/combobox",
  props: [
    {
      title: "Combobox",
      props: [
        {
          name: "items",
          type: "Item[]",
          defaultValue: "[]",
          description:
            "Provides the collection used for rendering and automatic filtering.",
        },
        {
          name: "multiple",
          type: "boolean",
          defaultValue: "false",
          description: "Allows more than one item to be selected.",
        },
        {
          name: "autoHighlight",
          type: "boolean",
          defaultValue: "false",
          description: "Highlights the first matching item while filtering.",
        },
        {
          name: "value",
          type: "Item | Item[] | null",
          defaultValue: "-",
          description: "Controls the selected item or items.",
        },
        {
          name: "onValueChange",
          type: "(value: Item | Item[] | null) => void",
          defaultValue: "-",
          description: "Runs when the selection changes.",
        },
        {
          name: "itemToStringLabel",
          type: "(item: Item) => string",
          defaultValue: "-",
          description: "Returns the text displayed for an object item.",
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
          description: "Prevents input, selection, and popup interaction.",
        },
      ],
    },
    {
      title: "ComboboxInput",
      props: [
        {
          name: "showTrigger",
          type: "boolean",
          defaultValue: "true",
          description: "Shows the popup trigger inside the input.",
        },
        {
          name: "showClear",
          type: "boolean",
          defaultValue: "false",
          description: "Shows a clear action when a value is selected.",
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
          description: "Disables the input and its inline actions.",
        },
      ],
    },
    {
      title: "ComboboxContent",
      props: [
        {
          name: "side",
          type: '"top" | "bottom" | "left" | "right"',
          defaultValue: '"bottom"',
          description: "Sets the preferred side of the popup.",
        },
        {
          name: "align",
          type: '"start" | "center" | "end"',
          defaultValue: '"start"',
          description: "Aligns the popup against its anchor.",
        },
        {
          name: "sideOffset",
          type: "number",
          defaultValue: "6",
          description: "Sets the distance between the input and popup.",
        },
      ],
    },
    {
      title: "ComboboxChip",
      props: [
        {
          name: "showRemove",
          type: "boolean",
          defaultValue: "true",
          description: "Shows the chip remove action.",
        },
      ],
    },
  ],
  renderPreview,
  usageCode: `<Combobox items={components}>
  <ComboboxInput className="w-48" placeholder="Search component" />
  <ComboboxContent>
    <ComboboxList>
      {(component) => (
        <ComboboxItem key={component.value} value={component}>
          {component.label}
        </ComboboxItem>
      )}
    </ComboboxList>
    <ComboboxEmpty>No components found.</ComboboxEmpty>
  </ComboboxContent>
</Combobox>`,
};
