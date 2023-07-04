import { useEffect } from "react";
import MediSearchApi from "../../APIs/MediSearchApi";
import useRefreshToken from "../../hooks/persistence/useRefreshToken";
import useAuth from "../../hooks/persistence/useAuth";

const MediSearchInterceptor = ({ children }) => {
  const { auth, setAuth } = useAuth();
  const { refreshAccessToken } = useRefreshToken();

  useEffect(() => {
    const requestIntercept = MediSearchApi.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"] && auth) {
          config.headers["Authorization"] = `Bearer ${auth.token}`;
        }

        return config;
      }
    );

    const responseIntercept = MediSearchApi.interceptors.response.use(
      (response) => {
        return response;
      },

      async (error) => {
        const prevRequest = error.config;
        const data = error?.response?.data;

        if (data?.Error === "ERR_JWT" && !prevRequest.sent) {
          prevRequest.sent = true;
          const newToken = await refreshAccessToken();

          if (!newToken) {
            setAuth({});
            return;
          }

          prevRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return MediSearchApi(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      MediSearchApi.interceptors.request.eject(requestIntercept);
      MediSearchApi.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refreshAccessToken, setAuth]);

  return children;
};

export default MediSearchInterceptor;
