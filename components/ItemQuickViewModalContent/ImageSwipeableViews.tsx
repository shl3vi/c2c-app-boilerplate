import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Box, MobileStepper, Button, useTheme } from "@mui/material";
import { useState } from "react";
import SwipeableViews, { OnChangeIndexCallback } from "react-swipeable-views";
import { Image } from "../../types/types";

interface ImageSwipeableViewsProps {
  images: Image[];
  OnImageClicked: () => void;
}

export const ImageSwipeableViews: React.FC<ImageSwipeableViewsProps> = ({
  OnImageClicked: openFullScreenView,
  images,
}) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange: OnChangeIndexCallback = (step) => {
    setActiveStep(step);
  };

  return (
    <>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => {
          return (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
              key={step.url}
            >
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    height: 255,
                    display: "block",
                    overflow: "hidden",
                    objectFit: "contain",
                  }}
                  src={step.url}
                  alt={step.alt}
                  onClick={openFullScreenView}
                />
              ) : null}
            </Box>
          );
        })}
      </SwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </>
  );
};
