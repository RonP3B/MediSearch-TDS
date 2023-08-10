import { useState, useEffect, useRef } from "react";
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

const Favorites = () => {
  const [products, setProducts] = useState([]);
  const [pharmacies, setPharmacies] = useState([]);
  const [highestPrice, setHighestPrice] = useState(0);
  const [loading, setLoading] = useState(true);
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

        setHighestPrice(highestPrice);
        setProducts(productsArr);
      } catch (error) {
        if (error.response?.data?.Error === "ERR_JWT") return;
        showToastRef.current(
          "Ocurrió un error al obtener tus productos favoritos, informelo al equipo técnico",
          { type: "error" }
        );
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const res = await getFavoriteCompanies();
        setPharmacies(res.data.$values);
      } catch (error) {
        if (error.response?.data?.Error === "ERR_JWT") return;
        showToastRef.current(
          "Ocurrió un error al obtener tus farmacias favoritas, informelo al equipo técnico",
          { type: "error" }
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPharmacies();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ my: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
        Mis favoritos
      </Typography>
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
                  initialValues={{ values: products, setter: setProducts }}
                  initialHighestPrice={highestPrice}
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
                  initialValues={{ values: pharmacies, setter: setPharmacies }}
                />
              ),
            },
          ]}
        />
      )}
    </Container>
  );
};

export default Favorites;
