import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";

const CommentTextbox = ({
  label,
  sx,
  show,
  onClick,
  sendingComment,
  parentCommentId,
}) => {
  const [value, setValue] = useState("");
  const textFieldRef = useRef(null);

  useEffect(() => {
    if (show && textFieldRef.current) {
      textFieldRef.current.focus();
    }
  }, [show]);

  return (
    <Box display={show ? "block" : "none"}>
      <TextField
        inputRef={textFieldRef}
        multiline
        fullWidth
        disabled={sendingComment}
        label={label}
        sx={sx}
        maxRows={6}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        InputProps={{
          sx: { borderRadius: "25px" },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={
                  parentCommentId
                    ? () => onClick(value, setValue, parentCommentId)
                    : () => onClick(value, setValue)
                }
                onMouseDown={(e) => e.preventDefault()}
                color="primary"
                disabled={!value || sendingComment}
              >
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

CommentTextbox.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  sendingComment: PropTypes.bool.isRequired,
  sx: PropTypes.object,
  parentCommentId: PropTypes.string,
};

export default CommentTextbox;
