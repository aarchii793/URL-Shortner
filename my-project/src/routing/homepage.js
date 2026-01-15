import { createRootRoute } from '@tanstack.com/router';
import { rootRoute } from "./routeTree.js";
import HomePage from "../pages/HomePage";

export const homePageRoute = createRootRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});


