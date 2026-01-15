
// import React from "react";
// import ReactDOM from "react-dom/client";
// import {
//   RouterProvider,
//   createRouter,
// } from "@tanstack/react-router";
// import { routeTree } from "./routing/routeTree.js";
// import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
// import { createRoot } from "react-dom/client";
// import store from './store/store.js';
// import { Provider } from "react-redux";
// import "./index.css"


// const queryClient = new QueryClient()
// const router = createRouter({ 
//   routeTree,
//   context: {
//     queryClient,
//     store
//   }
//  });


// createRoot(document.getElementById('root')).render(
//   <Provider store={store}>
//  <QueryClientProvider client={queryClient}>
//      <RouterProvider router={router} />
//  </QueryClientProvider>
//  </Provider>
// )

// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.jsx";
import store from "./store/store.js";
import "./index.css"

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>
);
