import { useRouter } from "next/router";
import Menu from "@mui/material/Menu";
import { useTranslation } from "next-i18next";
import MenuItem from "@mui/material/MenuItem";
import { useAppStore } from "../../services/AppStoreProvider";
import { observer } from "mobx-react-lite";
import { Nullable } from "../../types/types";

interface MenuContentProps {
  anchorEl: Nullable<Element>;
  open: boolean;
  handleClose: () => void;
}

export const MenuContent: React.FC<MenuContentProps> = observer(
  ({ anchorEl, open, handleClose }) => {
    const store = useAppStore();
    const { t } = useTranslation("common");

    return (
      <div>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuNavigationItem
            label={t("menu.list.search")}
            path={"/"}
            closeMenu={handleClose}
          />
          <MenuNavigationItem
            label={t("menu.list.myAccount")}
            path={"/my-account"}
            closeMenu={handleClose}
          />
          <MenuNavigationItem
            label={t("menu.list.about")}
            path={"/about"}
            closeMenu={handleClose}
          />
          <MenuNavigationItem
            label={t("menu.list.logout")}
            path={"/"}
            sideEffects={() => store.signOut()}
            closeMenu={handleClose}
          />
        </Menu>
      </div>
    );
  }
);

interface MenuNavigationItemProps {
  label: string;
  path: string;
  sideEffects?: () => void;
  closeMenu: () => void;
}

const MenuNavigationItem: React.FC<MenuNavigationItemProps> = (
  { label, path, sideEffects = () => {}, closeMenu },
) => {
  const router = useRouter();

  const navigateToGivenPath = () => router.push(path);

  return (
    <MenuItem
      onClick={async () => {
        await sideEffects();
        closeMenu();
        navigateToGivenPath();
      }}
    >
      {label}
    </MenuItem>
  );
};
