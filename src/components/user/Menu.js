import React from "react";
import { Menu } from "antd";

function HeaderMenu({ isInLine = false }) {
  return (
    <Menu
      style={{
        backgroundColor: "darkorange",
        color: "white",
        fontSize: 18,
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
        {
          label: "Contact US",
          key: "contact",
        },
      ]}
    ></Menu>
  );
}

export default HeaderMenu;
