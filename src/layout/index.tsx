import "./layout.less"
import React from "react"
import { Outlet } from "react-router-dom"
import { Layout } from "antd"

import { NavLink } from "react-router-dom"
import { Button } from "antd"

const { Header, Content, Footer } = Layout

function DefaultLayout() {
  return (
    <Layout className="default-container text-gray-700 bg-white dark:bg-gray-900 dark:text-gray-300">
      <Header className="main-header">
        <NavLink className={ "btn w-[150px]" } to={ "/picture" }>图库</NavLink>
        <NavLink className={ "btn w-[150px]" } to={ "/uploader" }>上传</NavLink>
      </Header>
      <Content className="main-content">
        <Outlet/>
      </Content>
      <Footer style={ { backgroundColor: "transparent", padding: 0 } }></Footer>
    </Layout>
  )
}

export default React.memo(DefaultLayout)
