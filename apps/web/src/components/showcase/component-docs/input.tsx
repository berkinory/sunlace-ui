import {
  LockPasswordIcon,
  Mail01Icon,
  Search01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Button,
  Input,
  InputDescription,
  InputField,
  InputLabel,
} from "@sunlace/ui";
import { useState } from "react";

import type { ComponentSettings } from "../component-catalog";
import type { ComponentDocDefinition } from "./types";

function getShowcaseCode(settings?: ComponentSettings) {
  const input = settings?.input;
  const props = [
    'className="max-w-xs"',
    input?.revealable ? 'type="password"' : null,
    input?.revealable ? "revealable" : null,
    input?.clearable ? "clearable" : null,
    input?.disabled ? "disabled" : null,
    input?.invalid ? "aria-invalid" : null,
    input?.invalid ? 'error="Please enter a valid email."' : null,
    input?.startIcon
      ? "startIcon={<HugeiconsIcon icon={Mail01Icon} strokeWidth={2} />}"
      : null,
    input?.revealable
      ? 'placeholder="Password"'
      : 'placeholder="email@example.com"',
  ]
    .filter(Boolean)
    .join("\n      ");

  return `import { Mail01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Input } from "@/components/ui/input";

export function InputDemo() {
  return (
    <Input
      ${props}
    />
  );
}`;
}

const validationCode = `import { Button } from "@/components/ui/button";
import { Input, InputField, InputLabel } from "@/components/ui/input";
import { useState } from "react";

export function ValidationInput() {
  const [shakeKey, setShakeKey] = useState(0);

  return (
      <InputField className="max-w-xs">
      <InputLabel htmlFor="email">Email</InputLabel>
      <Input
        aria-invalid
        error="Please enter a valid email."
        id="email"
        placeholder="email@example.com"
        shakeKey={shakeKey}
      />
      <Button
        className="mt-1 w-fit"
        onClick={() => setShakeKey((key) => key + 1)}
        size="sm"
        type="button"
        variant="outline"
      >
        Trigger error
      </Button>
    </InputField>
  );
}`;

const passwordCode = `import { LockPasswordIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Input, InputDescription, InputField, InputLabel } from "@/components/ui/input";

export function PasswordInput() {
  return (
    <InputField className="max-w-xs">
      <InputLabel htmlFor="password">Password</InputLabel>
      <Input
        id="password"
        placeholder="Enter password"
        revealable
        startIcon={<HugeiconsIcon icon={LockPasswordIcon} strokeWidth={2} />}
        type="password"
      />
      <InputDescription>Use at least 12 characters.</InputDescription>
    </InputField>
  );
}`;

const clearableCode = `import { Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function ClearableInput() {
  const [value, setValue] = useState("sunlace");

  return (
    <Input
      clearable
      className="max-w-xs"
      onChange={(event) => setValue(event.target.value)}
      onClear={() => setValue("")}
      placeholder="Search components"
      startIcon={<HugeiconsIcon icon={Search01Icon} strokeWidth={2} />}
      value={value}
    />
  );
}`;

function Preview({ settings }: { settings?: ComponentSettings }) {
  const input = settings?.input;
  const [value, setValue] = useState(input?.revealable ? "sunlace" : "");
  const [shakeKey, setShakeKey] = useState(0);
  const invalid = input?.invalid;

  return (
    <div className="grid w-full max-w-xs gap-3">
      <Input
        aria-invalid={invalid || undefined}
        clearable={input?.clearable}
        disabled={input?.disabled}
        error={invalid ? "Please enter a valid email." : undefined}
        onChange={(event) => setValue(event.target.value)}
        onClear={() => setValue("")}
        placeholder={input?.revealable ? "Password" : "email@example.com"}
        revealable={input?.revealable}
        shakeKey={invalid ? shakeKey : undefined}
        startIcon={
          input?.startIcon ? (
            <HugeiconsIcon
              icon={input?.revealable ? LockPasswordIcon : Mail01Icon}
              strokeWidth={2}
            />
          ) : undefined
        }
        type={input?.revealable ? "password" : "email"}
        value={value}
      />
      {invalid ? (
        <Button
          className="w-fit"
          onClick={() => setShakeKey((key) => key + 1)}
          size="sm"
          type="button"
          variant="outline"
        >
          Trigger error
        </Button>
      ) : null}
    </div>
  );
}

function ValidationExample() {
  const [shakeKey, setShakeKey] = useState(0);

  return (
    <InputField className="max-w-xs">
      <InputLabel htmlFor="email-validation">Email</InputLabel>
      <Input
        aria-invalid
        error="Please enter a valid email."
        id="email-validation"
        placeholder="email@example.com"
        shakeKey={shakeKey}
      />
      <Button
        className="mt-1 w-fit"
        onClick={() => setShakeKey((key) => key + 1)}
        size="sm"
        type="button"
        variant="outline"
      >
        Trigger error
      </Button>
    </InputField>
  );
}

function PasswordExample() {
  return (
    <InputField className="max-w-xs">
      <InputLabel htmlFor="password-example">Password</InputLabel>
      <Input
        id="password-example"
        placeholder="Enter password"
        revealable
        startIcon={<HugeiconsIcon icon={LockPasswordIcon} strokeWidth={2} />}
        type="password"
      />
      <InputDescription>Use at least 12 characters.</InputDescription>
    </InputField>
  );
}

function ClearableExample() {
  const [value, setValue] = useState("sunlace");

  return (
    <Input
      clearable
      className="max-w-xs"
      onChange={(event) => setValue(event.target.value)}
      onClear={() => setValue("")}
      placeholder="Search components"
      startIcon={<HugeiconsIcon icon={Search01Icon} strokeWidth={2} />}
      value={value}
    />
  );
}

export const inputDocs: ComponentDocDefinition = {
  description: "A text field with validation, icons, and clear controls.",
  examples: [
    {
      code: validationCode,
      preview: <ValidationExample />,
      resetKey: "input-validation-example",
      title: "Validation feedback",
    },
    {
      code: passwordCode,
      preview: <PasswordExample />,
      resetKey: "input-password-example",
      title: "Password reveal",
    },
    {
      code: clearableCode,
      preview: <ClearableExample />,
      resetKey: "input-clearable-example",
      title: "Clearable search",
    },
  ],
  getShowcaseCode,
  importCode: `import {
  Input,
  InputDescription,
  InputField,
  InputLabel,
} from "@/components/ui/input";`,
  primitiveDocsUrl: "https://base-ui.com/react/components/input",
  props: [
    {
      title: "Input",
      props: [
        {
          name: "startIcon",
          type: "React.ReactNode",
          defaultValue: "-",
          description: "Renders a leading icon inside the input shell.",
        },
        {
          name: "endAddon",
          type: "React.ReactNode",
          defaultValue: "-",
          description:
            "Renders a trailing text addon such as a domain or unit.",
        },
        {
          name: "clearable",
          type: "boolean",
          defaultValue: "false",
          description:
            "Shows a clear button when a controlled value is present.",
        },
        {
          name: "onClear",
          type: "() => void",
          defaultValue: "-",
          description: "Runs when the clear button is pressed.",
        },
        {
          name: "revealable",
          type: "boolean",
          defaultValue: "false",
          description: "Adds a show or hide button for password inputs.",
        },
        {
          name: "error",
          type: "React.ReactNode",
          defaultValue: "-",
          description: "Renders an error message below the input.",
        },
        {
          name: "shakeKey",
          type: "React.Key",
          defaultValue: "-",
          description: "Restarts the validation shake when the key changes.",
        },
      ],
    },
  ],
  renderPreview: (settings) => <Preview settings={settings} />,
  usageCode: `<Input placeholder="email@example.com" />`,
};
