import PropTypes from "prop-types";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CommentIcon from "@mui/icons-material/Comment";

const CommentsAccordion = ({ children }) => {
  return (
    <Accordion sx={{ boxShadow: 2 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <CommentIcon />
        <Typography sx={{ ml: 1, fontWeight: "bold" }}>Comentarios</Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          maxHeight: 250,
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

CommentsAccordion.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CommentsAccordion;
