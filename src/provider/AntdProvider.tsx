import { useContext, useEffect } from "react";
import { ConfigProvider, message } from "antd";
import { LocalContext } from "./LocalProvider";
import { t } from "i18next";
import zhCN from "antd/lib/locale/zh_CN";
import enUS from "antd/lib/locale/en_US";

export const AntdProvider = ({ children }: { children: JSX.Element }) => {
  const { locale, clientSize } = useContext(LocalContext);
  const _locale = locale === "zh" ? zhCN : enUS;

  useEffect(() => {
    clientSize &&
      clientSize !== "large" &&
      message.config({
        top: 400,
      });
  }, [clientSize]);

  useEffect(() => {
    // 全局方法
    window.$Loading = {
      start() {
        setTimeout(() => {
          message.loading({
            key: "loading",
            content: t("common.loading"),
            duration: 0,
          });
        }, 500);
      },
      end() {
        message.destroy("loading");
      },
    };
  }, []);

  return <ConfigProvider locale={_locale}>{children}</ConfigProvider>;
};
