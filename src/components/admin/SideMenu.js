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
            key: "/admin",
          },
          {
            label: "Chi nhánh",
            icon: <ShopOutlined />,
            key: "/admin/branch",
          },
          {
            label: "Orders",
            icon: <ShoppingCartOutlined />,
            key: "/admin/orders",
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
