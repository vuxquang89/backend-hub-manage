import React from "react";
import "./PageContent.css";
import AppRouters from "../../routers/admin/AppRouters";
import { Outlet } from "react-router-dom";

class PageContent extends React.Component {
  render() {
    return (
      <div className="page-content">
        <Outlet />
      </div>
    );
  }
}

export default PageContent;
