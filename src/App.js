import { Space } from "antd";
import "./App.css";
import Header from "./components/admin/Header";
import SideMenu from "./components/admin/SideMenu";
import PageContent from "./components/admin/PageContent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserHeader from "./components/user/Header";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./views/Login";
import Missing from "./components/Missing";
import RequireAuth from "./components/RequireAuth";
import Home from "./views/user/Home";
import DetailDevice from "./views/user/detail_device/DetailDevice";
import DashBoard from "./views/admin/Dashboard";
import Lounge from "./components/Lounge";
import Unauthorized from "./components/Unauthorized";
import LinkPage from "./components/LinkPage";
import ListDevice from "./views/admin/device/ListDevice";
import Branch from "./views/admin/branch/Branch";
import AddBranch from "./views/admin/branch/AddBranch";
import EditBranch from "./views/admin/branch/EditBranch";
import ListUser from "./views/admin/users/ListUser";
import EditUser from "./views/admin/users/EditUser";
import AddUser from "./views/admin/users/AddUser";
import ListHub from "./views/admin/hub/ListHub";
import DetailHub from "./views/admin/hub/DetailHub";
import ManageHub from "./views/user/ManageHub";
import PersistentLogin from "./components/PersistentLogin";
import HubDetail from "./views/user/HubDetail";
import { useEffect, useState } from "react";
import { BASE_URL } from "./config/config";
import UserDepartment from "./views/admin/users/department/UserDepartment";
import AddUserDepartment from "./views/admin/users/department/AddUserDepartment";
import EditUserDepartment from "./views/admin/users/department/EditUserDepartment";
import UserManager from "./views/admin/users/branch/UserManager";
import AddUserManager from "./views/admin/users/branch/AddUserManager";
import EditUserManager from "./views/admin/users/branch/EditUserManager";
import ChangePassword from "./views/user/change_password/ChangePassword";
import SupportPage from "./components/SupportPage";

const ROLES = {
  User: "ROLE_USER",
  Manager: "ROLE_MANAGER",
  Branch: "ROLE_BRANCH",
  Department: "ROLE_DEPARTMENT",
  Admin: "ROLE_ADMIN",
};

const App = () => {
  const [countAlarm, setCountAlarm] = useState(0);
  const [stompClient, setStompClient] = useState();
  const [actionStatus, setActionStatus] = useState({ action: "", content: "" });
  const [userData, setUserData] = useState({
    // username: localStorage.getItem("username"),
    username: "",
    receiverName: "",
    connected: false,
    message: "",
  });

  const sendPrivateValue = (stompClient, message) => {
    if (stompClient) {
      // var chatMessage = {
      //   senderName: userData.username,
      //   receiverName: "vu",
      //   message: userData.message,
      //   status: "MESSAGE",
      //   action: "EDIT_MAINTENANCE",
      // };
      console.log(">>>>>>>>send message");
      stompClient.send("/app/private-message", {}, JSON.stringify(message));
    }
  };

  const sendPrivateActionValue = (stompClient, message) => {
    if (stompClient) {
      // var chatMessage = {
      //   senderName: userData.username,
      //   receiverName: "vu",
      //   message: userData.message,
      //   status: "MESSAGE",
      //   action: "EDIT_MAINTENANCE",
      // };
      console.log(">>>>>>>>send message", message);
      stompClient?.send("/app/private-message", {}, JSON.stringify(message));
    }
  };

  const receive = (stomp, to) => {
    stomp?.subscribe("/user/" + to + "/private", onPrivateMessage);
  };

  const onPrivateMessage = (payload) => {
    console.log(">>>>>>>>>receive message from stomp", payload);
    var payloadData = JSON.parse(payload.body);
    if (
      payloadData.action === "EDIT_MAINTENANCE" ||
      payloadData.action === "GET_ALARM" ||
      payloadData.action === "ADD_MAINTENANCE" ||
      payloadData.action === "DELETE_DEVICE" ||
      payloadData.action === "SWITCH_DEVICE"
    ) {
      setCountAlarm(payloadData.message);
    }
  };

  return (
    // <div className="App">
    //   {/* <Header /> */}
    //   {/* <div className="SideMenuAndPageContent">
    //     <SideMenu />
    //     <PageContent />
    //     <ToastContainer
    //       position="top-right"
    //       autoClose={5000}
    //       hideProgressBar={false}
    //       newestOnTop={false}
    //       closeOnClick
    //       rtl={false}
    //       pauseOnFocusLoss
    //       draggable
    //       pauseOnHover
    //       theme="light"
    //     >
    //       {/* Same as */}
    //   {/* </ToastContainer> */}
    //   {/* </div> */}

    //   {/* <UserHeader /> */}
    //   <PageContent />
    // </div>

    //<Layout allowedRoles={[ROLES.User, ROLES.Admin, ROLES.Manager]} />

    <Routes>
      <Route
        path="/"
        element={
          <Layout
            countAlarm={countAlarm}
            userData={userData}
            setActionStatus={setActionStatus}
            setUserData={setUserData}
            setCountAlarm={setCountAlarm}
            setStompClient={setStompClient}
            sendPrivateValue={sendPrivateValue}
            allowedRoles={[
              ROLES.User,
              ROLES.Admin,
              ROLES.Manager,
              ROLES.Branch,
              ROLES.Department,
            ]}
          />
        }
      >
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<PersistentLogin />}>
          <Route
            element={
              <RequireAuth
                allowedRoles={[
                  ROLES.User,
                  ROLES.Admin,
                  ROLES.Manager,
                  ROLES.Branch,
                  ROLES.Department,
                ]}
              />
            }
          >
            <Route path="/" element={<Home />} />
          </Route>

          <Route
            element={
              <RequireAuth
                allowedRoles={[ROLES.Manager, ROLES.Branch, ROLES.Department]}
              />
            }
          >
            <Route
              path="manager"
              element={
                <ManageHub
                  userData={userData}
                  stompClient={stompClient}
                  receive={receive}
                  actionStatus={actionStatus}
                  sendPrivateValue={sendPrivateActionValue}
                />
              }
            />
            <Route
              path="manager/hub"
              element={
                <HubDetail
                  stompClient={stompClient}
                  sendPrivateValue={sendPrivateActionValue}
                  actionStatus={actionStatus}
                  receive={receive}
                />
              }
            />
            <Route
              path="manager/hub/device/:hubDetailId"
              element={
                <DetailDevice
                  userData={userData}
                  stompClient={stompClient}
                  actionStatus={actionStatus}
                  receive={receive}
                  sendPrivateValue={sendPrivateActionValue}
                />
              }
            />

            <Route path="user/password/change" element={<ChangePassword />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<DashBoard />} />
            <Route path="admin/device" element={<ListDevice />} />
            <Route path="admin/branch" element={<Branch />} />
            <Route path="admin/branch/add" element={<AddBranch />} />
            <Route path="admin/branch/:id" element={<EditBranch />} />
            <Route path="admin/users/leader" element={<ListUser />} />
            <Route path="admin/users/leader/:id" element={<EditUser />} />
            <Route path="admin/users/leader/add" element={<AddUser />} />

            <Route path="admin/users/department" element={<UserDepartment />} />
            <Route
              path="admin/users/department/:id"
              element={<EditUserDepartment />}
            />
            <Route
              path="admin/users/department/add"
              element={<AddUserDepartment />}
            />

            <Route path="admin/users/manager" element={<UserManager />} />
            <Route
              path="admin/users/manager/add"
              element={<AddUserManager />}
            />
            <Route
              path="admin/users/manager/:id"
              element={<EditUserManager />}
            />

            <Route path="admin/hub" element={<ListHub />} />
            <Route path="admin/hub/:id" element={<DetailHub />} />

            <Route path="admin/password/change" element={<ChangePassword />} />
          </Route>

          <Route
            element={
              <RequireAuth
                allowedRoles={[
                  ROLES.Manager,
                  ROLES.Admin,
                  ROLES.Branch,
                  ROLES.Department,
                  ROLES.User,
                ]}
              />
            }
          >
            <Route path="support" element={<SupportPage />} />
          </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
};

export default App;
