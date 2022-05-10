import { useTranslation } from "react-i18next";
import Card from "@/components/Card";
import { filterRoutes, useRoutes } from "@/utils/routes";
import classes from "./index.module.scss";

const Dashboard = () => {
  const routes = useRoutes();
  const { t } = useTranslation();
  const _routes = filterRoutes(routes);

  return (
    <div className={classes.dashboard}>
      <section className={classes.cardList}>
        {_routes.map((route) => (
          <Card
            key={route.key}
            label={route.label || ""}
            icon={route.icon}
            description={t(route.description || "")}
            jumpPath={route.path}
          />
        ))}
      </section>
    </div>
  );
};

export default Dashboard;
