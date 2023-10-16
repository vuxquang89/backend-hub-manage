import React from "react";
import "./SideMenu.css";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
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
            key: "/",
          },
          {
            label: "Inventory",
            icon: <ShopOutlined />,
            key: "/inventory",
          },
          {
            label: "Orders",
            icon: <ShoppingCartOutlined />,
            key: "/orders",
          },

          {
            label: "Users",
            icon: <UserOutlined />,
            key: "/users",
          },
        ]}
      />
    </div>
  );
}

export default SideMenu;
