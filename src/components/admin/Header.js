import React, { useEffect } from "react";
import "./Header.css";

import {
  BellFilled,
  DownOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Drawer,
  Image,
  Space,
  Typography,
  List,
  Dropdown,
  Avatar,
} from "antd";
import { getOrders } from "../../API";
import { useState } from "react";
import useLogout from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo_login.png";

// const items = [
//   {
//     key: "1",
//     label: "Logout",
//     icon: <LogoutOutlined />,
//   },
// ];

function Header() {
  const logout = useLogout();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const items = [
    {
      key: "1",
      label: (
        <a
          onClick={() => {
            signOut();
          }}
          title="Đăng xuất"
        >
          Logout
        </a>
      ),
      icon: <LogoutOutlined />,
    },
  ];

  const signOut = async (e) => {
    await logout();
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("isLogin");
    navigate("/login");
  };

  return (
    <div className="header">
      <div className="logoStyle">
        <img src={logo} alt="Logo" />
      </div>
      <Typography.Title>Admin Page</Typography.Title>
      <Space>
        <>
          {/* <Badge
            // count={orders.length}
            count={5}
          >
            <BellFilled
              style={{ fontSize: 24 }}
              onClick={() => {
                setNotificationOpen(true);
              }}
            />
          </Badge> */}

          <Dropdown
            menu={{
              items,
            }}
            className="m-10"
          >
            <a
              onClick={() => {
                signOut();
              }}
            >
              <Space>
                <Avatar icon={<UserOutlined />} />
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </>
      </Space>
      {/* <Drawer
        title="Notifications"
        open={notificationOpen}
        onClose={() => {
          setNotificationOpen(false);
        }}
        maskCloseable
      >
        <List
          dataSource={orders}
          renderItem={(item) => {
            return (
              <List.Item>
                <Typography.Paragraph strong>{item.title}</Typography.Paragraph>{" "}
                
              </List.Item>
            );
          }}
        ></List>
      </Drawer> */}
    </div>
  );
}

export default Header;
