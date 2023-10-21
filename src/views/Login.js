import React from "react";
import "./Login.css";
import { Button, Form, Input, Typography, message } from "antd";

function Login() {
  const login = () => {
    message.success("Đăng nhập thành công");
  };
  return (
    <div className="appBg">
      <Form className="loginForm">
        <Typography.Title>Đăng nhập</Typography.Title>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Cần nhập tên đăng nhập",
            },
          ]}
          onFinish={login}
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
          <Input placeholder="Mật khểu" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Đăng nhập
        </Button>
      </Form>
    </div>
  );
}

export default Login;
