// import { createRoute } from "@tanstack/react-router";
// import { rootRoute } from "./routeTree.js";
// import AuthLayout from "../pages/AuthPage";

// export const authLayoutRoute = createRoute({
//   getParentRoute: () => rootRoute,
//   path: "/auth",
//   component: AuthLayout,
// });

import { Route } from '@tanstack/react-router';
import AuthPage from '../pages/AuthPage';
import { routing } from './routing.js'; // parent route

export const authLoginRoute = new Route({
  getParentRoute: () => routing,
  path: '/auth/login',
  component: AuthPage,
});

export const authRegisterRoute = new Route({
  getParentRoute: () => routing,
  path: '/auth/register',
  component: AuthPage,
});
