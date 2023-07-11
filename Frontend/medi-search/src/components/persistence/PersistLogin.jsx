import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/persistence/useAuth";
import useRefreshToken from "../../hooks/persistence/useRefreshToken";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const PersistLogin = () => {
  const { auth } = useAuth();
  const { refreshAccessToken } = useRefreshToken();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleAccessTokenRefresh = async () => {
      try {
        if (!auth.token) await refreshAccessToken();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    handleAccessTokenRefresh();
  }, [auth, refreshAccessToken]);

  return (
    <>
      {console.log(auth)}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "85vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
