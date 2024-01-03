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
    {
      label: (
        <a
          href="https://drive.google.com/file/d/1CzCAkGe9naJ3s7txfmKmQb5fUMNwsfiC/view?usp=sharing"
          target="_blank"
          rel="Hướng dẫn sử dụng web"
        >
          Hỗ trợ
        </a>
      ),
      key: "support",
    },
  ];

  const menuLeader = [
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
    {
      label: "Quản lý User",
      key: "/manager/user",
    },
    {
      label: (
        <a
          href="https://drive.google.com/file/d/1CzCAkGe9naJ3s7txfmKmQb5fUMNwsfiC/view?usp=sharing"
          target="_blank"
          rel="Hướng dẫn sử dụng web"
        >
          Hỗ trợ
        </a>
      ),
      key: "support",
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
        auth.roles[0] === "ROLE_MANAGER" || auth.roles[0] === "ROLE_DEPARTMENT"
          ? menuManager
          : auth.roles[0] === "ROLE_BRANCH"
          ? menuLeader
          : menuUser
      }
    ></Menu>
  );
}

export default HeaderMenu;
