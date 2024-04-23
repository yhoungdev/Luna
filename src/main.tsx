import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import WalletAdapter from "./providers/walletAdapterProvider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <WalletAdapter>
        <App />
        <ToastContainer
         
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          theme="dark"
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </WalletAdapter>
    </QueryClientProvider>
  </React.StrictMode>,
);
