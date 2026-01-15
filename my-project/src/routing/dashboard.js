  import { createRootRoute } from "@tanstack/react-router"
 import { rootRoute } from "./routeTree.js"
import Dashboard from "../pages/Dashboard"
import { checkAuths } from "../utils/helper.js";



 

export const dashboardRoute = createRootRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: Dashboard, 
  beforeLoad: checkAuths,
});
