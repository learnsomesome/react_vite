import { Switch } from "antd";
import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Zh, En, Toggle } from "../../assets/svg";
import logo from "../../assets/svg/logo.svg";
import { LocalContext } from "../../provider/LocalProvider";
import "./index.scss";

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
    <header className="header">
      <section className="leftSide">
        {clientSize && clientSize !== "large" && (
          <div className="menuBtn" onClick={toggleMenuVisible}>
            <Toggle />
          </div>
        )}
        <div className="logoArea" onClick={() => navigate("/")}>
          <img src={logo} alt="Logo" width={30} />
          React Vite
        </div>
      </section>
      <section className="btnArea">
        <Switch
          className="themeCheckoutSwitch"
          title={isLight ? t("header.dark") : t("header.light")}
          checked={isLight}
          checkedChildren={<span>🌙</span>}
          unCheckedChildren={<span>☀</span>}
          onChange={toggleTheme}
        />
        <div
          className="localeCheckoutBtn"
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
