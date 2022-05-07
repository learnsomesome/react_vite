import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./store";
import { LocalProvider, AntdProvider } from "./provider";
import "./i18n/config";
import "./theme/global.scss";

ReactDOM.render(
  <LocalProvider>
    <AntdProvider>
      <Provider store={store}>
        <BrowserRouter basename={import.meta.env.VITE_APP_BASE_NAME}>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </BrowserRouter>
      </Provider>
    </AntdProvider>
  </LocalProvider>,
  document.getElementById("root")
);
