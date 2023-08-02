import { useState, useEffect, useRef } from "react";
import {
  getAllLabs,
  getAllPharmacies,
} from "../../services/MediSearchServices/HomeServices";
import PropTypes from "prop-types";
import useToast from "../../hooks/feedback/useToast";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import TuneIcon from "@mui/icons-material/Tune";
import DomainDisabledIcon from "@mui/icons-material/DomainDisabled";
import CompanyCard from "../custom/Cards/CompanyCard";
import CompanyFilterDrawer from "../custom/FilterDrawers/CompanyFilterDrawer";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import useFilters from "../../hooks/filters/useFilters";

const Companies = ({ companyType }) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const showToast = useToast();
  const showToastRef = useRef(showToast);
  const {
    filters,
    clearFilters,
    filteredData: filteredCompanies,
  } = useFilters(companies, false);

  useEffect(() => {
    console.count("Companies.jsx"); //borrame
    let isMounted = true;

    const fetchCompanies = async () => {
      try {
        const res = await (companyType === "farmacia"
          ? getAllPharmacies()
          : getAllLabs());
        isMounted && setCompanies(res.data.$values);
      } catch (error) {
        if (error.response?.data?.Error === "ERR_JWT") return;
        if (error.response.status === 404) return;
        showToastRef.current(
          "Ocurrió un error al obtener las empresas, informelo al equipo técnico",
          { type: "error" }
        );
      } finally {
        isMounted && setLoading(false);
      }
    };

    fetchCompanies();

    return () => {
      isMounted = false;
    };
  }, [companyType]);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <Container maxWidth="xl" sx={{ mb: 2 }}>
      <CompanyFilterDrawer
        openFilter={openFilter}
        onCloseFilter={handleCloseFilter}
        filters={filters}
        onClear={clearFilters}
      />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {companyType.charAt(0).toUpperCase() + companyType.slice(1)}s
        </Typography>
        {!loading && companies.length > 0 && (
          <Button
            variant="contained"
            startIcon={<TuneIcon />}
            onClick={handleOpenFilter}
          >
            Filtros
          </Button>
        )}
      </Stack>
      {loading && (
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
      )}
      {!loading && companies.length === 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "55vh",
          }}
        >
          <DomainDisabledIcon sx={{ fontSize: 200, color: "primary.main" }} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            No hay {companyType}s registrados en la plataforma
          </Typography>
        </Box>
      )}
      {companies.length > 0 &&
        (filteredCompanies.length > 0 ? (
          <Grid container spacing={2}>
            {filteredCompanies.map((company) => (
              <Grid item key={company.id} xs={12} sm={6} md={4}>
                <CompanyCard company={company} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "55vh",
            }}
          >
            <FilterListOffIcon sx={{ fontSize: 200, color: "primary.main" }} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              No hay {companyType}s que cumplan con los filtros
            </Typography>
          </Box>
        ))}
    </Container>
  );
};

Companies.propTypes = {
  companyType: PropTypes.string.isRequired,
};

export default Companies;
