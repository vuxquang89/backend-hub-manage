import React, { useEffect } from "react";
import "./Header.css";

import { BellFilled } from "@ant-design/icons";
import { Badge, Drawer, Image, Space, Typography, List } from "antd";
import { getOrders } from "../../API";
import { useState } from "react";

function Header() {
  const [orders, setOrders] = useState([]);
  const [notificationOpen, setNotificationOpen] = useState(false);

  useEffect(() => {
    getOrders().then((res) => {
      setOrders(res.products);
    });
  });

  return (
    <div className="header">
      <Image width={40} src=""></Image>
      <Typography.Title>Admin Dashboard</Typography.Title>
      <Space>
        <Badge count={orders.length}>
          <BellFilled
            style={{ fontSize: 24 }}
            onClick={() => {
              setNotificationOpen(true);
            }}
          />
        </Badge>
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
