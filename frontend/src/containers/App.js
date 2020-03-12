import React from 'react';
import { Layout } from "antd";
import 'antd/dist/antd.css';
import HeaderContainer from "../components/HeaderContainer";
import { Route, Switch } from "react-router";
import VideosListPage from "../components/pages/VideosListPage";
import UploadVideoPage from "../components/pages/UploadVideoPage";

const { Header, Content } = Layout;

export default function App() {
  return (
    <Layout className="layout">
      <Header>
        <HeaderContainer />
      </Header>
      <Content>
        <Switch>
          <Route path="/upload" component={UploadVideoPage} />
          <Route path="/" component={VideosListPage} />
        </Switch>
      </Content>
    </Layout>
  )
}
