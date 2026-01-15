
//  import { createRootRoute } from "@tanstack/react-router";
// import App from "../App";
// import { homePageRoute } from "./homepage";
// import { authLayoutRoute } from "./auth.route.js";
// import { dashboardRoute } from "./dashboard";

// export const rootRoute = createRootRoute({
//   component: App,
// });

// export const routeTree = rootRoute.addChildren([
//   homePageRoute,
//   authLayoutRoute,
//   dashboardRoute,
// ]);

import { routing } from './routing.js';
import { authLoginRoute, authRegisterRoute } from './auth.route.js';
import { homepageRoute } from './homepage';
import { dashboardRoute } from './dashboard';


export const routeTree = routing.addChildren([
  homepageRoute,
  dashboardRoute,
  authLoginRoute,
  authRegisterRoute,
  
]);
