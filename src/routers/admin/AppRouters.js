import React from "react";
import { Route, Routes } from "react-router-dom";
import DashBoard from "../../views/admin/Dashboard";
import Orders from "../../views/admin/Orders";
import Customers from "../../views/admin/Customers";
import ListUser from "../../views/admin/users/ListUser";
import EditUser from "../../views/admin/users/EditUser";
import AddUser from "../../views/admin/users/AddUser";
import Branch from "../../views/admin/branch/Branch";
import AddBranch from "../../views/admin/branch/AddBranch";
import EditBranch from "../../views/admin/branch/EditBranch";
import ListHub from "../../views/admin/hub/ListHub";
import DetailHub from "../../views/admin/hub/DetailHub";
import ListDevice from "../../views/admin/device/ListDevice";
import Home from "../../views/user/Home";
import Login from "../../views/Login";
import DetailDevice from "../../views/user/detail_device/DetailDevice";
import LinkPage from "../../components/LinkPage";
import Unauthorized from "../../components/Unauthorized";
import PersistentLogin from "../../components/PersistentLogin";
import RequireAuth from "../../components/RequireAuth";
import ManageHub from "../../views/user/ManageHub";
import Lounge from "../../components/Lounge";
import Missing from "../../components/Missing";

const ROLES = {
  User: "ROLE_USER",
  Manager: "ROLE_MANAGER",
  Admin: "ROLE_ADMIN",
};
class AppRouters extends React.Component {
  render() {
    return (
      <Routes>
        <Route>
          {/* public routes */}
          <Route path="login" element={<Login />} />
          <Route path="linkpage" element={<LinkPage />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* we want to protect these routes */}
          <Route element={<PersistentLogin />}>
            <Route
              element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}
            >
              <Route path="/" element={<Home />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Manager]} />}>
              <Route path="manager" element={<ManageHub />} />
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
        {/* <Route path="/admin" element={<DashBoard />} />
        {/* <Route path="/admin/inventory" element={<Inventory />} /> */}
        {/* <Route path="/admin/orders" element={<Orders />} />
        <Route path="/admin/customers" element={<Customers />} />

        <Route path="/admin/users" element={<ListUser />}></Route>
        <Route path="/admin/users/:id" element={<EditUser />} />
        <Route path="/admin/users/add" element={<AddUser />} />

        <Route path="/admin/branch" element={<Branch />} />
        <Route path="/admin/branch/add" element={<AddBranch />} />
        <Route path="/admin/branch/:id" element={<EditBranch />} />

        <Route path="/admin/hub" element={<ListHub />} />
        <Route path="/admin/hub/:id" element={<DetailHub />} />

        <Route path="/admin/device" element={<ListDevice />} />

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/device/:id" element={<DetailDevice />} />  */}
      </Routes>
    );
  }
}

export default AppRouters;
