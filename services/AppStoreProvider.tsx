import { observer } from "mobx-react-lite";
import { createContext, useContext } from "react";
import { Nullable, ReactComponentProps } from "../types/types";
import { AppStore } from "./AppStore";

export interface AppStoreStoreProviderProps extends ReactComponentProps{
  appStore: AppStore;
}

const appStoreContext = createContext<Nullable<AppStore>>(null);

export const AppStoreStoreProvider = observer(
  ({ children, appStore }: AppStoreStoreProviderProps) => {
    return (
      <appStoreContext.Provider value={appStore}>
        {children}
      </appStoreContext.Provider>
    );
  }
);

export const useAppStore = () => useContext(appStoreContext) as AppStore;
