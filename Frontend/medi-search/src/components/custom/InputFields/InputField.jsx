import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import { useField } from "formik";

const InputField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <TextField
      {...field}
      {...props}
      label={label}
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error}
    />
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
};

export default InputField;
