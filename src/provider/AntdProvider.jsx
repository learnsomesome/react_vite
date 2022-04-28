import { useContext } from "react";
import { ConfigProvider } from "antd";
import { LocalContext } from "./LocalProvider";
import zhCN from "antd/lib/locale/zh_CN";
import enUS from "antd/lib/locale/en_US";

export const AntdProvider = ({ children }) => {
  const locale = useContext(LocalContext);
  const _locale = locale === "zh" ? zhCN : enUS;

  return <ConfigProvider locale={_locale}>{children}</ConfigProvider>;
};
