import { MouseEvent, KeyboardEvent, useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "next-i18next";
import ImageList from "@mui/material/ImageList";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { GalleryItem } from "./GalleryItem";
import { FiltersContainer } from "./FiltersContainer";
import { TempSideBar } from "./TempSideBar";
import { ItemQuickViewModal } from "./ItemQuickViewModal";
import { useAppStore } from "../services/AppStoreProvider";

export const Gallery = observer(() => {
  const store = useAppStore();
  const { t } = useTranslation("common");
  const [isFiltersSideBarOpen, setIsFiltersSideBarOpen] = useState(false);
  const [itemQuickViewProps, setItemQuickViewProps] = useState<{open: boolean; itemId?: string}>({
    open: false,
  });

  const toggleDrawer = (open: boolean) => (event: MouseEvent | KeyboardEvent) => {
    if (
      event.type === "keydown" &&
      ((event as KeyboardEvent).key === "Tab" || (event as KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setIsFiltersSideBarOpen(open);
  };

  const onGalleryItemClicked = (itemId: string) => {
    setItemQuickViewProps({
      open: true,
      itemId,
    });
  };

  return (
    <Box>
      <Button
        sx={{ marginTop: "20px" }}
        variant="contained"
        onClick={toggleDrawer(true)}
      >
        {t("gallery.filtersButton.label")}
      </Button>
      <TempSideBar
        ContentComp={FiltersContainer}
        closeSideBar={toggleDrawer(false)}
        isOpen={isFiltersSideBarOpen}
      />
      <ImageList
        sx={{
          gridTemplateColumns:
            "repeat(auto-fill, minmax(280px, 1fr))!important",
        }}
      >
        {store.items.map((item) => (
          <GalleryItem
            key={item.title}
            item={item}
            onClick={onGalleryItemClicked}
          />
        ))}
      </ImageList>
      <ItemQuickViewModal
        isOpen={itemQuickViewProps.open}
        close={() => setItemQuickViewProps({ open: false })}
        itemId={itemQuickViewProps.itemId}
      />
    </Box>
  );
});
