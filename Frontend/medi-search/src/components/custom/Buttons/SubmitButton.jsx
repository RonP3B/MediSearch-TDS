import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const SubmitButton = ({ loading, text, loadingText, ...props }) => {
  return (
    <Button
      type="submit"
      {...props}
      sx={{
        opacity: loading ? 0.5 : 1,
        ...(loading && { pointerEvents: "none" }),
      }}
    >
      {loading && (
        <CircularProgress
          size={17}
          color="inherit"
          sx={{ marginRight: 0.55 }}
        />
      )}
      {loading ? loadingText : text}
    </Button>
  );
};

SubmitButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  loadingText: PropTypes.string.isRequired,
};

export default SubmitButton;
