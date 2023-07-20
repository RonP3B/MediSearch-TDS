import { useState, useEffect, useRef } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import EditProfileForm from "../custom/Forms/EditProfileForm";
import { getLoggedProfile } from "../../services/MediSearchServices/AdminServices";
import useToast from "../../hooks/feedback/useToast";
import useAuth from "../../hooks/persistence/useAuth";

const ASSETS = import.meta.env.VITE_MEDISEARCH;

const Profile = () => {
  const { auth } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const [edited, setEdited] = useState(0);
  const showToast = useToast();
  const showToastRef = useRef(showToast);

  useEffect(() => {
    console.count("Profile.jsx"); //Borrame
    let isMounted = true;

    const fetchProfile = async () => {
      try {
        isMounted && setLoading(true);
        const res = await getLoggedProfile();
        isMounted && setProfile(res.data);
      } catch (error) {
        if (error.response?.data?.Error === "ERR_JWT") return;
        showToastRef.current(
          "Ocurrió un error al obtener la información de tu perfil, informelo al equipo técnico",
          { type: "error" }
        );
      } finally {
        isMounted && setLoading(false);
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, [showToastRef, edited]);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container maxWidth="xl" sx={{ mb: 2 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
          Mi perfil
        </Typography>
        {!loading && (
          <>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={handleClickOpen}
            >
              Editar perfil
            </Button>
            <EditProfileForm
              open={open}
              handleClose={handleClose}
              profile={profile}
              setEdited={setEdited}
            />
          </>
        )}
      </Stack>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "70vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
            <Box
              component="img"
              sx={{
                height: 250,
                width: 250,
                borderRadius: "50%",
                border: "2px solid",
                borderColor: "primary.main",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              }}
              alt="Avatar"
              src={`${ASSETS}${profile.urlImage}`}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Box>
              <Typography
                variant="body1"
                gutterBottom
                sx={{ fontWeight: "normal" }}
              >
                <strong>Nombre:</strong> {profile.firstName} {profile.lastName}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography
                variant="body1"
                gutterBottom
                sx={{ fontWeight: "normal" }}
              >
                <strong>Dirección:</strong> {profile.address}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography
                variant="body1"
                gutterBottom
                sx={{ fontWeight: "normal" }}
              >
                <strong>Municipio:</strong> {profile.municipality}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography
                variant="body1"
                gutterBottom
                sx={{ fontWeight: "normal" }}
              >
                <strong>Provincia:</strong> {profile.province}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography
                variant="body1"
                gutterBottom
                sx={{ fontWeight: "normal" }}
              >
                <strong>Usuario:</strong> {auth.payload.sub}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography
                variant="body1"
                gutterBottom
                sx={{ fontWeight: "normal" }}
              >
                <strong>Correo:</strong> {auth.payload.email}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography
                variant="body1"
                gutterBottom
                sx={{ fontWeight: "normal" }}
              >
                <strong>Rol:</strong> {auth.payload.roles}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Profile;
