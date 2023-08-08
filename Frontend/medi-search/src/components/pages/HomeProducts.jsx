import { useState, useEffect } from "react";
import CustomTabs from "../custom/Tabs/CustomTabs";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Products from "./Products";

const HomeProducts = () => {
  return (
    <Container maxWidth="xl" sx={{ my: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
        Productos
      </Typography>
      {false ? (
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
        <CustomTabs
          tabs={[
            {
              label: "de farmacias",
              content: (
                <Products
                  isCompany={false}
                  logged={false}
                  companyType="Farmacia"
                />
              ),
            },
            {
              label: "de laboratorios",
              content: (
                <Products
                  isCompany={false}
                  logged={false}
                  companyType="Laboratorio"
                />
              ),
            },
          ]}
        />
      )}
    </Container>
  );
};

export default HomeProducts;
