import { commonGetStaticProps } from "../services/commons";
import { StaticProps, UserSettingsContactTypes } from "../types/types";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListSubheader from "@mui/material/ListSubheader";
import Switch from "@mui/material/Switch";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useTranslation } from "next-i18next";
import { useAppStore } from "../services/AppStoreProvider";
import { Button, CircularProgress, Input } from "@mui/material";
import { observer } from "mobx-react-lite";
import { ChangeEventHandler, useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export async function getStaticProps(args: StaticProps) {
  return commonGetStaticProps(args);
}

export default function MyAccount() {
  const { t } = useTranslation();

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      subheader={
        <ListSubheader>{t("myAccount.contactInfo.title")}</ListSubheader>
      }
    >
      <ContactInformationItem type={"facebook"} />
      <ContactInformationItem type={"whatsapp"} />
    </List>
  );
}

interface ContactInformationItemProps {
  type: UserSettingsContactTypes;
}

type SettingValueState = "idle" | "sentUpdate" | "canSendUpdate";

const ContactInformationItem = observer(
  ({ type }: ContactInformationItemProps) => {
    const [settingValueState, setSettingValueState] =
      useState<SettingValueState>("idle");
    const store = useAppStore();
    const { t } = useTranslation();
    const settings = contactInfosTypeSettings[type];
    const contactInfo = store.myAccount.contactInfo[type];
    const { enabled, value } = contactInfo;
    const iconStyles = enabled ? { color: settings.iconColor } : {};

    const handleToggle = async () => {
      if (!value || settingValueState === "sentUpdate") {
        return;
      }
      setSettingValueState("sentUpdate");
      await store.setContactInfoState(type);
      setSettingValueState("idle");
    };

    const handleApprovingValue = async () => {
      setSettingValueState("sentUpdate");
      await store.setContactInfoValue();
      setSettingValueState("idle");
    };

    const handleValueChanged: ChangeEventHandler = (e) => {
      setSettingValueState("canSendUpdate");
      store.myAccount.contactInfo[type].value = (e.target as any).value;
    };

    return (
      <ListItem
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Switch
          edge="end"
          onChange={handleToggle}
          checked={enabled}
          inputProps={{
            "aria-labelledby": "switch-list-label-bluetooth",
          }}
        />
        <ListItemIcon>
          <settings.Icon sx={iconStyles} />
        </ListItemIcon>
        <Input
          value={value}
          onChange={handleValueChanged}
          placeholder={t(settings.placeholderKey)}
          prefix={"+972"}
        />
        {value && (
          <UpdateContactInfoButton
            state={settingValueState}
            handleApprovingValue={handleApprovingValue}
          />
        )}
      </ListItem>
    );
  }
);

const UpdateContactInfoButton = ({
  state,
  handleApprovingValue,
}: {
  state: SettingValueState;
  handleApprovingValue: () => {};
}) => {
  const { t } = useTranslation();

  if (state === "sentUpdate") {
    return <CircularProgress color="primary" size={20} />;
  }
  if (state === "idle") {
    return <CheckCircleOutlineIcon color="primary" />;
  }
  return (
    <Button onClick={handleApprovingValue} color="primary">
      {t("myAccount.contactInfo.updateValue")}
    </Button>
  );
};

type contactInfoTypeSettings = {
  Icon: any;
  placeholderKey: string;
  iconColor: string;
};

const contactInfosTypeSettings: {
  [key in UserSettingsContactTypes]: contactInfoTypeSettings;
} = {
  facebook: {
    placeholderKey: "myAccount.contactInfo.facebook.placeholder",
    Icon: FacebookIcon,
    iconColor: "#4267B2",
  },
  whatsapp: {
    placeholderKey: "myAccount.contactInfo.whatsapp.placeholder",
    Icon: WhatsAppIcon,
    iconColor: "#25D366",
  },
};
