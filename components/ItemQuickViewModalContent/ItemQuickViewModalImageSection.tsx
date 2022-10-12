import { useState } from "react";
import Box from "@mui/material/Box";
import { Image, Item } from "../../types/types";
import { ItemImageViewFullScreen } from "./ItemImageViewFullScreen";
import { ImageSwipeableViews } from "./ImageSwipeableViews";

export const ItemQuickViewModalImageSection = ({ item }: { item: Item }) => {
  return (
    <SwipeableTextMobileStepper
      images={[item.mainImage, ...(item.images || [])]}
    />
  );
};

interface SwipeableTextMobileStepperProps {
  images: Image[];
}

const SwipeableTextMobileStepper: React.FC<SwipeableTextMobileStepperProps> = ({
  images,
}) => {
  const [isFullScreenViewOpen, setIsFullScreenViewOpen] =
    useState<boolean>(false);
  const closeFullscreenView = () => {
    setIsFullScreenViewOpen(false);
  };

  const openFullScreenView = () => {
    setIsFullScreenViewOpen(true);
  };

  return (
    <Box>
      <ImageSwipeableViews
        images={images}
        OnImageClicked={openFullScreenView}
      />
      <ItemImageViewFullScreen
        isOpen={isFullScreenViewOpen}
        close={closeFullscreenView}
        images={images}
      />
    </Box>
  );
};
