import { createContext, useState } from "react";
import { REACT_VITE_LOCALE, REACT_VITE_THEME } from "../utils/constant";

export const LocalContext = createContext();

export const LocalProvider = ({ children }) => {
  const [theme, setTheme] = useState(window.localStorage.getItem(REACT_VITE_THEME) || "light");
  const [locale, setLocale] = useState(window.localStorage.getItem(REACT_VITE_LOCALE) || "zh");

  const toggleTheme = () => {
    const value = theme === "light" ? "dark" : "light";

    window.localStorage.setItem(REACT_VITE_THEME, value);
    setTheme(value);
  };

  const toggleLocale = () => {
    const value = locale === "zh" ? "en" : "zh";

    window.localStorage.setItem(REACT_VITE_LOCALE, value);
    setLocale(locale === "zh" ? "en" : "zh");
  };

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
