import React from "react";
import "./Footer.css";
import logo from "../../assets/images/logo_login.png";

function Footer() {
  return (
    <div className="container-footer">
      <div className="footerStyle">
        <div className="logo">
          <img src={logo} alt="Logo SCTV" className="fas fa-bolt" />
          <span>Sống Động Từng Giây</span>
        </div>
      </div>
      <div className="copyright">&copy; SCTV 2023 - Phòng kỹ thuật</div>
    </div>
  );
}

export default Footer;
