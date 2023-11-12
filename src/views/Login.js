import { useRef, useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import "./Login.css";
import { Button, Col, Form, Input, Row, Typography, message } from "antd";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";

import axios from "../API/axios";
import SpanLoading from "../components/loading/SpanLoading";
const LOGIN_URL = "/api/auth/login";

const Login = ({ connectSocket }) => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const login = async (e) => {
    console.log(e);
    setFormLoading(true);
    try {
      const response = await axios.post(LOGIN_URL, { username, password });
      console.log(JSON.stringify(response?.data));

      const accessToken = response?.data?.accessToken;
      const refreshToken = response?.data?.refreshToken;
      const roles = response?.data?.roles;
      //const username = response?.data?.username;

      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("username", username);
      localStorage.setItem("isLogin", true);

      console.log(roles);

      setAuth({ username, roles, accessToken, refreshToken });
      setUsername("");
      setPassword("");
      if (roles[0] === "ROLE_ADMIN") {
        navigate("/admin", { replace: true });
      } else {
        navigate(from, { replace: true });
      }
      connectSocket();
      setFormLoading(false);
      message.success("Đăng nhập thành công");
    } catch (err) {
      setFormLoading(false);
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing username or password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login failed");
      }
      errRef.current.focus();
    }
  };
  return (
    <>
      <div className="appBg">
        <Form className="loginForm text-align-center" onFinish={login}>
          <Typography.Title>Đăng nhập</Typography.Title>
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
                message: "Cần nhập tên đăng nhập",
              },
              {
                pattern: new RegExp(/^[a-zA-Z0-9]*$/),
                message: "Không nhập khoảng trắng hoặc ký tự đặc biệt",
              },
            ]}
            label="Tên đăng nhập"
            name={"username"}
          >
            <Input
              placeholder="Tên đăng nhập"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Cần nhập mật khẩu",
              },
            ]}
            label="Mật khẩu"
            name={"password"}
          >
            <Input.Password
              placeholder="Mật khểu"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </Form>
      </div>
      <div className="bg"></div>
      {formLoading && <SpanLoading />}
    </>
  );
};

export default Login;
