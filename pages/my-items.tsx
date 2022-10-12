import { Button } from "@mui/material";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AddItemModal } from "../components/AddItemModal/AddItemModal";
import { Page } from "../components/Page";
import { commonGetStaticProps } from "../services/commons";
import { StaticProps } from "../types/types";

export async function getStaticProps(args: StaticProps) {
  return commonGetStaticProps(args);
}

export default function MyItems() {
  const { t } = useTranslation("common");
  const router = useRouter();

  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState<boolean>(false);

  const openAddItemModal = () => {
    setIsAddItemModalOpen(true);
  };

  useEffect(() => {
    router.query["openAddProduct"] === "true" && setIsAddItemModalOpen(true);
  }, []);

  return (
    <Page>
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
    </Page>
  );
}
