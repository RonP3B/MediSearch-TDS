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

const CompanyFilterContent = (props) => {
  const {
    nameFilter,
    addressFilter,
    setNameFilter,
    setAddressFilter,
    provinces,
    selectedProvince,
    setSelectedProvince,
    municipalities,
    selectedMunicipalities,
    setSelectedMunicipalities,
  } = props;

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
                setSelectedProvince(e.target.value);
                setSelectedMunicipalities([]);
              }}
              value={selectedProvince}
            >
              {provinces.map(({ name, code }) => (
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
          {municipalities.length === 0 ? (
            <Box
              sx={{
                minHeight: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LocationOffIcon sx={{ fontSize: 50 }} color="primary" />
              <Typography variant="body2" sx={{ fontWeight: 400 }}>
                Selecciona 1 provincia
              </Typography>
            </Box>
          ) : (
            <ScrollBar sx={{ display: "flex", flexDirection: "column" }}>
              {municipalities.map(({ name, code }) => (
                <FormControlLabel
                  key={code}
                  sx={{ margin: 0 }}
                  control={
                    <Checkbox
                      checked={selectedMunicipalities.includes(name)}
                      onChange={() =>
                        handleSelectedCheckboxes(
                          selectedMunicipalities,
                          setSelectedMunicipalities,
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
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          fullWidth
        />
      </Box>
      <Box>
        <TextField
          label="Dirección de la empresa"
          variant="standard"
          value={addressFilter}
          onChange={(e) => setAddressFilter(e.target.value)}
          fullWidth
        />
      </Box>
    </>
  );
};

CompanyFilterContent.propTypes = {
  setNameFilter: PropTypes.func.isRequired,
  setAddressFilter: PropTypes.func.isRequired,
  nameFilter: PropTypes.string.isRequired,
  addressFilter: PropTypes.string.isRequired,
  provinces: PropTypes.array.isRequired,
  selectedMunicipalities: PropTypes.array.isRequired,
  selectedProvince: PropTypes.string.isRequired,
  setSelectedProvince: PropTypes.func.isRequired,
  municipalities: PropTypes.array.isRequired,
  setSelectedMunicipalities: PropTypes.func.isRequired,
};

export default CompanyFilterContent;
