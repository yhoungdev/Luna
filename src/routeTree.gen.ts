/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from "./routes/__root";
import { Route as TokensImport } from "./routes/tokens";
import { Route as LeaderboardImport } from "./routes/leaderboard";
import { Route as IndexImport } from "./routes/index";

// Create/Update Routes

const TokensRoute = TokensImport.update({
  path: "/tokens",
  getParentRoute: () => rootRoute,
} as any);

const LeaderboardRoute = LeaderboardImport.update({
  path: "/leaderboard",
  getParentRoute: () => rootRoute,
} as any);

const IndexRoute = IndexImport.update({
  path: "/",
  getParentRoute: () => rootRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    "/leaderboard": {
      preLoaderRoute: typeof LeaderboardImport;
      parentRoute: typeof rootRoute;
    };
    "/tokens": {
      preLoaderRoute: typeof TokensImport;
      parentRoute: typeof rootRoute;
    };
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  LeaderboardRoute,
  TokensRoute,
]);

/* prettier-ignore-end */
