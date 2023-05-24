import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = ({
    user,
    redirectPath = "/auth/login",
    children,
}) => {
    return Object.entries(user).length === 0 ? (
        <Navigate to={redirectPath} replace />
    ) : (
        children
    );
};
