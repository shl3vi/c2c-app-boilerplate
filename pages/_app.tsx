import type { AppProps } from "next/app";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { appWithTranslation } from "next-i18next";
import { AppStoreStoreProvider } from "../services/AppStoreProvider";
import { AppStore } from "../services/AppStore";
import { observer } from "mobx-react-lite";
import "../styles/globals.css";
import "../styles/drag-and-drop.css";
import "../styles/page.css";
import { Page } from "../components/Page";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isRTL = router.locale === "he";
  const appStore = useRef(new AppStore({ isRTL }));
  const [readyState, setReadyState] = useState("not-ready");
  const [theme, setTheme] = useState(createTheme());

  const dir = isRTL ? "rtl" : "ltr";
  useEffect(() => {
    document.documentElement.dir = dir;
    setTheme(
      createTheme({
        direction: dir,
      })
    );
  }, [dir]);

  useEffect(() => {
    if (readyState === "not-ready") {
      appStore.current.init().then(() => {
        setReadyState("ready");
      });
      setReadyState("initiating");
    }
  }, []);

  if (readyState !== "ready") {
    return "Loading";
  }

  return (
    <AppStoreStoreProvider appStore={appStore.current}>
      <ThemeProvider theme={theme}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </ThemeProvider>
    </AppStoreStoreProvider>
  );
}

export default appWithTranslation(observer(MyApp as any));
