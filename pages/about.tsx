import { Box, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { Page } from "../components/Page";
import { commonGetStaticProps } from "../services/commons";
import { StaticProps } from "../types/types";

export async function getStaticProps(args: StaticProps) {
  return commonGetStaticProps(args);
}

export default function About() {
  const { t } = useTranslation("common");
  return (
    <Box
      padding={"100px 50px 0 50px"}
      display={"flex"}
      justifyContent="center"
      alignItems={"center"}
      flexDirection="column"
    >
      <Typography variant="body1">{t("aboutUs.title")}</Typography>
      <Typography align="center" variant="h6">
        {t("aboutUs.message")}
      </Typography>
    </Box>
  );
}
