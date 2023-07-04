import { useRef } from "react";
import PropTypes from "prop-types";
import { useField, useFormikContext } from "formik";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

const MultipleFileInputField = ({ accept, label, name, ...props }) => {
  const inputRef = useRef(null);
  const [field, meta] = useField(name);
  const formik = useFormikContext();

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    if (files.length > 0) {
      formik.setFieldValue(name, files);
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
        multiple
      />
      <Box onClick={() => inputRef.current.click()}>
        <TextField
          value={
            field.value?.length > 0
              ? `${field.value.length} archivos seleccionados`
              : ""
          }
          disabled
          label={label}
          {...props}
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

MultipleFileInputField.propTypes = {
  accept: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default MultipleFileInputField;
