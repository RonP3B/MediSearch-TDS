import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useAuth from "../../hooks/persistence/useAuth";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import WidgetSummary from "../custom/Dashboard/WidgetSummary";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import GroupIcon from "@mui/icons-material/Group";
import BusinessIcon from "@mui/icons-material/Business";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import CompaniesProvinces from "../custom/Dashboard/CompaniesProvinces";
import ProductsQuantities from "../custom/Dashboard/ProductsQuantities";
import ClassificationsQuantities from "../custom/Dashboard/ClassificationsQuantities";
import CategoriesQuantities from "../custom/Dashboard/CategoriesQuantities";

const Dashboard = () => {
  const theme = useTheme();
  const { auth } = useAuth();
  const companyType = auth.payload.RoleType;
  const companyName = auth.payload.Company;

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
          to="/company/my-products"
          sx={{ textDecoration: "none" }}
        >
          <WidgetSummary
            title="Mi productos"
            total={125}
            Icon={ShoppingCartIcon}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          component={Link}
          to="/company/users"
          sx={{ textDecoration: "none" }}
        >
          <WidgetSummary
            title="Mis usuarios"
            total={25}
            color="info"
            Icon={GroupIcon}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          component={Link}
          to={`/company/${companyType === "Farmacia" ? "labs" : "pharmacies"}`}
          sx={{ textDecoration: "none" }}
        >
          <WidgetSummary
            title={companyType === "Farmacia" ? "Laboratorios" : "Farmacias"}
            total={23}
            color="error"
            Icon={BusinessIcon}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          component={Link}
          to="/company/chat"
          sx={{ textDecoration: "none" }}
        >
          <WidgetSummary
            title="Chats activos"
            total={7}
            color="secondary"
            Icon={MarkUnreadChatAltIcon}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CompaniesProvinces
            sx={{ boxShadow: 3 }}
            title="Provincias destacadas"
            subheader={`Provincias con más ${
              companyType === "Farmacia" ? "laboratorios" : "farmacias"
            }`}
            chartData={[
              { label: "Santo Domingo", value: 4344 },
              { label: "Santiago", value: 5435 },
              { label: "Distrito Nacional", value: 1443 },
              { label: "Manoguayabo", value: 4443 },
            ]}
            chartColors={[
              theme.palette.primary.main,
              theme.palette.info.main,
              theme.palette.warning.main,
              theme.palette.error.main,
            ]}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={8}>
          <ProductsQuantities
            sx={{ boxShadow: 3 }}
            title="Mis productos destacados"
            subheader="Mis productos con mayor cantidad en stock"
            chartData={[
              { label: "Italy", value: 400 },
              { label: "Japan", value: 430 },
              { label: "China", value: 448 },
              { label: "Canada", value: 44470 },
              { label: "France", value: 540 },
              { label: "Germany", value: 580 },
              { label: "South Korea", value: 690 },
              { label: "Netherlands", value: 1100 },
              { label: "United States", value: 1200 },
              { label: "United Kingdom", value: 1380 },
            ]}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={8}>
          <ClassificationsQuantities
            sx={{ boxShadow: 3 }}
            title="Mis clasificaciones destacadas"
            subheader="Mis clasificaciones con más productos"
            chartData={[
              { label: "Italy", value: 400 },
              { label: "Japan", value: 430 },
              { label: "China", value: 448 },
              { label: "Canada", value: 470 },
              { label: "France", value: 540 },
              { label: "Germany", value: 580 },
              { label: "South Korea", value: 690 },
              { label: "Netherlands", value: 1100 },
            ]}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CategoriesQuantities
            sx={{ boxShadow: 3 }}
            title="Mis productos populares"
            subheader="Mis productos con más comentarios"
            chartData={[
              { label: "Italy", value: 400 },
              { label: "Japan", value: 430 },
              { label: "China", value: 448 },
              { label: "Canada", value: 470 },
              { label: "France", value: 540 },
            ]}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
