import { Menu as _Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Route } from "@/utils/routes";

type IMenu = {
  selectedKeys: string[];
  routes: Route[];
};

const Menu = (props: IMenu) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <_Menu mode="inline" selectedKeys={props.selectedKeys}>
      {props.routes.map((route) => (
        <_Menu.Item
          key={route.key}
          icon={route.icon || null}
          onClick={() => route.path && navigate(route.path)}
        >
          {t(route.title || "")}
        </_Menu.Item>
      ))}
    </_Menu>
  );
};

export default Menu;
