import { useContext, useEffect } from "react";
import { Sun, Moon, Zh, En } from "@/assets/svg";
import { useTranslation } from "react-i18next";
import { LocalContext } from "../../provider/LocalProvider";
import "./index.scss";

const Header = () => {
  const { t, i18n } = useTranslation();
  const { theme, locale, toggleTheme, toggleLocale } = useContext(LocalContext);
  const isZh = locale === "zh";
  const isLight = theme === "light";

  useEffect(() => {
    window.document.documentElement.setAttribute("theme", theme);
  }, [theme]);

  return (
    <header className="header">
      <div
        className="theme-checkout-btn"
        onClick={toggleTheme}
        title={isLight ? t("header.dark") : t("header.light")}
      >
        {isLight ? <Moon /> : <Sun />}
      </div>
      <div
        className="locale-checkout-btn"
        onClick={() => {
          i18n.changeLanguage(isZh ? "en" : "zh");
          toggleLocale();
        }}
        title={isZh ? t("header.en") : t("header.zh")}
      >
        {isZh ? <En /> : <Zh />}
      </div>
    </header>
  );
};

export default Header;
