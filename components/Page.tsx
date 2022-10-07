import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { observer } from "mobx-react-lite";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { LangSelector } from "../components/LangSelector";
import { useAppStore } from "../services/AppStoreProvider";
import { MenuIconButton } from "./Menu/MenuIconButton";
import { ReactComponentProps } from "../types/types";

interface PageProps extends ReactComponentProps {}

export const Page: React.FC<PageProps> = ({ children }) => {
  const router = useRouter();

  const navigateSearchPage = () => {
    router.push("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <MenuIconButton />
          <LangSelector />
          <Typography
            variant="h6"
            component="div"
            onClick={navigateSearchPage}
            sx={{ flexGrow: 1, textAlign: "center", cursor: "pointer" }}
          >
            FashionXChange
          </Typography>
          <HeaderUserLoginSection />
        </Toolbar>
      </AppBar>
      {children}
    </Box>
  );
};

const HeaderUserLoginSection = observer(() => {
  const store = useAppStore();
  if (!!store.currentUser) {
    return <Button color="inherit">{store.currentUser.displayName}</Button>;
  }
  return <LoginButton />;
});

const LoginButton = () => {
  const store = useAppStore();
  const { t } = useTranslation("common");
  return (
    <Button color="inherit" onClick={() => store.signIn()}>
      {t("header.login")}
    </Button>
  );
};
