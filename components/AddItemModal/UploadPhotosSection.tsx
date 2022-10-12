import Box from "@mui/material/Box";
import { Grid, Theme, useMediaQuery } from "@mui/material";
import { DragAndDropArea } from "../DragAndDrop";
import { UploadFilesButtonMobile } from "./UploadFilesButtonMobile";
import { ImagesPreviewsContainer } from "./ImagesPreviewsContainer";
import { useState } from "react";
import { Image } from "../../types/types";

export const UploadPhotosSection = () => {
  const [uploadedImages, setUploadedImages] = useState<Image[]>([]);
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  const handleFileAdded = (files: File[]) => {
    console.log({ files });
    setUploadedImages(
      files.map((f) => ({
        url: URL.createObjectURL(f),
      }))
    );
  };

  return (
    <>
      <Grid sx={{ height: hidden ? undefined : "100%" }} md={6} item>
        {hidden ? (
          <UploadFilesButtonMobile handleFileAdded={handleFileAdded} />
        ) : (
          <Box
            sx={{
              padding: "10px",
              height: "100%",
              boxSizing: "border-box",
            }}
          >
            <DragAndDropArea onDrop={handleFileAdded} />
          </Box>
        )}
      </Grid>
      <Grid md={6} item>
        <Box sx={{ padding: "10px" }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <ImagesPreviewsContainer
              images={uploadedImages}
              removeImage={() => {}}
            />
          </Grid>
        </Box>
      </Grid>
    </>
  );
};
