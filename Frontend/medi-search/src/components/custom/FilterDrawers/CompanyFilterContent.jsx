import PropTypes from "prop-types";
import ScrollBar from "../Scrollbar/ScrollBar";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import LocationOffIcon from "@mui/icons-material/LocationOff";
import Box from "@mui/material/Box";
import FilterOptionsFormGroup from "./FilterOptionsFormGroup";
import handleSelectedCheckboxes from "../../../utils/handleSelectedCheckboxes";
import CircularProgress from "@mui/material/CircularProgress";

const CompanyFilterContent = ({ filters }) => {
  return (
    <>
      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Provincias:
        </Typography>
        <FilterOptionsFormGroup>
          <ScrollBar sx={{ display: "flex", flexDirection: "column" }}>
            <RadioGroup
              onChange={(e) => {
                filters.provinces.selectedSetter(e.target.value);
                filters.municipalities.selectedSetter([]);
              }}
              value={filters.provinces.selected}
            >
              {filters.provinces.values.map(({ name, code }) => (
                <FormControlLabel
                  key={code}
                  sx={{ margin: 0 }}
                  control={<Radio />}
                  label={name}
                  value={name}
                />
              ))}
            </RadioGroup>
          </ScrollBar>
        </FilterOptionsFormGroup>
      </Box>
      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Municipios:
        </Typography>
        <FilterOptionsFormGroup>
          {filters.municipalities.values.length === 0 ? (
            <Box
              sx={{
                minHeight: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {filters.municipalities.loading ? (
                <CircularProgress />
              ) : (
                <>
                  <LocationOffIcon sx={{ fontSize: 50 }} color="primary" />
                  <Typography variant="body2" sx={{ fontWeight: 400 }}>
                    Selecciona 1 provincia
                  </Typography>
                </>
              )}
            </Box>
          ) : (
            <ScrollBar sx={{ display: "flex", flexDirection: "column" }}>
              {filters.municipalities.values.map(({ name, code }) => (
                <FormControlLabel
                  key={code}
                  sx={{ margin: 0 }}
                  control={
                    <Checkbox
                      checked={filters.municipalities.selected.includes(name)}
                      onChange={() =>
                        handleSelectedCheckboxes(
                          filters.municipalities.selected,
                          filters.municipalities.selectedSetter,
                          name
                        )
                      }
                    />
                  }
                  label={name}
                />
              ))}
            </ScrollBar>
          )}
        </FilterOptionsFormGroup>
      </Box>
      <Box>
        <TextField
          label="Nombre de la empresa"
          variant="standard"
          value={filters.company.value}
          onChange={(e) => filters.company.setter(e.target.value)}
          fullWidth
        />
      </Box>
      <Box>
        <TextField
          label="Dirección de la empresa"
          variant="standard"
          value={filters.address.value}
          onChange={(e) => filters.address.setter(e.target.value)}
          fullWidth
        />
      </Box>
    </>
  );
};

CompanyFilterContent.propTypes = {
  filters: PropTypes.object.isRequired,
};

export default CompanyFilterContent;
