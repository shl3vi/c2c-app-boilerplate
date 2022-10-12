import { observer } from "mobx-react-lite";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { ItemQuickViewModalImageSection } from "./ItemQuickViewModalImageSection";
import { ItemQuickViewModalInfoSection } from "./ItemQuickViewModalInfoSection";
import { Item, ReactComponentProps } from "../../types/types";

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
  item: Item;
}

export const ItemQuickViewModalContent: React.FC<
  ItemQuickViewModalContentProps
> = ({ item }) => {
  return (
    <Box sx={style}>
      <Grid container spacing={2} direction={"row-reverse"}>
        <Grid xs={12} sm={12} md={6} item>
          <ItemQuickViewModalImageSection item={item} />
        </Grid>
        <Grid xs={12} sm={12} md={6} item>
          <ItemQuickViewModalInfoSection item={item} />
        </Grid>
      </Grid>
    </Box>
  );
};
