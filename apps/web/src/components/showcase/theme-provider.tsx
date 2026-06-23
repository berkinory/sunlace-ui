import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

export const colorThemes = [
  {
    value: "default",
    label: "Default",
    swatches: [
      "oklch(1 0 0)",
      "oklch(0.97 0 0)",
      "oklch(0.708 0 0)",
      "oklch(0.205 0 0)",
    ],
  },
  {
    value: "mint",
    label: "Mint",
    swatches: [
      "oklch(0.994 0 0)",
      "oklch(0.9752 0.0307 168.3924)",
      "oklch(0.8545 0.1675 159.6564)",
      "oklch(0 0 0)",
    ],
  },
  {
    value: "violet",
    label: "Violet",
    swatches: [
      "oklch(0.9946 0.0026 286.3519)",
      "oklch(0.9634 0.0175 279.0619)",
      "oklch(0.5565 0.243 261.9529)",
      "oklch(0.1615 0.0105 285.1663)",
    ],
  },
  {
    value: "bronze",
    label: "Bronze",
    swatches: [
      "oklch(0.9801 0.0034 67.7835)",
      "oklch(0.9097 0.0386 60.9712)",
      "oklch(0.4732 0.1247 46.2007)",
      "oklch(0.2006 0.0138 34.3909)",
    ],
  },
  {
    value: "mauve",
    label: "Mauve",
    swatches: [
      "oklch(0.9699 0.0113 71.8999)",
      "oklch(0.9389 0.0145 64.3381)",
      "oklch(0.4597 0.0629 289.5561)",
      "oklch(0.6171 0.0738 305.698)",
    ],
  },
] as const;

export type ColorTheme = (typeof colorThemes)[number]["value"];

function isColorTheme(value: string | null): value is ColorTheme {
  return colorThemes.some((theme) => theme.value === value);
}

type ColorThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: ColorTheme;
  storageKey?: string;
};

type ColorThemeProviderState = {
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
};

const ColorThemeContext = React.createContext<ColorThemeProviderState | null>(
  null
);

function ColorThemeProvider({
  children,
  defaultTheme = "default",
  storageKey = "vite-ui-color-theme",
}: ColorThemeProviderProps) {
  const [colorTheme, setColorTheme] = React.useState<ColorTheme>(defaultTheme);

  React.useEffect(() => {
    const storedTheme = window.localStorage.getItem(
      storageKey
    ) as ColorTheme | null;

    if (isColorTheme(storedTheme)) {
      setColorTheme(storedTheme);
    }
  }, [storageKey]);

  React.useEffect(() => {
    const root = document.documentElement;
    root.dataset.colorTheme = colorTheme;
    window.localStorage.setItem(storageKey, colorTheme);
  }, [colorTheme, storageKey]);

  return (
    <ColorThemeContext.Provider value={{ colorTheme, setColorTheme }}>
      {children}
    </ColorThemeContext.Provider>
  );
}

export const ThemeProvider = ({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) => (
  <NextThemesProvider {...props}>
    <ColorThemeProvider>{children}</ColorThemeProvider>
  </NextThemesProvider>
);

export { useTheme } from "next-themes";

export function useColorTheme() {
  const context = React.useContext(ColorThemeContext);

  if (!context) {
    throw new Error("useColorTheme must be used within ThemeProvider");
  }

  return context;
}
