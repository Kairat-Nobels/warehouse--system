import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import {
  AppstoreOutlined,
  TagsOutlined,
  TeamOutlined,
  InboxOutlined,
  ExportOutlined,
  MessageOutlined,
  DashboardOutlined,
  LogoutOutlined,
  ShopOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/hooks";
import { outAdmin } from "../redux/slices/adminSlice";

const { Header, Content, Sider } = Layout;

const AdminDashboardMain: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    dispatch(outAdmin());
    navigate("/");
  };

  const menuItems = [
    {
      key: "/admin",
      icon: <DashboardOutlined />,
      label: <Link to="/admin">Dashboard</Link>,
    },
    {
      key: "/admin/products",
      icon: <AppstoreOutlined />,
      label: <Link to="/admin/products">Товары</Link>,
    },
    {
      key: "/admin/categories",
      icon: <TagsOutlined />,
      label: <Link to="/admin/categories">Категории</Link>,
    },
    {
      key: "/admin/suppliers",
      icon: <TeamOutlined />,
      label: <Link to="/admin/suppliers">Поставщики</Link>,
    },
    {
      key: "/admin/receipts",
      icon: <InboxOutlined />,
      label: <Link to="/admin/receipts">Поступления</Link>,
    },
    {
      key: "/admin/write-offs",
      icon: <ExportOutlined />,
      label: <Link to="/admin/write-offs">Списания</Link>,
    },
    {
      key: "/admin/operations-history",
      icon: <HistoryOutlined />,
      label: <Link to="/admin/operations-history">История операций</Link>,
    },
    {
      key: "/admin/feedback",
      icon: <MessageOutlined />,
      label: <Link to="/admin/feedback">Обратная связь</Link>,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh", background: "#020617" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={270}
        collapsedWidth={80}
        theme="dark"
        style={{
          background: "#0f172a",
          borderRight: "1px solid #1e293b",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: collapsed ? "20px 10px" : "20px 16px",
            borderBottom: "1px solid #1e293b",
            marginBottom: "8px",
            minHeight: "88px",
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start",
            overflow: "hidden",
          }}
        >
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: collapsed ? "center" : "flex-start",
              gap: collapsed ? "0" : "12px",
              textDecoration: "none",
              width: "100%",
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                minWidth: 42,
                borderRadius: 14,
                background: "rgba(6, 182, 212, 0.12)",
                border: "1px solid rgba(34, 211, 238, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#22d3ee",
                fontSize: 20,
              }}
            >
              <ShopOutlined />
            </div>

            {!collapsed && (
              <div style={{ overflow: "hidden" }}>
                <div
                  style={{
                    color: "#ffffff",
                    fontSize: "18px",
                    fontWeight: 700,
                    lineHeight: 1.2,
                    whiteSpace: "nowrap",
                  }}
                >
                  SCLAD-UCHET
                </div>
                <div
                  style={{
                    color: "#94a3b8",
                    fontSize: "12px",
                    marginTop: "2px",
                  }}
                >
                  Панель управления складом
                </div>
              </div>
            )}
          </Link>
        </div>

        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          theme="dark"
          style={{
            background: "#0f172a",
            borderInlineEnd: "none",
            padding: "8px",
            flex: 1,
          }}
        />

        <div
          style={{
            padding: collapsed ? "12px 8px" : "12px 16px",
            marginTop: "auto",
          }}
        >
          <Button
            danger
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            block
            size="large"
          >
            {!collapsed && "Выйти"}
          </Button>
        </div>
      </Sider>

      <Layout>
        <Header
          style={{
            background: "#0b1220",
            borderBottom: "1px solid #1e293b",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            minHeight: "50px",
            lineHeight: 1.2,
          }}
        >
          <div>
            <h1
              style={{
                color: "#ffffff",
                margin: 0,
                fontSize: "22px",
                fontWeight: 700,
              }}
            >
              Система учета товаров на складе
            </h1>
          </div>
        </Header>

        <Content
          style={{
            margin: "0",
            padding: "24px",
            background: "#020617",
          }}
        >
          <div
            style={{
              minHeight: "calc(100vh - 120px)",
              background: "#0f172a",
              border: "1px solid #1e293b",
              borderRadius: "20px",
              padding: "24px",
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboardMain;
