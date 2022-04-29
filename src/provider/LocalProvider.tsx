import { createContext, useEffect, useState } from "react";
import { REACT_VITE_LOCALE, REACT_VITE_THEME } from "../utils/constant";
import themeSwitcher from "../utils/themeSwitcher";

const themeMap = {
  dark: "https://ant-design.gitee.io/dark.css",
};

type LocalProviderValue = {
  theme: string;
  locale: string;
  toggleTheme: () => void;
  toggleLocale: () => void;
};

export const LocalContext = createContext<LocalProviderValue>({} as LocalProviderValue);

export const LocalProvider = ({ children }: { children: JSX.Element }) => {
  const defaultTheme = window.localStorage.getItem(REACT_VITE_THEME) || "light";
  const defaultLocale = window.localStorage.getItem(REACT_VITE_LOCALE) || "zh";
  const [theme, setTheme] = useState(defaultTheme);
  const [locale, setLocale] = useState(defaultLocale);

  const { switcher } = themeSwitcher(themeMap);

  const toggleTheme = () => {
    const value = theme === "light" ? "dark" : "light";

    switcher(value);
    document.documentElement.style.colorScheme = value;
    window.localStorage.setItem(REACT_VITE_THEME, value);
    setTheme(value);
  };

  const toggleLocale = () => {
    const value = locale === "zh" ? "en" : "zh";

    window.localStorage.setItem(REACT_VITE_LOCALE, value);
    setLocale(locale === "zh" ? "en" : "zh");
  };

  useEffect(() => {
    switcher(defaultTheme);
  }, []);

  return (
    <LocalContext.Provider
      value={{
        theme,
        locale,
        toggleTheme,
        toggleLocale,
      }}
    >
      {children}
    </LocalContext.Provider>
  );
};
