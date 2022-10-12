import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { useAppStore } from "../services/AppStoreProvider";
import { Item, Nullable, ReactComponentProps } from "../types/types";
import { ItemQuickViewModalContent } from "./ItemQuickViewModalContent/ItemQuickViewModalContent";

interface ItemQuickViewModalProps extends ReactComponentProps {
  isOpen: boolean;
  close: () => void;
  itemId?: string;
}

export const ItemQuickViewModal: React.FC<ItemQuickViewModalProps> = ({
  isOpen,
  close,
  itemId,
}) => {
  const [item, setItem] = useState<Nullable<Item>>(null);

  const store = useAppStore();

  const fetchItem = async () => {
    if (!store.detailedItems[itemId as string]) {
      await store.fetchItem(itemId as string);
    }
    setItem(store.detailedItems[itemId as string]);
  };

  useEffect(() => {
    itemId && fetchItem();
  }, [itemId]);

  const handleClose = () => {
    setItem(null);
    close();
  };

  if (!item) {
    return <span>Loading</span>;
  }

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {isOpen ? (
          <div>
            <ItemQuickViewModalContent item={item as Item} />
          </div>
        ) : (
          <></>
        )}
      </Modal>
    </div>
  );
};
