import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

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
      <Button
        type="submit"
        variant="contained"
        sx={{
          opacity: props.loading ? 0.5 : 1,
          ...(props.loading && { pointerEvents: "none" }),
        }}
      >
        {props.loading && (
          <CircularProgress
            size={17}
            color="inherit"
            sx={{ marginRight: 0.55 }}
          />
        )}
        {props.isLastStep
          ? "Enviar"
          : props.loading
          ? "Enviando..."
          : "Siguiente"}
      </Button>
    </Box>
  );
};

FormNavigation.propTypes = {
  hasPrevious: PropTypes.bool.isRequired,
  onBackClick: PropTypes.func.isRequired,
  isLastStep: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default FormNavigation;
