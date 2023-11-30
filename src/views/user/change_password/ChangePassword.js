import React, { useRef, useState, useEffect } from "react";
import { Button, Col, Form, Input, Row, Typography, message } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SpanLoading from "../../../components/loading/SpanLoading";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useLogout from "../../../hooks/useLogout";
import { LockOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

function ChangePassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useLogout();
  const axiosPrivate = useAxiosPrivate();
  const from = location.state?.from?.pathname || "/";

  const errRef = useRef();

  const [passwordOld, setPasswordOld] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    setErrMsg("");
  }, [passwordOld, passwordNew]);

  const changePassword = async () => {
    if (passwordNew === passwordOld) {
      setErrMsg("Mật khẩu mới không được giống mật khẩu cũ");
      return;
    }

    setFormLoading(true);
    await axiosPrivate
      .post("/api/user/password/change", {
        passwordOld,
        passwordNew,
      })
      .then((res) => {
        console.log(">>>>get list hub detail", res.data);
        let result = res.data;
        if (result.status === 100) {
          message.success("Đổi mật khẩu thành công");
          setTimeout(() => {
            signOut();
          }, 400);
        } else {
          setErrMsg(result.message);
        }

        setFormLoading(false);
      })
      .catch((err) => {
        setFormLoading(false);
        message.error("Lỗi! Không thể đổi mật khẩu");
        navigate("/login", { state: { from: location }, replace: true });
      });
  };

  const signOut = async (e) => {
    await logout();

    navigate("/login", { state: { from: location }, replace: true });
  };

  return (
    <>
      <div className="appBg">
        <Form className="loginForm text-align-center" onFinish={changePassword}>
          <Typography.Title>Đổi mật khẩu</Typography.Title>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>

          <Form.Item
            rules={[
              {
                required: true,
                message: "Cần nhập mật khẩu cũ",
              },
              {
                pattern: new RegExp(/^[a-zA-Z0-9]*$/),
                message: "Không nhập khoảng trắng hoặc ký tự đặc biệt",
              },
              { min: 6, message: "Tối thiểu 6 ký tự" },
            ]}
            name={"passwordOld"}
            label="Mật khẩu cũ"
          >
            <Input.Password
              placeholder="Mật khẩu cũ"
              onChange={(e) => setPasswordOld(e.target.value)}
              prefix={<LockOutlined className="site-form-item-icon" />}
            />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Cần nhập mật khẩu mới",
              },
              {
                pattern: new RegExp(/^[a-zA-Z0-9]*$/),
                message: "Không nhập khoảng trắng hoặc ký tự đặc biệt",
              },
              { min: 6, message: "Tối thiểu 6 ký tự" },
            ]}
            name={"passwordNew"}
            label="Mật khẩu mới"
          >
            <Input.Password
              placeholder="Mật khẩu mới"
              onChange={(e) => setPasswordNew(e.target.value)}
              prefix={<LockOutlined className="site-form-item-icon" />}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Đổi mật khẩu
          </Button>
        </Form>
      </div>

      {formLoading && <SpanLoading />}
    </>
  );
}

export default ChangePassword;
