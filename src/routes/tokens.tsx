import { createFileRoute } from "@tanstack/react-router";
import TokensPage from "../pages/token";

export const Route = createFileRoute("/tokens")({
  component: () => <TokensPage />,
});
