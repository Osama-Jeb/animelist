import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { PropsWithChildren } from "react";
import Loading from "../components/Loading";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
    const { currentUser, isLoading } = useAuth();

    if (isLoading) {
        return <Loading />; 
    }

    return currentUser ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
