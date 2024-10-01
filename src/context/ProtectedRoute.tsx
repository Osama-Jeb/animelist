// ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { PropsWithChildren } from "react";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
    const { currentUser } = useAuth();

    return currentUser ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
