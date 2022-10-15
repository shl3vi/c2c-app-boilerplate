import { Button, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { AddItemModal } from "../components/AddItemModal/AddItemModal";
import { MyItemsTable } from "../components/MyItemsTable";
import { useAppStore } from "../services/AppStoreProvider";
import { commonGetStaticProps } from "../services/commons";
import { Item, StaticProps } from "../types/types";

export async function getStaticProps(args: StaticProps) {
  return commonGetStaticProps(args);
}

export default function MyItems() {
  const { t } = useTranslation("common");
  const appStore = useAppStore();
  const [myItems, setMyItems] = useState<Item[]>([]);

  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState<boolean>(false);

  const openAddItemModal = () => {
    setIsAddItemModalOpen(true);
  };

  useEffect(() => {
    appStore.getUserItems().then((items) => setMyItems(items));
  }, []);

  return (
    <>
      <Button
        sx={{ marginTop: "20px" }}
        variant="contained"
        onClick={openAddItemModal}
      >
        {t("myItems.openAddItemModalButton.label")}
      </Button>
      <AddItemModal
        isOpen={isAddItemModalOpen}
        close={() => setIsAddItemModalOpen(false)}
      />
      <Box marginTop="20px">
        {myItems.length ? (
          <MyItemsTable items={myItems} />
        ) : (
          <Typography marginTop={"15px"}>No items were added.</Typography>
        )}
      </Box>
    </>
  );
}
