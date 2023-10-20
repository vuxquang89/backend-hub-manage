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

const items = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        Logout
      </a>
    ),
    icon: <LogoutOutlined />,
  },
];

function Header() {
  const [orders, setOrders] = useState([]);
  const [notificationOpen, setNotificationOpen] = useState(false);

  return (
    <div className="header">
      <Image width={40} src=""></Image>
      <Typography.Title>Admin Dashboard</Typography.Title>
      <Space>
        <>
          <Badge
            // count={orders.length}
            count={5}
          >
            <BellFilled
              style={{ fontSize: 24 }}
              onClick={() => {
                setNotificationOpen(true);
              }}
            />
          </Badge>

          <Dropdown
            menu={{
              items,
            }}
            className="m-10"
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Avatar icon={<UserOutlined />} />
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </>
      </Space>
      <Drawer
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
                has been ordered
              </List.Item>
            );
          }}
        ></List>
      </Drawer>
    </div>
  );
}

export default Header;
