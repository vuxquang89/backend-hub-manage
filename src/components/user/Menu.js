import React from "react";
import { Image, Menu } from "antd";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

function HeaderMenu({ isInLine = false }) {
  const { auth } = useAuth();
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");
  const navigate = useNavigate();

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const menuUser = [
    {
      label: "Trang chủ",
      key: "/",
    },
  ];

  const menuManager = [
    {
      label: "Trang chủ",
      key: "/",
    },
    {
      label: "Chi tiết phòng hub",
      key: "/manager",
    },
    {
      label: "Quản lý hub",
      key: "/manager/hub",
    },
  ];

  return (
    <Menu
      style={{
        backgroundColor: "darkorange",
        color: "white",
        fontSize: 18,
        border: "none",
      }}
      selectedKeys={[selectedKeys]}
      onClick={(item) => {
        //item.key
        navigate(item.key);
      }}
      mode={isInLine ? "inline" : "horizontal"}
      items={
        auth.roles[0] === "ROLE_MANAGER" ||
        auth.roles[0] === "ROLE_BRANCH" ||
        auth.roles[0] === "ROLE_DEPARTMENT"
          ? menuManager
          : menuUser
      }
    ></Menu>
  );
}

export default HeaderMenu;
