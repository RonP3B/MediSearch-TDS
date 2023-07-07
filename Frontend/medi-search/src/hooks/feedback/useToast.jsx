import { useContext } from "react";
import { toast } from "react-toastify";
import ColorModeContext from "../../components/contexts/ColorModeContext";

const useToast = () => {
  const colorMode = useContext(ColorModeContext);

  const showToast = (message, options = {}) => {
    const toastOptions = {
      ...options,
      theme: colorMode.mode,
    };

    toast(message, toastOptions);
  };

  return showToast;
};

export default useToast;
