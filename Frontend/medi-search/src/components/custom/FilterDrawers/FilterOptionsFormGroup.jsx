import PropTypes from "prop-types";
import FormGroup from "@mui/material/FormGroup";
import { alpha } from "@mui/material/styles";

const FilterOptionsFormGroup = ({ children }) => {
  return (
    <FormGroup
      sx={{
        border: (theme) => `2px solid ${theme.palette.primary.main}`,
        borderRadius: "12px",
        backgroundColor: (theme) => alpha(theme.palette.primary.light, 0.1),
        height: 165,
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      {children}
    </FormGroup>
  );
};

FilterOptionsFormGroup.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FilterOptionsFormGroup;
