import React from "react";
import "./PageContent.css";
import AppRouters from "../../routers/admin/AppRouters";

class PageContent extends React.Component {
  render() {
    return (
      <div className="page-content">
        <AppRouters />
      </div>
    );
  }
}

export default PageContent;
