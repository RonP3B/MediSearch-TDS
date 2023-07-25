import FilterDrawerContainer from "./FilterDrawerContainer";
import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import CompanyFilterContent from "./CompanyFilterContent";

const CompanyFilterDrawer = (props) => {
  const {
    openFilter,
    onCloseFilter,
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
    onClear,
  } = props;

  return (
    <FilterDrawerContainer
      openFilter={openFilter}
      onCloseFilter={onCloseFilter}
      onClear={onClear}
    >
      <Box sx={{ flex: 1, overflowY: "auto", p: 3 }}>
        <Stack spacing={3}>
          <CompanyFilterContent
            nameFilter={nameFilter}
            addressFilter={addressFilter}
            setNameFilter={setNameFilter}
            setAddressFilter={setAddressFilter}
            provinces={provinces}
            selectedProvince={selectedProvince}
            setSelectedProvince={setSelectedProvince}
            municipalities={municipalities}
            selectedMunicipalities={selectedMunicipalities}
            setSelectedMunicipalities={setSelectedMunicipalities}
          />
        </Stack>
      </Box>
    </FilterDrawerContainer>
  );
};

CompanyFilterDrawer.propTypes = {
  openFilter: PropTypes.bool.isRequired,
  onCloseFilter: PropTypes.func.isRequired,
  setNameFilter: PropTypes.func.isRequired,
  setAddressFilter: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  nameFilter: PropTypes.string.isRequired,
  addressFilter: PropTypes.string.isRequired,
  provinces: PropTypes.array.isRequired,
  selectedMunicipalities: PropTypes.array.isRequired,
  selectedProvince: PropTypes.string.isRequired,
  setSelectedProvince: PropTypes.func.isRequired,
  municipalities: PropTypes.array.isRequired,
  setSelectedMunicipalities: PropTypes.func.isRequired,
};

export default CompanyFilterDrawer;
