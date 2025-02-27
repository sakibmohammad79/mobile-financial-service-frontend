import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./Router/router";
import Providers from "./lib/providers/Providers";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <Providers>
    <StrictMode>
      <RouterProvider router={router}></RouterProvider>
      <Toaster position="top-center" />
    </StrictMode>
  </Providers>
);
//VITE_BACKEND_API_URL=https://mobile-financial-service-backend-nine.vercel.app
