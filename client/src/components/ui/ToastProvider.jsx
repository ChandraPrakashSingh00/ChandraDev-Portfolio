import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#151a25",
          color: "#ffffff",
          border: "1px solid #22d3ee",
          borderRadius: "12px",
        },
        success: {
          iconTheme: {
            primary: "#22d3ee",
            secondary: "#000",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#000",
          },
        },
      }}
    />
  );
};

export default ToastProvider;
