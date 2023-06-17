import { useField } from "formik";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const SelectInputField = ({ label, options, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  return (
    <Autocomplete
      {...field}
      {...props}
      options={options}
      onChange={(_, value) => setValue(value)}
      renderInput={(params) => (
        <TextField
          {...props}
          {...params}
          label={label}
          error={meta.touched && !!meta.error}
          helperText={meta.touched && meta.error}
        />
      )}
    />
  );
};

SelectInputField.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};

export default SelectInputField;
