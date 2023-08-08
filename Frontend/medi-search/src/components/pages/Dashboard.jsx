import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getStats } from "../../services/MediSearchServices/AdminServices";
import { useTheme } from "@mui/material/styles";
import useAuth from "../../hooks/persistence/useAuth";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
import WidgetSummary from "../custom/Dashboard/WidgetSummary";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import GroupIcon from "@mui/icons-material/Group";
import BusinessIcon from "@mui/icons-material/Business";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import CompaniesProvinces from "../custom/Dashboard/CompaniesProvinces";
import ProductsQuantities from "../custom/Dashboard/ProductsQuantities";
import ClassificationsQuantities from "../custom/Dashboard/ClassificationsQuantities";
import PopularProducts from "../custom/Dashboard/PopularProducts";
import useToast from "../../hooks/feedback/useToast";

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const { auth } = useAuth();
  const companyType = auth.payload.RoleType;
  const companyName = auth.payload.Company;
  const showToast = useToast();
  const showToastRef = useRef(showToast);

  useEffect(() => {
    console.count("Dashboard.jsx"); //borrame

    const fetchStats = async () => {
      try {
        const res = await getStats();
        setStats(res.data);
      } catch (error) {
        if (error.response?.data?.Error === "ERR_JWT") return;
        if (error.response.status === 404) return;
        showToastRef.current(
          "Ocurrió un error al obtener las estadisticas, informelo al equipo técnico",
          { type: "error" }
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [showToastRef]);

  return (
    <Container maxWidth="xl" sx={{ mb: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Bienvenido a MediSearch
      </Typography>
      <Typography variant="subtitle2" sx={{ mb: 5 }}>
        Manejo de &apos;{companyName}&apos;
      </Typography>
      <Grid container spacing={3} alignItems="center">
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          component={Link}
          to={!loading ? "/company/my-products" : ""}
          sx={{ textDecoration: "none" }}
        >
          {!loading ? (
            <WidgetSummary
              title="Mi productos"
              total={stats.myProducts}
              Icon={ShoppingCartIcon}
            />
          ) : (
            <Skeleton
              variant="rectangular"
              height={262}
              sx={{ borderRadius: 3 }}
            />
          )}
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          component={Link}
          to={!loading ? "/company/users" : ""}
          sx={{ textDecoration: "none" }}
        >
          {!loading ? (
            <WidgetSummary
              title="Mis usuarios"
              total={stats.myUsers}
              color="info"
              Icon={GroupIcon}
            />
          ) : (
            <Skeleton
              variant="rectangular"
              height={262}
              sx={{ borderRadius: 3 }}
            />
          )}
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          component={Link}
          to={
            !loading
              ? `/company/${companyType === "Farmacia" ? "labs" : "pharmacies"}`
              : ""
          }
          sx={{ textDecoration: "none" }}
        >
          {!loading ? (
            <WidgetSummary
              title={companyType === "Farmacia" ? "Laboratorios" : "Farmacias"}
              total={stats.opposingCompanies}
              color="error"
              Icon={BusinessIcon}
            />
          ) : (
            <Skeleton
              variant="rectangular"
              height={262}
              sx={{ borderRadius: 3 }}
            />
          )}
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          component={Link}
          to={!loading ? "/company/chat" : ""}
          sx={{ textDecoration: "none" }}
        >
          {!loading ? (
            <WidgetSummary
              title="Chats activos"
              total={stats.myChats}
              color="secondary"
              Icon={MarkUnreadChatAltIcon}
            />
          ) : (
            <Skeleton
              variant="rectangular"
              height={262}
              sx={{ borderRadius: 3 }}
            />
          )}
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          {!loading ? (
            <CompaniesProvinces
              sx={{ boxShadow: 3 }}
              title="Provincias destacadas"
              subheader={`Provincias con más ${
                companyType === "Farmacia" ? "laboratorios" : "farmacias"
              }`}
              chartData={stats.provinceCompanies.$values}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          ) : (
            <Skeleton
              variant="rectangular"
              height={500}
              sx={{ borderRadius: 2 }}
            />
          )}
        </Grid>
        <Grid item xs={12} md={6} lg={8}>
          {!loading ? (
            <ProductsQuantities
              sx={{ boxShadow: 3 }}
              title="Mis productos destacados"
              subheader="Mis productos con mayor cantidad en stock"
              chartData={stats.maxProducts.$values}
            />
          ) : (
            <Skeleton
              variant="rectangular"
              height={467}
              sx={{ borderRadius: 3 }}
            />
          )}
        </Grid>
        <Grid item xs={12} md={6} lg={8}>
          {!loading ? (
            <ClassificationsQuantities
              sx={{ boxShadow: 3 }}
              title="Mis clasificaciones destacadas"
              subheader="Mis clasificaciones con más productos"
              chartData={stats.maxClassifications.$values}
            />
          ) : (
            <Skeleton
              variant="rectangular"
              height={453}
              sx={{ borderRadius: 3 }}
            />
          )}
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          {!loading ? (
            <PopularProducts
              sx={{ boxShadow: 3 }}
              title="Mis productos populares"
              subheader="Mis productos con más comentarios"
              chartData={stats.maxInteractions.$values}
            />
          ) : (
            <Skeleton
              variant="rectangular"
              height={398}
              sx={{ borderRadius: 3 }}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
