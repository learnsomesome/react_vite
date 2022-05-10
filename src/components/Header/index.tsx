import { Switch } from "antd";
import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Zh, En, Toggle } from "../../assets/svg";
import logo from "../../assets/svg/logo.svg";
import { LocalContext } from "../../provider/LocalProvider";
import classes from "./index.module.scss";

const Header = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const {
    theme,
    locale,
    clientSize,
    toggleTheme,
    toggleLocale,
    toggleMenuVisible,
  } = useContext(LocalContext);
  const isZh = locale === "zh";
  const isLight = theme === "light";

  useEffect(() => {
    window.document.documentElement.setAttribute("theme", theme);
  }, [theme]);

  return (
    <header className={classes.header}>
      <section className={classes.leftSide}>
        {clientSize && clientSize !== "large" && (
          <div className={classes.menuBtn} onClick={toggleMenuVisible}>
            <Toggle />
          </div>
        )}
        <div className={classes.logoArea} onClick={() => navigate("/")}>
          <img src={logo} alt="Logo" width={30} />
          React Vite
        </div>
      </section>
      <section className={classes.btnArea}>
        <Switch
          className={classes.themeCheckoutSwitch}
          title={isLight ? t("header.dark") : t("header.light")}
          checked={isLight}
          checkedChildren={<span>🌙</span>}
          unCheckedChildren={<span>☀</span>}
          onChange={toggleTheme}
        />
        <div
          className={classes.localeCheckoutBtn}
          onClick={() => {
            i18n.changeLanguage(isZh ? "en" : "zh");
            toggleLocale();
          }}
          title={isZh ? t("header.en") : t("header.zh")}
        >
          {isZh ? <En /> : <Zh />}
        </div>
      </section>
    </header>
  );
};

export default Header;
