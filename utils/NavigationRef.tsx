import {
  createNavigationContainerRef,
  CommonActions,
} from "@react-navigation/native";
import { RootParamsList, RootScreensList } from "../constants/Constant";

export const navigationRef = createNavigationContainerRef<RootParamsList>();

export function navigate(name: RootScreensList, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function dispatch(name: RootScreensList, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name, params }],
      })
    );
  }
}
