import { createFileRoute } from "@tanstack/react-router";
import IndexHompege from "../components/pages";

export const Route = createFileRoute("/")({
  component: () => <IndexHompege />,
});
