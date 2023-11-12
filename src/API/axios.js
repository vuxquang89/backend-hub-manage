import axios from "axios";
import { BASE_URL } from "../config/config";
// const BASE_URL = "http://10.255.254.111:8080/sctv";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  // headers: { "Content-Type": "application/json" },
  // withCredentials: true,
});
