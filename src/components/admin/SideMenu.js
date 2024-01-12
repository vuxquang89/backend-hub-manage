import React from "react";
import "./SideMenu.css";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  ShopOutlined,
  HomeOutlined,
  UserOutlined,
  ApiOutlined,
  UsergroupAddOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const items = [
    getItem("Dashboard", "/admin", <AppstoreOutlined />),
    getItem("Chi nhánh", "/admin/branch", <HomeOutlined />),
    getItem("Hub", "/admin/hub", <ShopOutlined />),
    getItem("Thiết bị", "/admin/device", <ApiOutlined />),
    getItem("Users", "sub1", <UsergroupAddOutlined />, [
      getItem("PGĐ KT", "/admin/users/leader", <UserOutlined />),
      getItem("Quản lý phòng máy", "/admin/users/manager", <UserOutlined />),
      getItem("Phòng KT", "/admin/users/department", <UserOutlined />),
    ]),
    getItem(
      <a
        href="https://drive.google.com/file/d/1dVsI8ygEeqQVPTijRHYovFsde_XayPOA/view?usp=sharing"
        target="_blank"
        rel="Hướng dẫn sử dụng"
      >
        Hỗ trợ
      </a>,
      "support",
      <FilePdfOutlined />
    ),
  ];

  return (
    <div className="side-menu">
      <Menu
        className="side-menu-vertical"
        style={{
          width: 225,
        }}
        onClick={(item) => {
          //item.key
          navigate(item.key);
        }}
        mode="inline"
        theme="dark"
        selectedKeys={[selectedKeys]}
        // inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
}

export default SideMenu;
