import { useEffect, useState } from "react";
import { Sun, Moon } from "@/assets/svg";
import "./index.scss";

const Header = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    window.document.documentElement.setAttribute("theme", theme);
  }, [theme]);

  return (
    <header className="header">
      <div
        className="theme-checkout-btn"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        title={theme === "light" ? "dark" : "light"}
      >
        {theme === "light" ? <Moon /> : <Sun />}
      </div>
    </header>
  );
};

export default Header;
