import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useField } from "formik";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

const FileInputTextField = ({ onChange, accept, label, id, name }) => {
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [field, meta, helpers] = useField(name);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      onChange(file);
      helpers.setValue(file);
      setFileName(file.name);
    }
  };

  return (
    <>
      <input
        id={id}
        type="file"
        name={name}
        ref={inputRef}
        accept={accept}
        style={{ display: "none" }}
        onBlur={field.onBlur}
        onChange={(event) => handleFileChange(event)}
      />
      <Box onClick={() => inputRef.current.click()}>
        <TextField
          value={fileName}
          disabled
          fullWidth
          label={label}
          error={meta.touched && !!meta.error}
          helperText={meta.touched && meta.error}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end">
                  <AttachFileIcon sx={{ fontSize: 24 }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </>
  );
};

FileInputTextField.propTypes = {
  onChange: PropTypes.func.isRequired,
  accept: PropTypes.string,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default FileInputTextField;
