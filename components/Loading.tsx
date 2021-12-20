import React, { useContext } from "react";
import AwesomeAlert from "react-native-awesome-alerts";
import { Context as LoadingContext } from "../context/LoadingContext";
import { LoadingContextType } from "../context/ContextTypes";

const LoadingComponent: React.FC = () => {
  const { state }: LoadingContextType = useContext(LoadingContext);

  return (
    <AwesomeAlert
      show={state.show}
      title="Please wait..."
      showProgress={true}
      closeOnTouchOutside={false}
      closeOnHardwareBackPress={false}
      showCancelButton={false}
      showConfirmButton={false}
    />
  );
};

export default LoadingComponent;
