import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

const StyledIcon = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
}));

const WidgetSummary = ({
  title,
  total,
  Icon,
  color = "primary",
  sx,
  ...props
}) => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        py: 5,
        boxShadow: 0,
        textAlign: "center",
        color: (theme) => alpha(theme.palette[color].dark, 0.9),
        bgcolor: (theme) => alpha(theme.palette[color].light, 0.2),
        ...sx,
      }}
      {...props}
    >
      <StyledIcon
        sx={{
          color: (theme) => theme.palette[color].dark,
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha(
              theme.palette[color].dark,
              0
            )} 0%, ${alpha(theme.palette[color].dark, 0.24)} 100%)`,
        }}
      >
        <Icon sx={{ fontSize: 24 }} />
      </StyledIcon>
      <Typography variant="h3" sx={{ fontWeight: 700, lineHeight: 1.5 }}>
        {total}
      </Typography>
      <Typography
        variant="subtitle2"
        sx={{ opacity: 0.65, fontWeight: 600, lineHeight: 22 / 14 }}
      >
        {title}
      </Typography>
    </Card>
  );
};

WidgetSummary.propTypes = {
  color: PropTypes.string,
  Icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default WidgetSummary;
