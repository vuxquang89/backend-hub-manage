import axios from "../API/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();
  console.log(">>>check refreshToken", auth.refreshToken);
  console.log(">>>>local store", localStorage.getItem("refreshToken"));
  const refreshToken = localStorage.getItem("refreshToken");
  const refresh = async () => {
    const response = await axios.post(
      "/api/token/refresh",
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
    setAuth((prev) => {
      console.log(">>>refresh token", JSON.stringify(prev));
      console.log(">>>access Token new ", response.data.accessToken);
      return {
        ...prev,
        roles: response.data.roles,
        accessToken: response.data.accessToken,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
