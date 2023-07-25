import CompanyFilterContent from "./CompanyFilterContent";
import FilterDrawerContainer from "./FilterDrawerContainer";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Slider from "@mui/material/Slider";
import PropTypes from "prop-types";
import FilterOptionsFormGroup from "./FilterOptionsFormGroup";
import ScrollBar from "../Scrollbar/ScrollBar";
import handleSelectedCheckboxes from "../../../utils/handleSelectedCheckboxes";

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
    setSelectedMunicipalities,
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
              Categorías:
            </Typography>
            <FilterOptionsFormGroup>
              <ScrollBar sx={{ display: "flex", flexDirection: "column" }}>
                {categories.map(({ name, code }) => (
                  <FormControlLabel
                    key={code}
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
  priceFilter: PropTypes.number.isRequired,
  setPriceFilter: PropTypes.func.isRequired,
  quantityFilter: PropTypes.number.isRequired,
  setQuantityFilter: PropTypes.func.isRequired,
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
};

export default ProductFilterDrawer;
