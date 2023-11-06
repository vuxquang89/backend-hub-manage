import { Outlet } from "react-router-dom";
import Header from "./admin/Header";
import SideMenu from "./admin/SideMenu";
import PageContent from "./admin/PageContent";
import { ToastContainer } from "react-toastify";
import useAuth from "../hooks/useAuth";
import UserHeader from "./user/Header";
import { useEffect } from "react";

import { over } from "stompjs";
import SockJS from "sockjs-client";

var stomp = null;

const Layout = ({
  allowedRoles,
  countAlarm,
  userData,
  setUserData,
  setCountAlarm,
  setStompClient,
  sendPrivateValue,
}) => {
  const { auth } = useAuth();

  useEffect(() => {
    if (localStorage.getItem("isLogin")) {
      console.log(">>>>>>>>>>>>>>>>>>>>> da dang nhap");
      connect();
    } else {
      console.log(">>>>>>>>>>>>>>>>>>>>>> chua dang nhap");
      setUserData({ ...userData, connected: false });
    }
  }, [localStorage.getItem("isLogin")]);

  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>user data", userData);

  const connect = async () => {
    const Sock = new SockJS(`http://localhost:8080/chat`);

    stomp = over(Sock);
    stomp.connect({}, onConnected, onError);
    setStompClient(stomp);
    console.log(">>>>>>>>>>>>>>>>>>connect socket");
  };

  const onConnected = () => {
    let name = localStorage.getItem("username");
    console.log(">>>>>>>>>connect.....");
    setUserData({
      ...userData,
      connected: true,
      receiverName: name,
      username: name,
    });

    stomp.subscribe(
      "/user/" + userData.username + "/private",
      onPrivateMessage
    );
    userJoin();
    // loadMessage();
  };

  const userJoin = () => {
    var chatMessage = {
      senderName: userData.username,
      action: "GET_ALARM",
      status: "JOIN",
    };
    stomp.send("/app/message", {}, JSON.stringify(chatMessage));
    console.log(">>>>>>>>>>>join message");

    var getMessage = {
      senderName: userData.username,
      receiverName: userData.username,
      message: userData.message,
      status: "MESSAGE",
      action: "GET_ALARM",
    };
    sendPrivateValue(stomp, getMessage);
    // stomp.connect({}, function (frame) {
    //   console.log(">>>>>>>>>>>>>> FRAME", frame);
    //   stomp.subscribe("/all/message", function (result) {
    //     console.log(">>>>>>>>>>>>>>get ALARM", result);
    //     onPrivateMessage(result);
    //   });
    // });
  };

  const onPrivateMessage = (payload) => {
    console.log(">>>>>>>>>receive message", payload);
    var payloadData = JSON.parse(payload.body);
    if (
      payloadData.action === "EDIT_MAINTENANCE" ||
      payloadData.action === "GET_ALARM"
    ) {
      setCountAlarm(payloadData.message);
    }
  };

  const onError = (err) => {
    console.log(err);
  };

  return auth?.roles?.find((role) => allowedRoles?.includes(role)) &&
    localStorage.getItem("isLogin") ? (
    // <main className="App">
    //   <Outlet />
    // </main>
    <div className="App">
      {auth.roles[0] === "ROLE_ADMIN" ? (
        <>
          <Header />
          <div className="SideMenuAndPageContent">
            <SideMenu />
            <PageContent />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            >
              Same as
            </ToastContainer>
          </div>
        </>
      ) : (
        <>
          <UserHeader countAlarm={countAlarm} />

          <PageContent />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          >
            Same as
          </ToastContainer>
        </>
      )}
    </div>
  ) : (
    <Outlet />
  );
};

export default Layout;
