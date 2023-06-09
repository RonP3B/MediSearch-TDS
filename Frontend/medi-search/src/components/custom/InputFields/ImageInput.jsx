import { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import DefaultAvatar from "../../../assets/images/DefaultAvatar.jpg";
import FileInputTextField from "./FileInputTextField";

const ImageInput = ({ name, label }) => {
  const [avatarImage, setAvatarImage] = useState(null);

  const handleFileChange = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => setAvatarImage(e.target.result);
    setAvatarImage(reader.readAsDataURL(file));
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
      <FileInputTextField
        onChange={handleFileChange}
        accept="image/*"
        label={label}
        id={name}
        name={name}
      />
    </Box>
  );
};

ImageInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default ImageInput;
