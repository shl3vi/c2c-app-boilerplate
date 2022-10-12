import Box from "@mui/material/Box";
import { Grid, Theme, useMediaQuery } from "@mui/material";
import { DragAndDropArea } from "../DragAndDrop";
import { UploadFilesButtonMobile } from "./UploadFilesButtonMobile";
import { ImagesPreviewsContainer } from "./ImagesPreviewsContainer";

interface UploadPhotosSectionProps {
  photos: File[];
  setPhotos: (photos: File[]) => void;
};

export const UploadPhotosSection: React.FC<UploadPhotosSectionProps> = ({photos, setPhotos}) => {
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  const photoFilesToImages = () => {
    return photos.map(p => ({ url: URL.createObjectURL(p)}))
  }

  const handleFileAdded = (files: File[]) => {
    setPhotos(files);
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
              images={photoFilesToImages()}
              removeImage={() => {}}
            />
          </Grid>
        </Box>
      </Grid>
    </>
  );
};
