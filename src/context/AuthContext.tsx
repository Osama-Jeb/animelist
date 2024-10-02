import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react"
import { auth } from "../firebase"


type AuthData = {
    currentUser: any;
    isLoading: boolean;
};

const AuthContext = createContext<AuthData>({
    currentUser: null,
    isLoading: true,
})
export default function AuthProvider({ children }: PropsWithChildren) {
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setIsLoading(false);
        });

        return () => unsubscribe(); // Cleanup on unmount
    }, []);

    return <AuthContext.Provider value={{ currentUser, isLoading}}>
        {children}
    </AuthContext.Provider >
}


export const useAuth = () => useContext(AuthContext);