import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/styles/tailwind.css";

import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>
);
