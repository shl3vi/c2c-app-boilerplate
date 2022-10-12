import { Fragment, MouseEvent, KeyboardEvent } from "react";
import { useRouter } from "next/router";
import Drawer from "@mui/material/Drawer";
import { ReactComponentProps } from "../types/types";

interface TempSideBarProps extends ReactComponentProps {
  isOpen: boolean;
  closeSideBar: (event: MouseEvent | KeyboardEvent) => void;
  ContentComp: React.FC<{
    closeSideBar: (event: MouseEvent | KeyboardEvent) => void;
  }>;
}

export const TempSideBar: React.FC<TempSideBarProps> = ({
  ContentComp,
  closeSideBar,
  isOpen,
}) => {
  const router = useRouter();

  const isRTL = router.locale === "he";
  const PaperProps = {
    style: {
      left: "unset",
      right: isRTL ? 0 : "unset",
    },
  };
  return (
    <div>
      <Fragment key={"filters-fragment"}>
        <Drawer
          PaperProps={PaperProps}
          anchor={"left"}
          open={isOpen}
          onClose={closeSideBar}
        >
          <ContentComp closeSideBar={closeSideBar} />
        </Drawer>
      </Fragment>
    </div>
  );
};
