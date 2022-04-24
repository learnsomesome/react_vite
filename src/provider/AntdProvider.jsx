import { useContext, useEffect } from "react";
import { ConfigProvider } from "antd";
import { LocalContext } from "./LocalProvider";
import zhCN from "antd/lib/locale/zh_CN";
import enUS from "antd/lib/locale/en_US";

export const AntdProvider = ({ children }) => {
  const { theme, locale } = useContext(LocalContext);
  const _locale = locale === "zh" ? zhCN : enUS;
  const _prefixCls = theme === "light" ? "ant" : "dark";

  return (
    <ConfigProvider prefixCls={_prefixCls} locale={_locale}>
      {children}
    </ConfigProvider>
  );
};
