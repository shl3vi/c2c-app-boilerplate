import { useState } from "react";
import { useRouter } from "next/router";
import LanguageIcon from "@mui/icons-material/Language";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Nullable } from "../types/types";

export const LangSelector = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<Nullable<Element>>(null);

  const handleClick = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLocaleChange = (locale: string) => {
    handleClose();
    router.push(router.route, router.asPath, {
      locale,
    });
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <SelectButton onClick={handleClick} />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <LangsList onChangeLanguage={handleLocaleChange} />
      </Popover>
    </>
  );
};

const SelectButton = ({ onClick }: {onClick: (e: React.MouseEvent) => void}) => {
  return (
    <IconButton
      onClick={onClick}
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
    >
      <LanguageIcon />
    </IconButton>
  );
};

const LangsList = ({ onChangeLanguage }: {onChangeLanguage: (l: string) => void}) => {
  return (
    <List>
      <ListItem disablePadding>
        <ListItemButton onClick={() => onChangeLanguage("en")}>
          <ListItemText primary="English" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={() => onChangeLanguage("he")}>
          <ListItemText primary="עברית" />
        </ListItemButton>
      </ListItem>
    </List>
  );
};
