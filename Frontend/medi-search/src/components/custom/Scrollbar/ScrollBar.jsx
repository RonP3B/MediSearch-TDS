import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { alpha, styled } from "@mui/material/styles";

const StyledRootScrollbar = styled("div")(() => ({
  flexGrow: 1,
  height: "100%",
  overflow: "hidden",
}));

const StyledScrollbar = styled(SimpleBar)(({ theme }) => ({
  maxHeight: "100%",
  "& .simplebar-scrollbar": {
    "&:before": {
      backgroundColor: alpha(theme.palette.grey[600], 0.48),
    },
    "&.simplebar-visible:before": {
      opacity: 1,
    },
  },
  "& .simplebar-track.simplebar-vertical": {
    width: 10,
  },
  "& .simplebar-track.simplebar-horizontal .simplebar-scrollbar": {
    height: 6,
  },
  "& .simplebar-mask": {
    zIndex: "inherit",
  },
  "& .simplebar-placeholder": {
    width: "auto !important",
  },
}));

const ScrollBar = ({ children, sx, ...props }) => {
  const userAgent =
    typeof navigator === "undefined" ? "SSR" : navigator.userAgent;

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );

  if (isMobile) {
    return (
      <Box sx={{ overflowX: "auto", ...sx }} {...props}>
        {children}
      </Box>
    );
  }

  return (
    <StyledRootScrollbar>
      <StyledScrollbar
        timeout={3000}
        clickOnTrack={false}
        sx={{ "& .simplebar-content": sx }}
        {...props}
      >
        {children}
      </StyledScrollbar>
    </StyledRootScrollbar>
  );
};

ScrollBar.propTypes = {
  sx: PropTypes.object,
  children: PropTypes.node,
};

export default ScrollBar;
