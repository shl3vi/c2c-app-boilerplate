import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Item, ReactComponentProps } from "../../types/types";

interface ItemQuickViewModalInfoSectionProps extends ReactComponentProps {
  item: Item;
}

export const ItemQuickViewModalInfoSection: React.FC<ItemQuickViewModalInfoSectionProps> = ({ item }) => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {item.title}
      </Typography>
      <Typography gutterBottom>{item.description}</Typography>
      {item.price && (
        <Typography
          gutterBottom
        >{`${item.price.price}${item.price.currency}`}</Typography>
      )}
    </Box>
  );
};
