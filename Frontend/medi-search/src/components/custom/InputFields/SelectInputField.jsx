import React from "react";
import { useField } from "formik";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const SelectInputField = React.forwardRef(
  ({ label, options, setSelected, ...props }, ref) => {
    const [field, meta, helpers] = useField(props);
    const { setValue } = helpers;

    const handleChange = (event, value) => {
      setValue(value);
      if (setSelected) setSelected(value);
    };

    React.useImperativeHandle(ref, () => ({
      getValue: () => field.value,
      setValue: (value) => setValue(value),
    }));

    return (
      <Autocomplete
        {...field}
        {...props}
        options={options}
        onChange={handleChange}
        ref={ref}
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
  }
);

SelectInputField.displayName = "SelectInputField";

SelectInputField.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  setSelected: PropTypes.func,
};

export default SelectInputField;
