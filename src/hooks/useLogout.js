import React from "react";
import useAuth from "./useAuth";
import axios from "../API/axios";

const useLogout = () => {
  const { setAuth } = useAuth();
  const logout = async () => {
    setAuth({});
    try {
      const response = await axios("/api/auth/logout", {
        withCredentials: true,
      });
    } catch (err) {
      console.log("logout error", err);
    }
  };
  return logout;
};

export default useLogout;
