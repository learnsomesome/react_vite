import { useEffect, useState } from "react";
import { Moon, SunOne } from "@icon-park/react";
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
        {theme === "light" ? (
          <Moon theme="filled" size="24" fill="#000000" />
        ) : (
          <SunOne theme="filled" size="24" fill="#f8e71c" />
        )}
      </div>
    </header>
  );
};

export default Header;
