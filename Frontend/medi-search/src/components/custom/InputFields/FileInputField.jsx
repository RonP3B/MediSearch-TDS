import { useRef } from "react";
import PropTypes from "prop-types";
import { useField, useFormikContext } from "formik";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

const FileInputField = (props) => {
  const { onChange, accept, label, name, fileName, setFileName } = props;

  const inputRef = useRef(null);
  const [field, meta] = useField(name);
  const formik = useFormikContext();

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      onChange(file);
      formik.handleChange(event);
      setFileName(file.name);
    }
  };

  return (
    <>
      <input
        id={name}
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

FileInputField.propTypes = {
  onChange: PropTypes.func.isRequired,
  accept: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  setFileName: PropTypes.func.isRequired,
};

export default FileInputField;
