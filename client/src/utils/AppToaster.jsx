import React from "react";
import { Toaster } from "react-hot-toast";

function AppToaster() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={10}
      containerStyle={{
        top: 20,
      }}
      toastOptions={{
        duration: 3000,
        style: {
          padding: "14px 18px",
          borderRadius: "12px",
          fontWeight: "500",
          fontSize: "14px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          border: "1px solid #f1f1f1",
        },

        success: {
          iconTheme: {
            primary: "#16a34a",
            secondary: "#dcfce7",
          },
          style: {
            background: "#dcfce7", // more visible light green
            color: "#065f46", // dark green text
            borderLeft: "4px solid #16a34a",
          },
        },

        error: {
          iconTheme: {
            primary: "#dc2626",
            secondary: "#fee2e2",
          },
          style: {
            background: "#fee2e2", // visible light red
            color: "#7f1d1d", // dark red text
            borderLeft: "4px solid #dc2626",
          },
        },
      }}
    />
  );
}

export default AppToaster;
