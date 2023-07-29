import CompanyFilterContent from "./CompanyFilterContent";
import FilterDrawerContainer from "./FilterDrawerContainer";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Slider from "@mui/material/Slider";
import PropTypes from "prop-types";
import FilterOptionsFormGroup from "./FilterOptionsFormGroup";
import ScrollBar from "../Scrollbar/ScrollBar";
import handleSelectedCheckboxes from "../../../utils/handleSelectedCheckboxes";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

const ProductFilterDrawer = (props) => {
  const {
    openFilter,
    onCloseFilter,
    onClear,
    maxPrice,
    productNameFilter,
    setProductNameFilter,
    categories,
    selectedCategories,
    setSelectedCategories,
    priceFilter,
    setPriceFilter,
    quantityFilter,
    setQuantityFilter,
    companyFilters,
    companyNameFilter,
    addressFilter,
    setCompanyNameFilter,
    setAddressFilter,
    provinces,
    selectedProvince,
    setSelectedProvince,
    municipalities,
    selectedMunicipalities,
    loadingMunicipalities,
    setSelectedMunicipalities,
    setSelectedClassification,
    selectedClassification,
    classifications,
  } = props;

  return (
    <FilterDrawerContainer
      openFilter={openFilter}
      onCloseFilter={onCloseFilter}
      onClear={onClear}
    >
      <Box sx={{ flex: 1, overflowY: "auto", overflowX: "hidden", p: 3 }}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Clasificaciones:
            </Typography>
            <FilterOptionsFormGroup>
              <ScrollBar sx={{ display: "flex", flexDirection: "column" }}>
                <RadioGroup
                  onChange={(e) => {
                    setSelectedClassification(e.target.value);
                    setSelectedCategories([]);
                  }}
                  value={selectedClassification}
                >
                  {classifications.map((name, index) => (
                    <FormControlLabel
                      key={index}
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
              Categorías:
            </Typography>
            <FilterOptionsFormGroup>
              {categories.length === 0 ? (
                <Box
                  sx={{
                    minHeight: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ReportProblemIcon sx={{ fontSize: 50 }} color="primary" />
                  <Typography variant="body2" sx={{ fontWeight: 400 }}>
                    Selecciona 1 clasificación
                  </Typography>
                </Box>
              ) : (
                <ScrollBar sx={{ display: "flex", flexDirection: "column" }}>
                  {categories.map((name, index) => (
                    <FormControlLabel
                      key={index}
                      sx={{ margin: 0 }}
                      control={
                        <Checkbox
                          checked={selectedCategories.includes(name)}
                          onChange={() =>
                            handleSelectedCheckboxes(
                              selectedCategories,
                              setSelectedCategories,
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
          {companyFilters && (
            <CompanyFilterContent
              nameFilter={companyNameFilter}
              addressFilter={addressFilter}
              setNameFilter={setCompanyNameFilter}
              setAddressFilter={setAddressFilter}
              provinces={provinces}
              selectedProvince={selectedProvince}
              setSelectedProvince={setSelectedProvince}
              municipalities={municipalities}
              selectedMunicipalities={selectedMunicipalities}
              setSelectedMunicipalities={setSelectedMunicipalities}
              loadingMunicipalities={loadingMunicipalities}
            />
          )}
          <Box>
            <TextField
              label="Nombre del producto"
              variant="standard"
              value={productNameFilter}
              onChange={(e) => setProductNameFilter(e.target.value)}
              fullWidth
            />
          </Box>
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Rango de precio:
            </Typography>
            <Slider
              value={priceFilter}
              onChange={(event, newValue) => {
                setPriceFilter(newValue);
              }}
              valueLabelDisplay="auto"
              max={maxPrice}
              min={1}
            />
          </Box>
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Con cantidades a partir de:
            </Typography>
            <Slider
              value={quantityFilter}
              onChange={(event, newValue) => {
                setQuantityFilter(newValue);
              }}
              valueLabelDisplay="auto"
              min={0}
            />
          </Box>
        </Stack>
      </Box>
    </FilterDrawerContainer>
  );
};

ProductFilterDrawer.propTypes = {
  openFilter: PropTypes.bool.isRequired,
  onCloseFilter: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  companyFilters: PropTypes.bool.isRequired,
  maxPrice: PropTypes.number.isRequired,
  productNameFilter: PropTypes.string.isRequired,
  setProductNameFilter: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  selectedCategories: PropTypes.array.isRequired,
  setSelectedCategories: PropTypes.func.isRequired,
  priceFilter: PropTypes.array.isRequired,
  setPriceFilter: PropTypes.func.isRequired,
  quantityFilter: PropTypes.number.isRequired,
  setQuantityFilter: PropTypes.func.isRequired,
  setSelectedClassification: PropTypes.func.isRequired,
  selectedClassification: PropTypes.string.isRequired,
  classifications: PropTypes.array.isRequired,
  companyNameFilter: PropTypes.string,
  addressFilter: PropTypes.string,
  setCompanyNameFilter: PropTypes.func,
  setAddressFilter: PropTypes.func,
  provinces: PropTypes.array,
  selectedMunicipalities: PropTypes.array,
  selectedProvince: PropTypes.string,
  setSelectedProvince: PropTypes.func,
  municipalities: PropTypes.array,
  setSelectedMunicipalities: PropTypes.func,
  loadingMunicipalities: PropTypes.bool.isRequired,
};

export default ProductFilterDrawer;
