import { Navigate } from "react-router-dom";
import { retrieveFromStorage } from "./localStorage";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = retrieveFromStorage("token");

  if (!token) {
    return <Navigate to={"/login"} />;
  }

  return <>{children}</>;
};
