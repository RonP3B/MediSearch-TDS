import { useField } from "formik";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const MultipleSelectField = ({ options, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  const handleChange = (event, values) => {
    setValue(values);
  };

  return (
    <Autocomplete
      {...props}
      {...field}
      multiple
      disableCloseOnSelect
      options={options}
      getOptionLabel={(option) => option}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          {...props}
          error={meta.touched && !!meta.error}
          helperText={meta.touched && meta.error}
        />
      )}
    />
  );
};

MultipleSelectField.propTypes = {
  options: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
};

export default MultipleSelectField;
