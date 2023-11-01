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
import DetailDevice from "./views/user/DetailDevice";
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

const ROLES = {
  User: "ROLE_USER",
  Manager: "ROLE_MANAGER",
  Admin: "ROLE_ADMIN",
};

function App() {
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
          <Layout allowedRoles={[ROLES.User, ROLES.Admin, ROLES.Manager]} />
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
                allowedRoles={[ROLES.User, ROLES.Admin, ROLES.Manager]}
              />
            }
          >
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Manager]} />}>
            <Route path="manager" element={<ManageHub />} />
            <Route path="manager/hub" element={<HubDetail />} />
            <Route
              path="manager/hub/device/:hubDetailId"
              element={<DetailDevice />}
            />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<DashBoard />} />
            <Route path="admin/device" element={<ListDevice />} />
            <Route path="admin/branch" element={<Branch />} />
            <Route path="admin/branch/add" element={<AddBranch />} />
            <Route path="admin/branch/:id" element={<EditBranch />} />
            <Route path="admin/users" element={<ListUser />} />
            <Route path="admin/users/:id" element={<EditUser />} />
            <Route path="admin/users/add" element={<AddUser />} />

            <Route path="admin/hub" element={<ListHub />} />
            <Route path="admin/hub/:id" element={<DetailHub />} />
          </Route>

          <Route
            element={
              <RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />
            }
          >
            <Route path="lounge" element={<Lounge />} />
          </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
