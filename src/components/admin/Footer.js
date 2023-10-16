import React from "react";
import "./Footer.css";
import { Typography } from "antd";

class Footer extends React.Component{
    render(){
        return (<div className="footer">
            <Typography.Link>+123456</Typography.Link>
        </div>)
    }
}

export default Footer;