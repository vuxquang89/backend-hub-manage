import axios from "../API/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();
  // console.log(">>>check refreshToken", auth.refreshToken);
  const refresh = async () => {
    const response = await axios.post(
      "/api/token/refresh",
      {
        refresh: auth.refreshToken,
      },
      {
        headers: { Authorization: `Bearer ${auth.refreshToken}` },
      },
      {
        withCredentials: true,
      }
    );
    setAuth((prev) => {
      console.log(">>>refresh token", JSON.stringify(prev));
      console.log(">>>access Token new ", response.data.accessToken);
      return { ...prev, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
