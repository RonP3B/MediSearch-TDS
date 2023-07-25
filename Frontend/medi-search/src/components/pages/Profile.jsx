import PropTypes from "prop-types";
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
import {
  getLoggedCompanyProfile,
  getLoggedProfile,
} from "../../services/MediSearchServices/AdminServices";
import useToast from "../../hooks/feedback/useToast";
import useAuth from "../../hooks/persistence/useAuth";
import CompanySocials from "../custom/Socials/CompanySocials";

const ASSETS = import.meta.env.VITE_MEDISEARCH;

const Profile = ({ profileType }) => {
  const { auth } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const [edited, setEdited] = useState(0);
  const [profileInfo, setProfileInfo] = useState([]);
  const showToast = useToast();
  const showToastRef = useRef(showToast);

  useEffect(() => {
    console.count("Profile.jsx"); //Borrame
    let isMounted = true;

    const fetchProfile = async () => {
      try {
        isMounted && setLoading(true);

        const isCompany = profileType === "empresa";

        const res = await (isCompany
          ? getLoggedCompanyProfile()
          : getLoggedProfile());

        const data = res.data;

        const info = [
          {
            label: "Nombre",
            val: isCompany ? data.name : `${data.firstName} ${data.lastName}`,
          },
          { label: "Dirección", val: data.address },
          { label: "Municipio", val: data.municipality },
          { label: "Provincia", val: data.province },
          {
            label: "Correo electrónico",
            val: isCompany ? data.email : auth.payload.email,
          },
        ];

        if (isCompany) {
          info.push({ label: "Ceo", val: data.ceo });
          info.push({ label: "Teléfono", val: data.phone });
        }

        if (!isCompany) {
          info.push({ label: "Usuario", val: auth.payload.sub });
          info.push({ label: "Rol", val: auth.payload.roles });
        }

        if (isMounted) {
          setProfile(data);
          setProfileInfo(info);
        }
      } catch (error) {
        if (error.response?.data?.Error === "ERR_JWT") return;
        showToastRef.current(
          `Ocurrió un error al obtener la información de ${profileType}, informelo al equipo técnico`,
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
  }, [
    showToastRef,
    edited,
    profileType,
    auth.payload.email,
    auth.payload.sub,
    auth.payload.roles,
  ]);

  const hasSocials =
    profileType === "empresa" &&
    (profile.webSite ||
      profile.facebook ||
      profile.twitter ||
      profile.instagram);

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
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Mi {profileType}
        </Typography>
        {!loading && (
          <>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={handleClickOpen}
            >
              Editar {profileType}
            </Button>
            <EditProfileForm
              open={open}
              handleClose={handleClose}
              profile={profile}
              setEdited={setEdited}
              profileType={profileType}
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
        <>
          <Grid container spacing={2} alignItems="center" mb={4}>
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
                {profileInfo.map(({ label, val }, index) => {
                  const lastIndex = profileInfo.length - 1;
                  return (
                    <Box key={index}>
                      <Typography
                        variant="body1"
                        gutterBottom
                        sx={{ fontWeight: "normal" }}
                      >
                        <strong>{label}:</strong> {val}
                      </Typography>
                      {lastIndex !== index && <Divider sx={{ my: 1 }} />}
                    </Box>
                  );
                })}
              </Box>
            </Grid>
          </Grid>
          {hasSocials && (
            <CompanySocials
              webSite={profile.webSite}
              facebook={profile.facebook}
              instagram={profile.instagram}
              twitter={profile.twitter}
            />
          )}
        </>
      )}
    </Container>
  );
};

Profile.propTypes = {
  profileType: PropTypes.string.isRequired,
};

export default Profile;
