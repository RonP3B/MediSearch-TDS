import { useContext } from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import ColorModeContext from "../../contexts/ColorModeContext";

const MessageBox = ({ position, avatarSrc, name, message, time }) => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const isLeft = position === "left";
  const flexDirection = isLeft ? "row" : "row-reverse";
  const alignItems = isLeft ? "flex-start" : "flex-end";
  const isDarkMode = colorMode.mode === "dark";
  const backgroundColor = isLeft
    ? isDarkMode
      ? theme.palette.grey[800]
      : theme.palette.grey[300]
    : theme.palette.primary.main;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection,
        alignItems,
        mb: 1,
        mx: 2,
      }}
    >
      <Avatar
        alt={name}
        src={avatarSrc}
        sx={{ width: 32, height: 32, mt: 0.5 }}
      />
      <Paper
        sx={{
          p: 2,
          maxWidth: "70%",
          wordWrap: "break-word",
          borderRadius: "15px",
          backgroundColor: backgroundColor,
          color: isLeft
            ? "inherit"
            : theme.palette.getContrastText(theme.palette.primary.main),
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            backgroundColor: backgroundColor,
            width: "12px",
            height: "20px",
            clipPath: isLeft
              ? "polygon(0 0, 100% 0, 100% 100%)"
              : "polygon(0 0, 100% 100%, 0 100%)",
            top: "50%",
            transform: "translateY(-50%)",
            left: isLeft ? "-12px" : "auto",
            right: isLeft ? "auto" : "-12px",
          },
        }}
      >
        <Typography variant="subtitle2">{name}</Typography>
        <Typography variant="body1">{message}</Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{
            fontSize: "0.7rem",
            textAlign: "right",
            color: isLeft
              ? "inherit"
              : theme.palette.getContrastText(theme.palette.primary.main),
          }}
        >
          {time}
        </Typography>
      </Paper>
    </Box>
  );
};

MessageBox.propTypes = {
  position: PropTypes.oneOf(["left", "right"]).isRequired,
  avatarSrc: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default MessageBox;
