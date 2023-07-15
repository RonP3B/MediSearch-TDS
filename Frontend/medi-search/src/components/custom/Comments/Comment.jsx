import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import ReplyIcon from "@mui/icons-material/Reply";

const Comment = ({ isReply, userAvatar, userName, comment, onClick }) => {
  return (
    <Paper
      sx={{
        display: "flex",
        marginBottom: "1rem",
        padding: 1,
      }}
    >
      <Avatar src={userAvatar} alt={userName} />
      <Box sx={{ ml: 1, width: "100%" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle2">{userName}</Typography>
          {!isReply && (
            <IconButton sx={{ padding: 0, ml: 0.2 }} onClick={onClick}>
              <ReplyIcon />
            </IconButton>
          )}
        </Box>
        <Typography variant="body2">{comment}</Typography>
      </Box>
    </Paper>
  );
};

Comment.propTypes = {
  isReply: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
  userAvatar: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Comment;
