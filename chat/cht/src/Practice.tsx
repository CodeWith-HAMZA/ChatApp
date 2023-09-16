import {
  DesktopOutlined,
  DownloadOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useState } from "react";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("User-name", "0", <PieChartOutlined />),
  getItem("User-Name", "1", <DesktopOutlined />),
  getItem("User-name", "2", <UserOutlined />),
  getItem("User-name", "3", <TeamOutlined />),
];

const Practice: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        style={{ padding: "1rem 0" }}
        collapsed={collapsed}
        onCollapse={(value) => {
          setCollapsed(value);
          console.log(value);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          onClick={({ key, keyPath: [KeyPath] }) => console.log(key, KeyPath)}
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: "0 1rem", background: colorBgContainer }}>
          <Button type="dashed" shape="default" size={4}>
            Go To Chats
          </Button>
        </Header>{" "}
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Chats</Breadcrumb.Item>
            <Breadcrumb.Item>Hamza Shaikh</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          ></div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Practice;
