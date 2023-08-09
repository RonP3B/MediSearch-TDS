import CustomTabs from "../custom/Tabs/CustomTabs";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Products from "./Products";
import Companies from "./Companies";

const Favorites = () => {
  return (
    <Container maxWidth="xl" sx={{ my: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
        Mis favoritos
      </Typography>
      <CustomTabs
        tabs={[
          {
            label: "productos",
            content: (
              <Products
                isCompany={false}
                logged={true}
                companyType="Farmacia"
                hideTitle={true}
              />
            ),
          },
          {
            label: "farmacias",
            content: (
              <Companies
                companyType="farmacia"
                logged={true}
                isCompany={false}
                hideTitle={true}
              />
            ),
          },
        ]}
      />
    </Container>
  );
};

export default Favorites;
