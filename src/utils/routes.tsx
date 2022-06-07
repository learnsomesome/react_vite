import { useTranslation } from "react-i18next";
import { Music, Todo } from "@/assets/svg";
import Dashboard from "@/pages/Dashboard";
import NoMatch from "@/components/NoMatch";
import MenuLayout from "@/Layout/MenuLayout";
import TodoList from "@/pages/TodoList";
import CloudMusic from "@/pages/CloudMusic";
import PlayListDetailDivert from "@/pages/CloudMusic/PlayListDetail";
import { Outlet } from "react-router-dom";

export type Route = {
  hiddenInMenu?: boolean;
  path?: string;
  index?: boolean;
  element: JSX.Element;
  label?: string;
  description?: string;
  icon?: JSX.Element;
  key?: string;
  children?: Route[];
};

export const useRoutes = (): Route[] => {
  const { t } = useTranslation();

  return [
    {
      hiddenInMenu: true,
      path: "/",
      element: <MenuLayout />,
      children: [
        {
          hiddenInMenu: true,
          index: true,
          element: <Dashboard />,
        },
        {
          key: "todo",
          path: "todo",
          label: t("todo"),
          description: t("todo_description"),
          icon: <Todo />,
          element: <TodoList />,
        },
        {
          key: "cloud-music",
          path: "cloud-music",
          label: t("cloud_music"),
          description: t("cloud_music_description"),
          icon: <Music />,
          element: <Outlet />,
          children: [
            {
              hiddenInMenu: true,
              index: true,
              element: <CloudMusic />,
            },
            {
              hiddenInMenu: true,
              path: "playlist-detail",
              element: <PlayListDetailDivert />,
            },
          ],
        },
      ],
    },
    {
      hiddenInMenu: true,
      path: "*",
      element: <NoMatch />,
    },
  ];
};

export const filterRoutes = (_routes: Route[]): Route[] => {
  return _routes.reduce((prevRoutes: Route[], curRoute) => {
    if (curRoute.children?.some((route) => !route.hiddenInMenu)) {
      return curRoute.hiddenInMenu
        ? [...prevRoutes, ...filterRoutes(curRoute.children)]
        : [
            ...prevRoutes,
            { ...curRoute, children: filterRoutes(curRoute.children) },
          ];
    }

    const { children, ...rest } = curRoute;

    return curRoute.hiddenInMenu ? prevRoutes : [...prevRoutes, rest];
  }, []);
};
