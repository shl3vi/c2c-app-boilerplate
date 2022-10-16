import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { Item, ReactComponentProps } from "../../types/types";

interface ItemQuickViewModalInfoSectionProps extends ReactComponentProps {
  item: Item;
}

export const ItemQuickViewModalInfoSection: React.FC<
  ItemQuickViewModalInfoSectionProps
> = ({ item }) => {
  const { t } = useTranslation("common");
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {item.title}
      </Typography>
      <Typography gutterBottom>{item.description}</Typography>
      <Typography gutterBottom>
        {t("itemQuickView.size", { size: item.size })}
      </Typography>
      <Typography gutterBottom>
        <Typography display={"inline"}>{`${item.price.price}`}</Typography>
        <Typography display={"inline"}>{`${item.price.currency}`}</Typography>
      </Typography>
    </Box>
  );
};
