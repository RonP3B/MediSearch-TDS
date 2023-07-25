import PropTypes from "prop-types";
import FormGroup from "@mui/material/FormGroup";

const FilterOptionsFormGroup = ({ children }) => {
  return (
    <FormGroup
      sx={{
        border: (theme) => `2px solid ${theme.palette.primary.main}`,
        borderRadius: "12px",
        backgroundColor: "rgba(156, 39, 176, 0.04)",
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
