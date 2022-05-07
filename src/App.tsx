import { useRoutes } from "react-router-dom";
import Header from "./components/Header";
import { routes } from "./utils/routes";
import "./App.scss";

function App() {
  const routeElement = useRoutes(routes);

  return (
    <main className="app">
      <Header />
      {routeElement}
    </main>
  );
}

export default App;
