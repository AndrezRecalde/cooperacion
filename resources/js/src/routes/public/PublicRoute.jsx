import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../hooks/auth/useAuthStore";

export const PublicRoute = ({ children }) => {
    const { user } = useAuthStore();
    return Object.entries(user).length !== 0 ? <Navigate to="/" /> : children;
};
