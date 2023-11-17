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
import ScrollButton from "./ScrollButton";
import { BASE_URL } from "../config/config";
import MainBanner from "./banner/MainBanner";

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
    const isLogin = localStorage.getItem("isLogin");
    console.log(">>>>>>>>>layout", auth);
    if (isLogin) {
      console.log(">>>>>>>>>>>>>>>>>>>>> da dang nhap");
      console.log(">>>>>>>>>>>>isLogin ", isLogin);
      connect();
    } else {
      console.log(">>>>>>>>>>>>>>>>>>>>>> chua dang nhap");
      console.log(">>>>>>>>>>>>isLogin ", isLogin);
      setUserData({
        ...userData,
        connected: false,
        receiverName: "",
        username: "",
      });
    }
  }, [localStorage.getItem("isLogin")]);

  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>user data", userData);

  const connect = () => {
    const Sock = new SockJS(`${BASE_URL}/chat`);

    stomp = over(Sock);
    stomp.connect({}, onConnected, onError);
    setStompClient(stomp);
    console.log(">>>>>>>>>>>>>>>>>>connect socket");
  };

  const onConnected = () => {
    let name = auth?.username;
    if (name === undefined) {
      name = localStorage.getItem("username");
    }
    console.log(">>>>>>>>>connect.....");
    setUserData({
      ...userData,
      connected: true,
      receiverName: name,
      username: name,
    });

    console.log(">>>>>>>>>>>>>get user from auth", auth?.username);
    console.log(
      ">>>>>>>>>>>>>get user from auth",
      localStorage.getItem("username")
    );
    stomp.subscribe("/user/" + name + "/private", onPrivateMessage);
    userJoin(name, "JOIN MESSAGE");
    // loadMessage();
  };

  const userJoin = (username, message) => {
    var chatMessage = {
      senderName: username,
      action: "GET_ALARM",
      status: "JOIN",
    };
    stomp.send("/app/message", {}, JSON.stringify(chatMessage));
    console.log(">>>>>>>>>>>join message", username);

    var getMessage = {
      senderName: username,
      receiverName: username,
      message: message,
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
          <MainBanner />
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
          <ScrollButton />
        </>
      ) : (
        <>
          <UserHeader countAlarm={countAlarm} />
          <MainBanner />
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
          <ScrollButton />
        </>
      )}
    </div>
  ) : (
    <Outlet />
  );
};

export default Layout;
