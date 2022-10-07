import { useRouter } from "next/router";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Typography from "@mui/material/Typography";
import { Item } from "../types/types";

interface GalleryItemProps {
  item: Item;
  onClick: (itemId: string) => void;
}

export const GalleryItem: React.FC<GalleryItemProps> = ({ item, onClick }) => {
  const router = useRouter();
  const isRTL = router.locale === "he";
  return (
    <ImageListItem sx={{ cursor: "pointer" }} onClick={() => onClick(item.id)}>
      <img
        src={`${item.mainImage.url}?w=248&fit=crop&auto=format`}
        srcSet={`${item.mainImage.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
        alt={item.title}
        loading="lazy"
      />
      <ImageListItemBar
        title={item.title}
        subtitle={
          <Typography noWrap>
            {item.description}
          </Typography>
        }
        actionPosition={isRTL ? "left" : "right"}
      />
    </ImageListItem>
  );
};
