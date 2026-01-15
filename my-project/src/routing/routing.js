 // src/routing/auth/login.route.js
// import { createRoute } from "@tanstack/react-router";
// import { authLayoutRoute } from "./auth.route";
// import LoginForm from "../components/loginForm.jsx";

// export const loginRoute = createRoute({
//   getParentRoute: () => authLayoutRoute,
//   path: "/auth/login",
//   component: LoginForm,
// });

// // src/routing/auth/register.route.js
// import { createRoute } from "@tanstack/react-router";
// import { authLayoutRoute } from "./auth.route";
// import RegisterForm from "../components/registerForm.jsx";

// export const registerRoute = createRoute({
//   getParentRoute: () => authLayoutRoute,
//   path: "/auth/register",
//   component: RegisterForm,
// });

import { createRootRoute } from '@tanstack/react-router';

// This is the root (parent) route used in all child route files like auth, dashboard, homepage etc.
export const routing = new createRootRoute({ id: 'root' });

