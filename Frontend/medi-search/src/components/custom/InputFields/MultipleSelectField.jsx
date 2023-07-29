import React from "react";
import { useField } from "formik";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const MultipleSelectField = React.forwardRef(({ options, ...props }, ref) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  const handleChange = (event, values) => {
    setValue(values);
  };

  React.useImperativeHandle(ref, () => ({
    getValue: () => field.value,
    setValue: (values) => setValue(values),
  }));

  return (
    <Autocomplete
      {...props}
      {...field}
      multiple
      disableCloseOnSelect
      options={options}
      getOptionLabel={(option) => option}
      onChange={handleChange}
      ref={ref}
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
});

MultipleSelectField.displayName = "MultipleSelectField";

MultipleSelectField.propTypes = {
  options: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
};

export default MultipleSelectField;
