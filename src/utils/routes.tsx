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
  title?: string;
  description?: string;
  icon?: JSX.Element;
  key?: string;
  children?: Route[];
};

export const routes: Route[] = [
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
        path: "todo",
        title: "todo",
        description: "todo_description",
        key: "todo",
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
