import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./context/auth.context.tsx";
import { CreditProvider } from "./context/credit.context.tsx";
import { ThemeProvider } from "./components/ui/theme.context.tsx";

// Routes
import Root from "./routes/root.route.tsx";
import ErrorPage from "./error-page.tsx";
import Pantry from "./routes/pantry.route.tsx";
import Credits from "./routes/credits.route.tsx";
import Profile from "./routes/profile.route.tsx";
import UserGuide from "./routes/user-guide.route.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Pantry />,
      },
      {
        path: "/buy",
        element: <Credits />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/help",
        element: <UserGuide />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <CreditProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </CreditProvider>
    </AuthProvider>
  </React.StrictMode>
);
