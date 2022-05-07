import { createContext, useEffect, useState } from "react";
import throttle from "lodash.throttle";
import { REACT_VITE_LOCALE, REACT_VITE_THEME } from "../utils/constant";
import themeSwitcher from "../utils/themeSwitcher";

const themeMap = {
  dark: "https://ant-design.gitee.io/dark.css",
};

type ClientSize = "small" | "medium" | "large";

type LocalProviderValue = {
  theme: string;
  locale: string;
  clientSize: "small" | "medium" | "large";
  menuVisible: boolean;
  toggleMenuVisible: () => void;
  toggleTheme: () => void;
  toggleLocale: () => void;
};

export const LocalContext = createContext<LocalProviderValue>(
  {} as LocalProviderValue
);

export const LocalProvider = ({ children }: { children: JSX.Element }) => {
  const defaultTheme = window.localStorage.getItem(REACT_VITE_THEME) || "light";
  const defaultLocale = window.localStorage.getItem(REACT_VITE_LOCALE) || "zh";
  const [theme, setTheme] = useState(defaultTheme);
  const [locale, setLocale] = useState(defaultLocale);
  const [clientSize, setClientSize] = useState<ClientSize>("" as ClientSize);
  const [menuVisible, setMenuVisible] = useState(false);

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

  const toggleMenuVisible = () => {
    setMenuVisible(!menuVisible);
  };

  const onResize = () => {
    if (window.innerWidth < 768) {
      setClientSize("small");
    } else if (window.innerWidth < 992) {
      setClientSize("medium");
    } else {
      setClientSize("large");
    }
  };

  useEffect(() => {
    switcher(defaultTheme);
  }, []);

  useEffect(() => {
    if (!clientSize) {
      onResize();
    }

    window.addEventListener("resize", throttle(onResize, 200));
  }, []);

  return (
    <LocalContext.Provider
      value={{
        theme,
        locale,
        clientSize,
        menuVisible,
        toggleTheme,
        toggleLocale,
        toggleMenuVisible,
      }}
    >
      {children}
    </LocalContext.Provider>
  );
};
