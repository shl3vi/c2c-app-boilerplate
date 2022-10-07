import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { DEFAULT_LOCALE } from "../types/consts";
import { StaticProps } from "../types/types";

export const commonGetStaticProps = async ({ locale }: StaticProps) => {
  if (!locale) {
    locale = DEFAULT_LOCALE;
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
