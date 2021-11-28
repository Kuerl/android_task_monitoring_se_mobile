import { createNavigationContainerRef } from "@react-navigation/native";
import { RootParamsList, RootScreensList } from "../constants/Constant";

export const navigationRef = createNavigationContainerRef<RootParamsList>();

export function navigate(name: RootScreensList, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
