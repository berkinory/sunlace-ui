import type { ComponentSlug } from "../component-registry";
import { accordionDocs } from "./accordion";
import { badgeDocs } from "./badge";
import { buttonDocs } from "./button";
import { calendarDocs } from "./calendar";
import { cardDocs } from "./card";
import { checkboxDocs } from "./checkbox";
import { comboboxDocs } from "./combobox";
import { dialogDocs } from "./dialog";
import { ditherAvatarDocs } from "./dither-avatar";
import { drawerDocs } from "./drawer";
import { dropdownMenuDocs } from "./dropdown-menu";
import { inputDocs } from "./input";
import { numberPopDocs } from "./number-pop";
import { popoverDocs } from "./popover";
import { progressDocs } from "./progress";
import { radioDocs } from "./radio";
import { selectDocs } from "./select";
import { shimmerTextDocs } from "./shimmer-text";
import { skeletonDocs } from "./skeleton";
import { sliderDocs } from "./slider";
import { sonnerDocs } from "./sonner";
import { spinnerDocs } from "./spinner";
import { switchDocs } from "./switch";
import { tabsDocs } from "./tabs";
import { toggleDocs } from "./toggle";
import { tooltipDocs } from "./tooltip";
import type { ComponentDocDefinition } from "./types";

const componentDocs: Record<ComponentSlug, ComponentDocDefinition> = {
  accordion: accordionDocs,
  badge: badgeDocs,
  button: buttonDocs,
  calendar: calendarDocs,
  card: cardDocs,
  checkbox: checkboxDocs,
  combobox: comboboxDocs,
  dialog: dialogDocs,
  "dither-avatar": ditherAvatarDocs,
  drawer: drawerDocs,
  "dropdown-menu": dropdownMenuDocs,
  input: inputDocs,
  "number-pop": numberPopDocs,
  popover: popoverDocs,
  progress: progressDocs,
  radio: radioDocs,
  select: selectDocs,
  "shimmer-text": shimmerTextDocs,
  skeleton: skeletonDocs,
  slider: sliderDocs,
  sonner: sonnerDocs,
  spinner: spinnerDocs,
  switch: switchDocs,
  tabs: tabsDocs,
  toggle: toggleDocs,
  tooltip: tooltipDocs,
};

export { componentDocs };
export type {
  ComponentDocDefinition,
  ComponentDocExample,
  ComponentProp,
  ComponentPropGroup,
} from "./types";
