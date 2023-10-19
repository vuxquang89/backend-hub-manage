import React from "react";
import "./SideMenu.css";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  ShopOutlined,
  HomeOutlined,
  UserOutlined,
  ApiOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");
  const navigate = useNavigate();

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  return (
    <div className="side-menu">
      <Menu
        className="side-menu-vertical"
        mode="vertical"
        onClick={(item) => {
          //item.key
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: "Dashboard",
            icon: <AppstoreOutlined />,
            key: "/admin",
          },
          {
            label: "Chi nhánh",
            icon: <HomeOutlined />,
            key: "/admin/branch",
          },
          {
            label: "Hub",
            icon: <ShopOutlined />,
            key: "/admin/hub",
          },
          {
            label: "Thiết bị",
            icon: <ApiOutlined />,
            key: "/admin/device",
          },
          {
            label: "Users",
            icon: <UserOutlined />,
            key: "/admin/users",
          },
        ]}
      />
    </div>
  );
}

export default SideMenu;
