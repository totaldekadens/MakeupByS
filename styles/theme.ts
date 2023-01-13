import {
  ButtonStylesParams,
  ColorScheme,
  CSSObject,
  DefaultMantineColor,
  MantineTheme,
  MantineThemeOverride,
  Tuple,
  useMantineTheme,
} from "@mantine/core";

export const getTheme = (colorScheme: ColorScheme): MantineThemeOverride => ({
  colorScheme,

  headings: {
    sizes: {
      // Exempel på om vi vill ha en annan font weight på headings utöver default
      //h1: { fontWeight: 800 },
      //h2: { fontWeight: 700 },
      //h3: { fontWeight: 700 },
      //h4: { fontWeight: 600 },
    },
  },
  respectReducedMotion: true,
  primaryColor: "brand",
  colors: {
    // * Är de färger som vi har i figma på exempelbilden.
    brand: [
      "#FFFFFF", // vit - theme.colors.brand[0]
      "#EBCDC9", // ljusaste rosa - theme.colors.brand[1]   *
      "#E5B4AD", // mellan rosa - theme.colors.brand[2]      *
      "#CC9887", // mörkaste rosa - theme.colors.brand[3]   *
      "#B89F56", // ljus guld - theme.colors.brand[4]        *
      "#885E0B", // mörk guld - theme.colors.brand[5]        *
      "#375F69", // "ljusblå" - theme.colors.brand[6]       *
      "#1D464E", // mellanblå  - theme.colors.brand[7]      *
      "#133136", // mörkblå  - theme.colors.brand[8]
      "#CFA6A1", // bakgrund säsongsknappar  - theme.colors.brand[9]
    ],
  },
  // Ex. theme.fontSizes.sm i applikationen. Dessa värden kan vi ändra så att de passar vår applikation bättre sen
  fontSizes: {
    xs: 10,
    sm: 13,
    md: 16,
    lg: 20,
    xl: 30,
  },
  components: {
    // Här kan vi påverka styling för samtliga komponenter från Mantine.


    Button: {
      styles: (
        theme: MantineTheme,
        params: ButtonStylesParams
      ): Record<string, CSSObject> => ({
        root: {
          borderRadius: "10px",
          minWidth: "150px",
          [theme.fn.smallerThan("xs")]: {
            minWidth: "130px",
          },
          // Här kan vi lägga in styling för Button-komponenten i Mantine
          "&:hover": {
            backgroundColor: "whitesmoke",
            color: theme.colors.brand[3],
            borderColor: theme.colors.brand[3],
            // Här kan vi lägga in hover för Button-komponenten i Mantine
          },
        },
        label: {
          fontWeight: "bold",
          textTransform: "uppercase",
          // Här kan vi lägga in storlek för texten i Button tex
        },
      }),
    },
    Autocomplete: {
      styles: (theme: MantineTheme) => ({
        placeholder: {
          color: "white",
          fontSize: "lg",
        },
      }),
    },
    TextInput: {
      styles: (theme: MantineTheme) => ({
        root: {
          //backgroundColor: theme.colors.brand[2],
        },
      }),
    },
    Title: {
      styles: (theme: MantineTheme) => ({
        root: {
          // Här kan vi bestämma styling och vilken storlek headings skall ha tex beroende på skärmstorlek. Har kommenterat ut dem sålänge
          "&:is(h1)": {
            /* fontSize: theme.fontSizes.xl * 2.2,
            [theme.fn.smallerThan("md")]: {
              fontSize: theme.fontSizes.xl * 2,
            },
            [theme.fn.smallerThan("sm")]: {
              fontSize: theme.fontSizes.xl * 1.6,
            },
            [theme.fn.smallerThan("xs")]: {
              fontSize: theme.fontSizes.xl * 1.3,
            }, */
          },
          "&:is(h2)": {
            /*  fontSize: theme.fontSizes.xl * 1.1,
            [theme.fn.smallerThan("md")]: {
              fontSize: theme.fontSizes.lg * 1.2,
            },
            [theme.fn.smallerThan("xs")]: {
              fontSize: theme.fontSizes.lg * 1,
            }, */
          },
          "&:is(h4)": {
            /*  fontSize: theme.fontSizes.lg,
            [theme.fn.smallerThan("md")]: {
              fontSize: theme.fontSizes.md,
            }, */
          },
        },
      }),
    },
  },
});

type ExtendedCustomColors = "brand" | DefaultMantineColor;
declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, Tuple<string, 10>>;
  }
}
