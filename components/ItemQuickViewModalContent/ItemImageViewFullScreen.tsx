import * as React from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Image, ReactComponentProps } from "../../types/types";
import { ImageSwipeableViews } from "./ImageSwipeableViews";

const Transition: React.ForwardRefRenderFunction<any, any> = (props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
);

const ForwardedTransition = React.forwardRef<
  any,
  TransitionProps & ReactComponentProps
>(Transition);

interface ItemImageViewFullScreenProps {
  isOpen: boolean;
  close: () => void;
  images: Image[];
}

export const ItemImageViewFullScreen: React.FC<
  ItemImageViewFullScreenProps
> = ({ isOpen, close, images }) => {
  return (
    <Dialog
      fullScreen
      open={isOpen}
      onClose={close}
      TransitionComponent={ForwardedTransition}
    >
      <AppBar
        sx={{
          position: "relative",
          background: "transparent",
          boxShadow: "none",
          color: "inherit",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={close}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <ImageSwipeableViews images={images} OnImageClicked={() => {}} />
    </Dialog>
  );
};
