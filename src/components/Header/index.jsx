import { useEffect, useState } from "react";
import { Sun, Moon, Zh, En } from "@/assets/svg";
import { useTranslation } from "react-i18next";
import "./index.scss";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState("light");
  const isZh = i18n.language === "zh";
  const isLight = theme === "light";

  useEffect(() => {
    window.document.documentElement.setAttribute("theme", theme);
  }, [theme]);

  return (
    <header className="header">
      <div
        className="theme-checkout-btn"
        onClick={() => setTheme(isLight ? "dark" : "light")}
        title={isLight ? t("header.dark") : t("header.light")}
      >
        {isLight ? <Moon /> : <Sun />}
      </div>
      <div
        className="locale-checkout-btn"
        onClick={() => i18n.changeLanguage(isZh ? "en" : "zh")}
        title={isZh ? t("header.en") : t("header.zh")}
      >
        {isZh ? <En /> : <Zh />}
      </div>
    </header>
  );
};

export default Header;
