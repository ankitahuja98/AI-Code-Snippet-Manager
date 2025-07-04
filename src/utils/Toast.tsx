// src/components/Toast.tsx
import { ToastContainer, toast } from "react-toastify";
import type { ToastOptions, TypeOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = () => {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

// Toast trigger helper
export const showToast = (
  message: string,
  type: TypeOptions = "default",
  options?: ToastOptions
) => {
  toast(message, { type, ...options });
};

export default Toast;
