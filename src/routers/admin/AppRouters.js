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

class AppRouters extends React.Component {
  render() {
    return (
      <Routes>
        <Route path="/admin" element={<DashBoard />} />
        {/* <Route path="/admin/inventory" element={<Inventory />} /> */}
        <Route path="/admin/orders" element={<Orders />} />
        <Route path="/admin/customers" element={<Customers />} />

        <Route path="/admin/users" element={<ListUser />}></Route>
        <Route path="/admin/users/:id" element={<EditUser />} />
        <Route path="/admin/users/add" element={<AddUser />} />

        <Route path="/admin/branch" element={<Branch />} />
        <Route path="/admin/branch/add" element={<AddBranch />} />
        <Route path="/admin/branch/:id" element={<EditBranch />} />

        <Route path="/admin/hub" element={<ListHub />} />
        <Route path="/admin/hub/:id" element={<DetailHub />} />
      </Routes>
    );
  }
}

export default AppRouters;
