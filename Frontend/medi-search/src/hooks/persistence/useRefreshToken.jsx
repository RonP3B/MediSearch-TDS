import MediSearchApi from "../../APIs/MediSearchApi";
import decodeJWT from "../../utils/decodeJWT";
import useAuth from "./useAuth";

const REFRESH_TOKEN_ENDPOINT = import.meta.env.VITE_MEDISEARCH_REFRESH_TOKEN;

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refreshAccessToken = async () => {
    let token = null;

    try {
      let res = await MediSearchApi.get("/Account/validate-refresh-token");
      const hasValidRefreshToken = res.data.validRefreshToken;

      if (!hasValidRefreshToken) return;

      res = await MediSearchApi.get(REFRESH_TOKEN_ENDPOINT);
      token = res.data.jwToken;
      setAuth({
        token: token,
        payload: decodeJWT(res.data.jwToken),
      });
    } catch (error) {
      console.log(error);
    }

    return token;
  };

  return { refreshAccessToken };
};

export default useRefreshToken;
