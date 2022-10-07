import Modal from "@mui/material/Modal";
import { ReactComponentProps } from "../types/types";
import { ItemQuickViewModalContent } from "./ItemQuickViewModalContent/ItemQuickViewModalContent";

interface ItemQuickViewModalProps extends ReactComponentProps {
  isOpen: boolean;
  close: () => void;
  itemId?: string;
}

export const ItemQuickViewModal: React.FC<ItemQuickViewModalProps> = ({ isOpen, close, itemId }) => {
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ItemQuickViewModalContent itemId={itemId as string} />
      </Modal>
    </div>
  );
};
