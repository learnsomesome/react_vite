import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Drawer } from "antd";
import { filterRoutes, routes } from "@/utils/routes";
import { LocalContext } from "@/provider/LocalProvider";
import Menu from "@/components/Menu";
import { Close } from "../../assets/svg";
import logo from "../../assets/svg/logo.svg";
import "./index.scss";

const MenuLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { clientSize, menuVisible, toggleMenuVisible } =
    useContext(LocalContext);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const _routes = filterRoutes(routes);

  useEffect(() => {
    clientSize !== "large" && menuVisible && toggleMenuVisible();

    const matchedRoute = _routes.find(
      (route) => route.path && pathname.endsWith(route.path)
    );

    setSelectedKeys(matchedRoute?.key ? [matchedRoute.key] : []);
  }, [pathname]);

  return (
    <main className="menuLayout">
      {clientSize ? (
        clientSize === "large" ? (
          <section className="menu">
            <Menu selectedKeys={selectedKeys} routes={_routes} />
          </section>
        ) : (
          <Drawer
            className="menuDrawer"
            placement="left"
            width="83vw"
            title={
              <div className="logoArea" onClick={() => navigate("/")}>
                <img src={logo} alt="Logo" width={30} />
                React Vite
              </div>
            }
            extra={<Close className="closeBtn" onClick={toggleMenuVisible} />}
            closable={false}
            visible={menuVisible}
            onClose={toggleMenuVisible}
          >
            <Menu selectedKeys={selectedKeys} routes={_routes} />
          </Drawer>
        )
      ) : null}
      <section className="content">
        <Outlet />
      </section>
    </main>
  );
};

export default MenuLayout;
