import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import DefaultAvatar from "../../../assets/images/DefaultAvatar.jpg";
import FileInputField from "./FileInputField";

const ImageInput = (props) => {
  const {
    name,
    label,
    avatarImage,
    setAvatarImage,
    fileName,
    setFileName,
    variant,
  } = props;

  const handleFileChange = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => setAvatarImage(e.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginY: 2,
      }}
    >
      <Box
        component="label"
        htmlFor={name}
        sx={{
          cursor: "pointer",
        }}
      >
        <Box
          component="img"
          sx={{
            height: 120,
            width: 120,
            borderRadius: "50%",
            border: "2px solid",
            borderColor: "primary.main",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            mr: 1,
          }}
          alt="Avatar"
          src={avatarImage || DefaultAvatar}
        />
      </Box>
      <FileInputField
        onChange={handleFileChange}
        accept="image/*"
        label={label}
        name={name}
        fileName={fileName}
        setFileName={setFileName}
        variant={variant}
      />
    </Box>
  );
};

ImageInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  avatarImage: PropTypes.any,
  setAvatarImage: PropTypes.func.isRequired,
  fileName: PropTypes.string.isRequired,
  setFileName: PropTypes.func.isRequired,
  variant: PropTypes.string,
};

export default ImageInput;
