import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import "./Login.css";
import { Button, Form, Input, Typography, message } from "antd";

import axios from "../API/axios";
const LOGIN_URL = "/auth";

function Login() {
  const [setAuth] = useContext(AuthContext);
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const login = async (e) => {
    console.log(e);
    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify(e), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      console.log(JSON.stringify(response?.data));

      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      const username = e.username;

      setAuth({ username, roles, accessToken });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status == 400) {
        setErrMsg("Missing username or password");
      } else if (err.response?.status == 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login failed");
      }
      errRef.current.focus();
    }

    message.success("Đăng nhập thành công");
  };
  return (
    <div className="appBg">
      <Form className="loginForm" onFinish={login}>
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
          ]}
          label="Tên đăng nhập"
          name={"username"}
        >
          <Input placeholder="Tên đăng nhập" />
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
          <Input.Password placeholder="Mật khểu" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Đăng nhập
        </Button>
      </Form>
    </div>
  );
}

export default Login;
