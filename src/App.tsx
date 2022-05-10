import { useRoutes } from "react-router-dom";
import { useRoutes as _useRoutes } from "./utils/routes";
import Header from "./components/Header";

function App() {
  const routes = _useRoutes();
  const routeElement = useRoutes(routes);

  return (
    <main className="app">
      <Header />
      {routeElement}
    </main>
  );
}

export default App;
