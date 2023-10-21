import React from "react";
import { Menu } from "antd";

function HeaderMenu({ isInLine = false }) {
  return (
    <Menu
      style={{
        backgroundColor: "darkorange",
        color: "white",
        fontSize: 24,
        border: "none",
      }}
      mode={isInLine ? "inline" : "horizontal"}
      items={[
        {
          label: "Trang chủ",
          key: "home",
        },
        {
          label: "Quản lý thiết bị",
          key: "device",
        },
      ]}
    ></Menu>
  );
}

export default HeaderMenu;
