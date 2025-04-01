import { atom, selector } from "recoil";
import { lightTheme, darkTheme } from "../styles/theme";

export const themeState = atom<"light" | "dark">({
  key: "themeState",
  default: "light",
});

export const selectedTheme = selector({
  key: "selectedTheme",
  get: ({ get }) => {
    const themeMode = get(themeState);
    return themeMode === "light" ? lightTheme : darkTheme;
  },
});
