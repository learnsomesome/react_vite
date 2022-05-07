import Card from "@/components/Card";
import { filterRoutes, routes } from "@/utils/routes";
import { useTranslation } from "react-i18next";
import "./index.scss";

const Dashboard = () => {
  const { t } = useTranslation();
  const _routes = filterRoutes(routes);

  return (
    <div className="dashboard">
      <section className="cardList">
        {_routes.map((route) => (
          <Card
            key={route.key}
            title={t(route.title || "")}
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
