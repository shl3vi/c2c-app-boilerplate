import { ChangeEventHandler, useRef, useState } from "react";
import { Button, Typography } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { MAX_IMAGES_FOR_ITEM } from "../../types/consts";
import { useTranslation } from "next-i18next";

export const UploadFilesButtonMobile = ({
  handleFileAdded,
}: {
  handleFileAdded: (files: File[]) => void;
}) => {
  const { t } = useTranslation("common");
  const [showError, setShowError] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  const onUploadClicked = (_e: React.SyntheticEvent) => {
    inputRef.current?.click();
  };

  const onFilesUploaded: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { files } = e.target;
    if (!files || files.length > MAX_IMAGES_FOR_ITEM) {
      setShowError(true);
      return;
    }
    setShowError(false);
    handleFileAdded(Array.from(files));
  };
  return (
    <>
      <input
        accept="image/*"
        id="uploadPhotosInput"
        name="uploadPhotosInput"
        type="file"
        onChange={onFilesUploaded}
        ref={inputRef as any}
        multiple
        hidden
      />
      <Button
        color="primary"
        aria-label="upload picture"
        onClick={onUploadClicked}
      >
        <PhotoCamera />
        <Typography>
          {t("addItem.form.uploadPhotos.button.label.mobile")}
        </Typography>
      </Button>
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
    </>
  );
};
