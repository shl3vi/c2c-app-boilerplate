import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Button,
  Grid,
} from "@mui/material";
import { UploadPhotosSection } from "./UploadPhotosSection";
import { useTranslation } from "next-i18next";
import { useAppStore } from "../../services/AppStoreProvider";

interface AddItemModalContentProps {
  close: () => void;
}

export const AddItemModalContent: React.FC<AddItemModalContentProps> = ({close}) => {
  const [itemTitle, setItemTitle] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState<number>(0);
  const [photos, setPhotos] = useState<File[]>([]);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const { t } = useTranslation("common");
  const appStore = useAppStore();

  const onSubmit = async () => {
    await appStore.createItem({
      title: itemTitle,
      description: itemDescription,
      price: {
        price: itemPrice,
        currency: '₪'
      },
      images: photos
    });
    close();
  }

  useEffect(() => {
    setSubmitDisabled((!itemTitle || !itemDescription || !itemPrice || !photos.length));
  }, [itemTitle, itemDescription, itemPrice, photos])

  return (
    <>
    <Box sx={{ marginTop: "28px" }}>
        <Grid container spacing={2}>
          <Grid xs={12} sm={6} item>
            <TextField
              required
              id="item-title-input"
              label={t("addItem.form.itemTitle.label")}
              value={itemTitle}
              onChange={(e) => setItemTitle(e.target.value)}
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid xs={12} sm={6} item>
            <TextField
              required
              id="price-input"
              label={t("addItem.form.itemPrice.label")}
              value={itemPrice}
              type="number"
              onChange={(e) => setItemPrice(Number(e.target.value))}
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid xs={12} item>
            <TextField
              required
              id="description-input"
              label={t("addItem.form.itemDescription.label")}
              multiline
              rows={2}
              maxRows={3}
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid xs={12} item container sx={{ marginTop: "20px" }}>
            <UploadPhotosSection photos={photos} setPhotos={setPhotos}/>
          </Grid>
        </Grid>
            
    </Box>
    <Button
        sx={{ 
        position: "absolute", bottom: "20px", left: "32px"
      }}
        variant="contained"
        onClick={onSubmit}
        disabled={submitDisabled}
      >
        {t('addItem.form.submit.label')}
      </Button>
    </>
  );
};
