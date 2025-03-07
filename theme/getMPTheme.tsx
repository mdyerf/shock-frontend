import type {} from "@mui/material/themeCssVarsAugmentation";
import { ThemeOptions, PaletteMode } from "@mui/material/styles";
import { getDesignTokens } from "./themePrimitives";

export default function getMPTheme(mode: PaletteMode): ThemeOptions {
  return {
    ...getDesignTokens(mode),
  };
}
