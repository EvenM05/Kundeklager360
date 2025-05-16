import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "@mui/material";
import LoginPage from "./Pages/LoginPage";
import ComplaintOverview from "./Pages/ComplaintOverview";
import { theme } from "./Utils/ThemeOptions";
import RegisterPage from "./Pages/RegisterPage";
import { ProtectedRoute } from "./Utils/protectedRoute";

export default function App() {
  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        {
          path: "/ComplaintOverview",
          element: (
            <ProtectedRoute>
              <ComplaintOverview />
            </ProtectedRoute>
          ),
        },
        {
          path: "/register",
          element: <RegisterPage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
      ],
    },
  ]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router}></RouterProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}
