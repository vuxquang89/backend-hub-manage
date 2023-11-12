import React from "react";
import useAuth from "./useAuth";
import axios from "../API/axios";

const useLogout = () => {
  const { setAuth } = useAuth();
  const logout = async () => {
    setAuth({});
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      const response = await axios.post(
        "/api/auth/logout",
        {
          refresh: refreshToken,
        },
        {
          headers: { Authorization: `Bearer ${refreshToken}` },
        },
        {
          withCredentials: true,
        }
      );
      console.log(">>>>>>>>>log out", response);
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("username");
      localStorage.removeItem("isLogin");
      // localStorage.setItem("isLogin", false);
    } catch (err) {
      console.log("logout error", err);
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("username");
      localStorage.removeItem("isLogin");
      // localStorage.setItem("isLogin", false);
    }
  };
  return logout;
};

export default useLogout;
