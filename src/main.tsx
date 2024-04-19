import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import WalletAdapter from "./providers/walletAdapterProvider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <RouterProvider router={router} />
      <App />
      <WalletAdapter>
        <App />
      </WalletAdapter>
    </QueryClientProvider>
  </React.StrictMode>,
);
