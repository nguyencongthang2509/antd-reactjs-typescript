/** @format */

import { Layout } from "antd";
import { ReactNode } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const { Content } = Layout;

const DashBoardLayout = ({
  children,
}: {
  children?: ReactNode | undefined;
}) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout className="site-layout">
        <Header />
        <Content style={{ margin: "0 16px" }} className="p-6">
          {children}
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default DashBoardLayout;
