import {
  Badge,
  Drawer,
  Dropdown,
  Menu,
  Space,
  Avatar,
  List,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import HeaderMenu from "./Menu";
import {
  MenuOutlined,
  BellFilled,
  DownOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./UserHeader.css";
import useLogout from "../../hooks/useLogout";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";

function UserHeader() {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [alarm, setAlarm] = useState([]);

  const items = [
    {
      key: "1",
      label: (
        <a
          onClick={() => {
            signOut();
          }}
        >
          "Logout"
        </a>
      ),
      icon: <LogoutOutlined />,
    },
  ];

  useEffect(() => {
    getAlarm();
  }, []);

  const getAlarm = async () => {
    await axiosPrivate
      .get("/api/hub/detail/alarm")
      .then((res) => {
        console.log(">>>>get list alarm", res.data);
        setAlarm(res.data);
      })
      .catch((err) => {
        console.log("get list alarm error", err);
      });
  };

  const signOut = async (e) => {
    console.log(">>>logout");
    await logout();
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("isLogin");
    navigate("/login");
  };

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

        <div className="notiRight">
          {auth.roles[0] === "ROLE_MANAGER" ? (
            <Badge
              count={alarm.length}
              // count={5}
            >
              <BellFilled
                style={{ fontSize: 18 }}
                onClick={() => {
                  setNotificationOpen(true);
                }}
              />
            </Badge>
          ) : (
            <></>
          )}

          <Dropdown
            menu={{
              items,
            }}
            className="m-10"
          >
            <div>
              <Space>
                <Avatar icon={<UserOutlined />} size={24} />
                <DownOutlined />
              </Space>
            </div>
          </Dropdown>
          <Drawer
            title="Notifications"
            open={notificationOpen}
            onClose={() => {
              setNotificationOpen(false);
            }}
            maskCloseable
          >
            <List
              dataSource={alarm}
              renderItem={(item) => {
                return (
                  <Link to={`/manager/hub/device/${item.hubDetailId}`}>
                    <List.Item>
                      Thiết bị{" "}
                      <strong>
                        {item.deviceName}({item.hubDetailId})
                      </strong>{" "}
                      tại Hub <strong>{item.hubName}</strong> của chi nhánh{" "}
                      <strong>{item.branchName}</strong> đã đến hạn bảo dưỡng
                    </List.Item>
                  </Link>
                );
              }}
            ></List>
          </Drawer>
        </div>
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
        {auth.roles[0] === "ROLE_MANAGER" ? (
          <Badge
            count={alarm.length}
            // count={5}
          >
            <BellFilled
              style={{ fontSize: 18 }}
              onClick={() => {
                setNotificationOpen(true);
              }}
            />
          </Badge>
        ) : (
          <></>
        )}
        <Dropdown
          menu={{
            items,
          }}
          className="m-10"
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <Avatar icon={<UserOutlined />} size={20} />
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </Drawer>
    </div>
  );
}

export default UserHeader;
