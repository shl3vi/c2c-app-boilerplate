import { AppBar, Box, Modal, Toolbar, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { AddItemModalContent } from "./AddItemModalContent";

interface AddItemModalProps {
  isOpen: boolean;
  close: () => void;
}

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
  overflow: 'auto',
  p: 4,
};

export const AddItemModal: React.FC<AddItemModalProps> = ({
  isOpen,
  close,
}) => {
  const { t } = useTranslation("common");
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <AppBar position="sticky">
        <Toolbar>
            <Typography sx={{ textAlign: "center"}} variant="subtitle1">{t("addItem.title")}</Typography>
        </Toolbar>
        </AppBar>
        <AddItemModalContent/>
        </Box>
      </Modal>
    </div>
  );
};
