import PropTypes from "prop-types";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ImageSlider = ({ images, width, height }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Paper sx={{ maxWidth: width, flexGrow: 1 }} elevation={1}>
      <Carousel
        selectedItem={activeStep}
        onChange={handleStepChange}
        showArrows={false}
        showStatus={false}
        showThumbs={false}
        renderIndicator={() => null}
        autoPlay
        infiniteLoop
      >
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              style={{ height: height, display: "block", maxWidth: width }}
            />
          </div>
        ))}
      </Carousel>
      <MobileStepper
        steps={maxSteps}
        variant="dots"
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            sx={{ minWidth: "auto" }}
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button
            size="small"
            sx={{ minWidth: "auto" }}
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          </Button>
        }
        sx={{
          "& .css-1384nzf-MuiMobileStepper-dots": {
            overflow: "auto",
          },
        }}
      />
    </Paper>
  );
};

ImageSlider.propTypes = {
  images: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default ImageSlider;
