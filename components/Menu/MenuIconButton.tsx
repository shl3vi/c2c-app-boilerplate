import { MouseEvent, useState } from "react";
import { useRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { MenuContent } from "./MenuContent";
import { Nullable } from "../../types/types";

export const MenuIconButton = () => {
  const [anchorEl, setAnchorEl] = useState<Nullable<Element>>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const router = useRouter();
  const isLTR = router.locale !== "he";

  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        className="menuIconButton"
        onClick={handleClick}
        sx={{ mr: 2, padding: 0, paddingRight: isLTR ? "16px" : 0 }}
      >
        <MenuIcon />
      </IconButton>
      <MenuContent anchorEl={anchorEl} open={open} handleClose={handleClose} />
    </>
  );
};
