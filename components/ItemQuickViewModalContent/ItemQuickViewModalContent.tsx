import { observer } from "mobx-react-lite";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { useAppStore } from "../../services/AppStoreProvider";
import { ItemQuickViewModalImageSection } from "./ItemQuickViewModalImageSection";
import { ItemQuickViewModalInfoSection } from "./ItemQuickViewModalInfoSection";
import { Item, Nullable, ReactComponentProps } from "../../types/types";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  height: "80vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface ItemQuickViewModalContentProps extends ReactComponentProps {
  itemId: string;
}

export const ItemQuickViewModalContent: React.FC<ItemQuickViewModalContentProps> =
  observer(({ itemId }) => {
    const [item, setItem] = useState<Nullable<Item>>(null);
    const store = useAppStore();

    const fetchItem = async () => {
      await store.fetchItem(itemId);
      setItem(store.detailedItems[itemId]);
    };

    useEffect(() => {
      fetchItem();
    }, []);

    if (!item) {
      return <span>Loading</span>;
    }

    return (
      <Box sx={style}>
        <Grid container spacing={2} direction={"rtl" as any}>
          <Grid xs={6} sx={{ background: "red" }}>
            <ItemQuickViewModalImageSection item={item} />
          </Grid>
          <Grid xs={6}>
            <ItemQuickViewModalInfoSection item={item} />
          </Grid>
        </Grid>
      </Box>
    );
  });
