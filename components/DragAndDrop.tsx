import React, { useState } from "react";
import Dropzone from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Typography } from "@mui/material";
import { MAX_IMAGES_FOR_ITEM } from "../types/consts";
import { useTranslation } from "next-i18next";

export const DragAndDropArea = ({
  onDrop,
}: {
  onDrop: (files: File[]) => void;
}) => {
  const [showError, setShowError] = useState(false);
  const { t } = useTranslation("common");
  const containerId = "dropZone";
  
  const onDragEnter = () => {
    document
      .getElementById(containerId)
      ?.setAttribute("class", "drag-n-drop-container-dragenter");
  };

  const onDragLeave = () => {
    document
      .getElementById(containerId)
      ?.setAttribute("class", "drag-n-drop-container");
  };

  const onDropRejected = () => {
    setShowError(true);
  };

  return (
    <Dropzone
      onDrop={onDrop}
      accept={{
        "image/jpeg": [],
        "image/png": [],
      }}
      maxFiles={MAX_IMAGES_FOR_ITEM}
      onDropRejected={onDropRejected}
    >
      {({ getRootProps, getInputProps }) => (
        <section
          id={containerId}
          className="drag-n-drop-container"
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          {...getRootProps()}
        >
          <Box className="drag-n-drop-content">
            <input {...getInputProps()} />
            <CloudUploadIcon fontSize="large" />
            <Typography className="drag-n-drop-text">
              {t("addItem.form.uploadPhotos.dragNDrop.guidance")}
            </Typography>
            {showError && (
              <Typography
                color={"red"}
                fontSize={"12px"}
                className="drag-n-drop-text"
              >
                {t("addItem.form.uploadPhotos.validationError", {
                  numOfPhotos: MAX_IMAGES_FOR_ITEM,
                })}
              </Typography>
            )}
          </Box>
        </section>
      )}
    </Dropzone>
  );
};
