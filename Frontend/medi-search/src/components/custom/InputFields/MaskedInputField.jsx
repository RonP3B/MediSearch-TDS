import PropTypes from "prop-types";
import { useField } from "formik";
import MaskedInput from "react-text-mask";
import TextField from "@mui/material/TextField";

const MaskedInputField = ({ label, mask, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <MaskedInput
      {...field}
      {...props}
      mask={mask}
      guide={false}
      render={(ref, maskProps) => (
        <TextField
          {...maskProps}
          label={label}
          inputRef={ref}
          error={meta.touched && !!meta.error}
          helperText={meta.touched && meta.error}
        />
      )}
    />
  );
};

MaskedInputField.propTypes = {
  label: PropTypes.string.isRequired,
  mask: PropTypes.array.isRequired,
};

export default MaskedInputField;
