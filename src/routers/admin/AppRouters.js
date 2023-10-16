import React from "react";
import { Route, Routes } from "react-router-dom";
import DashBoard from "../../views/admin/Dashboard";
import Inventory from "../../views/admin/Inventory";
import Orders from "../../views/admin/Orders";
import Customers from "../../views/admin/Customers";
import ListUser from "../../views/admin/ListUser";

class AppRouters extends React.Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/users" element={<ListUser />} />
      </Routes>
    );
  }
}

export default AppRouters;
