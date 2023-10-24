import { Drawer, Menu } from "antd";
import React, { useState } from "react";
import HeaderMenu from "./Menu";
import { MenuOutlined } from "@ant-design/icons";
import "./UserHeader.css";

function UserHeader() {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div>
      <div
        style={{
          backgroundColor: "darkorange",
          height: 40,
          paddingLeft: 12,
          paddingTop: 12,
        }}
        className="menuIcon"
      >
        <MenuOutlined
          style={{ color: "white", fontSize: 30 }}
          onClick={() => {
            setOpenMenu(true);
          }}
        />
      </div>
      <span className="headerMenu">
        <HeaderMenu />
      </span>
      <Drawer
        placement="left"
        open={openMenu}
        onClose={() => {
          setOpenMenu(false);
        }}
        closable={false}
        bodyStyle={{ backgroundColor: "darkorange" }}
      >
        <HeaderMenu isInLine />
      </Drawer>
    </div>
  );
}

export default UserHeader;
