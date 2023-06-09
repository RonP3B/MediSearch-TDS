import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const FormNavigation = (props) => {
  return (
    <Box
      sx={{ display: "flex", marginTop: "2", justifyContent: "space-between" }}
    >
      <Button
        type="button"
        onClick={props.onBackClick}
        style={{ visibility: props.hasPrevious ? "visible" : "hidden" }}
      >
        Volver
      </Button>
      <Button type="submit" variant="contained">
        {props.isLastStep ? "Enviar" : "Siguiente"}
      </Button>
    </Box>
  );
};

FormNavigation.propTypes = {
  hasPrevious: PropTypes.bool.isRequired,
  onBackClick: PropTypes.func.isRequired,
  isLastStep: PropTypes.bool.isRequired,
};

export default FormNavigation;
