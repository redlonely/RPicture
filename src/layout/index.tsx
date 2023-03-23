import "./layout.less";
import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";

import { NavLink } from "react-router-dom";
import { Button } from "antd";

const { Header, Content, Footer } = Layout;

function DefaultLayout() {
  return (
    <Layout className="default-container text-gray-700 bg-white dark:bg-gray-900 dark:text-gray-300">
      <Header className="main-header">
        <Button>
          <NavLink to={"/picture"}>图库</NavLink>
        </Button>
        <Button>
          <NavLink to={"/uploader"}>上传</NavLink>
        </Button>
      </Header>
      <Content className="main-content">
        <div className="content-box">
          <div className="article-content" style={{ width: "79.17%" }}>
            <Outlet />
          </div>
        </div>
      </Content>
      <Footer style={{ backgroundColor: "transparent", padding: 0 }}></Footer>
    </Layout>
  );
}
export default React.memo(DefaultLayout);
