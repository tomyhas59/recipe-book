import { atom, selector } from "recoil";
import { lightTheme, darkTheme } from "../styles/theme";

export const themeState = atom<"light" | "dark">({
  key: "themeState",
  default: "light",
});

// 현재 선택된 테마 가져오기
export const selectedTheme = selector({
  key: "selectedTheme",
  get: ({ get }) => {
    const theme = get(themeState);
    return theme === "light" ? lightTheme : darkTheme;
  },
});
