import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import NextImage from "next/future/image";
import { Image } from "../../types/types";
import { MAX_IMAGES_FOR_ITEM } from "../../types/consts";
import LocalSeeIcon from "@mui/icons-material/LocalSee";

export const ImagesPreviewsContainer = ({
  images,
  removeImage,
}: {
  images: Image[];
  removeImage: (i: number) => void;
}) => {
  return (
    <>
      {Array.from(Array(MAX_IMAGES_FOR_ITEM)).map((_, i) => (
        <Grid item xs={2} sm={4} md={4} key={i}>
          <Box
            style={{
              padding: "5px",
              border: "solid 1px #1976d2",
            }}
            width={"80px"}
            height="80px"
            justifyContent={"center"}
            alignContent={"center"}
            flexDirection="column"
            display={"flex"}
          >
            {images[i] ? (
              <ImagePreview image={images[i]} removeImage={removeImage} />
            ) : (
              <ImagesPreviewPlaceholder />
            )}
          </Box>
        </Grid>
      ))}
    </>
  );
};

const ImagePreview = ({
  image,
  removeImage,
}: {
  image: Image;
  removeImage: (i: number) => void;
}) => {
  return (
    <NextImage
      style={{ objectFit: "contain", width: "100%", height: "100%" }}
      width={20} // required but cant pass string
      height={20} // required but cant pass string
      alt={image.alt || "an item photo"}
      src={image.url}
    />
  );
};

const ImagesPreviewPlaceholder = () => {
  return (
    <Box textAlign={"center"}>
      <LocalSeeIcon fontSize="large" color="disabled" />
    </Box>
  );
};
