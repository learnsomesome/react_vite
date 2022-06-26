import { useContext, useEffect } from "react";
import { ConfigProvider, message } from "antd";
import { LocalContext } from "./LocalProvider";
import zhCN from "antd/lib/locale/zh_CN";
import enUS from "antd/lib/locale/en_US";

export const AntdProvider = ({ children }: { children: JSX.Element }) => {
  const { locale, clientSize } = useContext(LocalContext);
  const _locale = locale === "zh" ? zhCN : enUS;

  useEffect(() => {
    clientSize !== "large" &&
      message.config({
        top: 400,
      });
  }, [clientSize]);

  return <ConfigProvider locale={_locale}>{children}</ConfigProvider>;
};
