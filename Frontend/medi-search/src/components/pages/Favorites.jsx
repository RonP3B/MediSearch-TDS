//Agregar endpoint

import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import CustomTabs from "../custom/Tabs/CustomTabs";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Products from "./Products";
import Companies from "./Companies";
import {
  getFavoriteCompanies,
  getFavoriteProducts,
} from "../../services/MediSearchServices/HomeServices";
import useToast from "../../hooks/feedback/useToast";

const Favorites = ({ isPharmacy, isLab }) => {
  const [products, setProducts] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [highestPrice, setHighestPrice] = useState(0);
  const [loadingProducts, setLoadingPropducts] = useState(!isLab);
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const showToast = useToast();
  const showToastRef = useRef(showToast);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getFavoriteProducts();
        const productsArr = res.data.$values;

        const highestPrice = productsArr.reduce((max, product) => {
          return product.price > max ? product.price : max;
        }, 0);

        const modifiedArray = productsArr.map((item) => {
          const { productId, ...rest } = item;
          return {
            ...rest,
            id: productId,
          };
        });

        setHighestPrice(highestPrice);
        setProducts(modifiedArray);
      } catch (error) {
        if (error.response?.data?.Error === "ERR_JWT") return;
        showToastRef.current(
          "Ocurrió un error al obtener tus productos favoritos, informelo al equipo técnico",
          { type: "error" }
        );
      } finally {
        setLoadingPropducts(false);
      }
    };

    !isLab && fetchProducts();
  }, [isLab]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await getFavoriteCompanies();

        const modifiedArray = res.data.$values.map((item) => {
          const { companyId, ...rest } = item;
          return {
            ...rest,
            id: companyId,
          };
        });

        setCompanies(modifiedArray);
      } catch (error) {
        if (error.response?.data?.Error === "ERR_JWT") return;
        showToastRef.current(
          "Ocurrió un error al obtener tus farmacias favoritas, informelo al equipo técnico",
          { type: "error" }
        );
      } finally {
        setLoadingCompanies(false);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ my: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
        Mis {isLab && "farmacias"} favorit{isLab ? "a" : "o"}s
      </Typography>
      {loadingProducts || loadingCompanies ? (
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
      ) : isLab ? (
        <Companies
          companyType="farmacia"
          logged={true}
          isCompany={true}
          hideTitle={true}
          initialValues={{ values: companies, setter: setCompanies }}
        />
      ) : (
        <CustomTabs
          tabs={[
            {
              label: isPharmacy ? "provisiones" : "productos",
              content: (
                <Products
                  isCompany={isPharmacy || isLab}
                  logged={true}
                  companyType={isPharmacy ? "Laboratorio" : "Farmacia"}
                  hideTitle={true}
                  initialValues={{ values: products, setter: setProducts }}
                  initialHighestPrice={highestPrice}
                />
              ),
            },
            {
              label: isPharmacy ? "laboratorios" : "farmacias",
              content: (
                <Companies
                  companyType={isPharmacy ? "laboratorio" : "farmacia"}
                  logged={true}
                  isCompany={isPharmacy || isLab}
                  hideTitle={true}
                  initialValues={{ values: companies, setter: setCompanies }}
                />
              ),
            },
          ]}
        />
      )}
    </Container>
  );
};

Favorites.propTypes = {
  isPharmacy: PropTypes.bool.isRequired,
  isLab: PropTypes.bool.isRequired,
};

export default Favorites;
