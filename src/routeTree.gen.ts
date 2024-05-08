/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as TokensImport } from './routes/tokens'
import { Route as LeaderboardImport } from './routes/leaderboard'
import { Route as CheckTokenImport } from './routes/check-token'
import { Route as IndexImport } from './routes/index'
import { Route as TokensIndexImport } from './routes/tokens/index'

// Create/Update Routes

const TokensRoute = TokensImport.update({
  path: '/tokens',
  getParentRoute: () => rootRoute,
} as any)

const LeaderboardRoute = LeaderboardImport.update({
  path: '/leaderboard',
  getParentRoute: () => rootRoute,
} as any)

const CheckTokenRoute = CheckTokenImport.update({
  path: '/check-token',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const TokensIndexRoute = TokensIndexImport.update({
  path: '/',
  getParentRoute: () => TokensRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/check-token': {
      preLoaderRoute: typeof CheckTokenImport
      parentRoute: typeof rootRoute
    }
    '/leaderboard': {
      preLoaderRoute: typeof LeaderboardImport
      parentRoute: typeof rootRoute
    }
    '/tokens': {
      preLoaderRoute: typeof TokensImport
      parentRoute: typeof rootRoute
    }
    '/tokens/': {
      preLoaderRoute: typeof TokensIndexImport
      parentRoute: typeof TokensImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  CheckTokenRoute,
  LeaderboardRoute,
  TokensRoute.addChildren([TokensIndexRoute]),
])

/* prettier-ignore-end */
