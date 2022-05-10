import { Menu as _Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { Route } from "@/utils/routes";

type IMenu = {
  selectedKeys: string[];
  routes: Route[];
};

const Menu = (props: IMenu) => {
  const navigate = useNavigate();

  return (
    <_Menu
      mode="inline"
      selectedKeys={props.selectedKeys}
      items={props.routes as any}
      onClick={({ keyPath }) => {
        const _keyPath = keyPath.reverse();
        const path = _keyPath.map((item) => `/${item}`).join("");

        navigate(path);
      }}
    />
  );
};

export default Menu;
