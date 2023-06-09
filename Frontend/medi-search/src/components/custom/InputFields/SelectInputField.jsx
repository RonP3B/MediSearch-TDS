import { useField } from "formik";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const SelectInputField = ({ label, options, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <TextField
      select
      {...field}
      {...props}
      label={label}
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

SelectInputField.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};

export default SelectInputField;
