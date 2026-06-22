import { Button, Checkbox } from "@sunlace/ui";
import { useState } from "react";

import type { ComponentDocDefinition } from "./types";

const showcaseCode = `import { Checkbox } from "@/components/ui/checkbox";

export function CheckboxDemo() {
  return (
    <label className="flex items-center gap-3 text-sm">
      <Checkbox defaultChecked />
      Accept terms
    </label>
  );
}`;

const termsCode = `import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export function CheckboxTermsDemo() {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="grid w-80 gap-4">
      <label className="flex items-start gap-3">
        <Checkbox checked={accepted} onCheckedChange={setAccepted} />
        <span className="grid gap-1">
          <span className="font-medium">Accept terms</span>
          <span className="text-sm text-muted-foreground">
            I agree to the terms of service and privacy policy.
          </span>
        </span>
      </label>
      <Button disabled={!accepted}>Continue</Button>
    </div>
  );
}`;

function TermsExample() {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="grid w-80 gap-4">
      <label className="flex items-start gap-3">
        <Checkbox checked={accepted} onCheckedChange={setAccepted} />
        <span className="grid gap-1">
          <span className="font-medium">Accept terms</span>
          <span className="text-sm text-muted-foreground">
            I agree to the terms of service and privacy policy.
          </span>
        </span>
      </label>
      <Button disabled={!accepted}>Continue</Button>
    </div>
  );
}

const indeterminateCode = `import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";

const permissions = ["Billing", "Members", "Deployments"];

export function CheckboxIndeterminateDemo() {
  const [selected, setSelected] = useState([true, false, false]);
  const allSelected = selected.every(Boolean);
  const someSelected = selected.some(Boolean);

  return (
    <div className="grid w-64 gap-3">
      <label className="flex items-center gap-3 font-medium">
        <Checkbox
          checked={allSelected}
          indeterminate={someSelected && !allSelected}
          onCheckedChange={(checked) => {
            setSelected(selected.map(() => checked));
          }}
        />
        All permissions
      </label>
      <div className="ml-7 grid gap-3">
        {permissions.map((permission, index) => (
          <label className="flex items-center gap-3" key={permission}>
            <Checkbox
              checked={selected[index]}
              onCheckedChange={(checked) => {
                setSelected((current) =>
                  current.map((value, itemIndex) =>
                    itemIndex === index ? checked : value
                  )
                );
              }}
            />
            {permission}
          </label>
        ))}
      </div>
    </div>
  );
}`;

const permissions = ["Billing", "Members", "Deployments"];

function IndeterminateExample() {
  const [selected, setSelected] = useState([true, false, false]);
  const allSelected = selected.every(Boolean);
  const someSelected = selected.some(Boolean);

  return (
    <div className="grid w-64 gap-3">
      <label className="flex items-center gap-3 font-medium">
        <Checkbox
          checked={allSelected}
          indeterminate={someSelected && !allSelected}
          onCheckedChange={(checked) => {
            setSelected(selected.map(() => checked));
          }}
        />
        All permissions
      </label>
      <div className="ml-7 grid gap-3">
        {permissions.map((permission, index) => (
          <label className="flex items-center gap-3" key={permission}>
            <Checkbox
              checked={selected[index]}
              onCheckedChange={(checked) => {
                setSelected((current) =>
                  current.map((value, itemIndex) =>
                    itemIndex === index ? checked : value
                  )
                );
              }}
            />
            {permission}
          </label>
        ))}
      </div>
    </div>
  );
}

export const checkboxDocs: ComponentDocDefinition = {
  description: "A binary or mixed-state selection control.",
  examples: [
    {
      code: termsCode,
      preview: <TermsExample />,
      resetKey: "checkbox-terms-example",
      title: "Terms acceptance",
    },
    {
      code: indeterminateCode,
      preview: <IndeterminateExample />,
      resetKey: "checkbox-indeterminate-example",
      title: "User permissions",
    },
  ],
  getShowcaseCode: () => showcaseCode,
  importCode: `import { Checkbox } from "@/components/ui/checkbox";`,
  primitiveDocsUrl: "https://base-ui.com/react/components/checkbox",
  props: [
    {
      title: "Checkbox",
      props: [
        {
          name: "checked",
          type: "boolean",
          defaultValue: "-",
          description: "Controls the checked state.",
        },
        {
          name: "defaultChecked",
          type: "boolean",
          defaultValue: "false",
          description: "Sets the initial checked state when uncontrolled.",
        },
        {
          name: "indeterminate",
          type: "boolean",
          defaultValue: "false",
          description:
            "Shows a mixed state when only some child options are selected.",
        },
        {
          name: "onCheckedChange",
          type: "(checked: boolean, eventDetails: CheckboxRoot.ChangeEventDetails) => void",
          defaultValue: "-",
          description: "Runs when the checked state changes.",
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
          description: "Prevents interaction and lowers visual emphasis.",
        },
        {
          name: "name",
          type: "string",
          defaultValue: "-",
          description: "Sets the submitted form field name.",
        },
        {
          name: "required",
          type: "boolean",
          defaultValue: "false",
          description: "Marks the checkbox as required in a form.",
        },
      ],
    },
  ],
  renderPreview: () => (
    <label className="flex items-center gap-3 text-sm">
      <Checkbox defaultChecked /> Accept terms
    </label>
  ),
  usageCode: `<label className="flex items-center gap-3">
  <Checkbox defaultChecked />
  Accept terms
</label>`,
};
