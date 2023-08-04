import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";

const NoChats = ({ msg, chatSection, Icon }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "60vh",
      }}
    >
      <Icon sx={{ fontSize: 80, color: "primary.main" }} />
      <Typography variant="h6" sx={{ mt: 2 }}>
        {msg}
      </Typography>
      {chatSection && (
        <Typography variant="subtitle1">
          Selecciona de tus conversaciones existentes o crea una nueva
        </Typography>
      )}
      <Button variant="contained" startIcon={<AddIcon />} sx={{ mt: 2 }}>
        Nuevo chat
      </Button>
    </Box>
  );
};

NoChats.propTypes = {
  msg: PropTypes.string.isRequired,
  chatSection: PropTypes.bool.isRequired,
  Icon: PropTypes.elementType.isRequired,
};

export default NoChats;