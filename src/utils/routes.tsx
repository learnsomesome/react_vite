import { useTranslation } from "react-i18next";
import { Todo } from "@/assets/svg";
import Dashboard from "@/pages/Dashboard";
import NoMatch from "@/components/NoMatch";
import MenuLayout from "@/Layout/MenuLayout";
import TodoList from "@/pages/todoList";

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
    if (curRoute.children) {
      return curRoute.hiddenInMenu
        ? [...prevRoutes, ...filterRoutes(curRoute.children)]
        : [...prevRoutes, curRoute, ...filterRoutes(curRoute.children)];
    }

    return curRoute.hiddenInMenu ? prevRoutes : [...prevRoutes, curRoute];
  }, []);
};
