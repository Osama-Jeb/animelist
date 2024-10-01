import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react"
import { auth } from "../firebase"


type AuthData = {
    currentUser: any;
};

const AuthContext = createContext<AuthData>({
    currentUser: null,
})
export default function AuthProvider({ children }: PropsWithChildren) {
    const [currentUser, setCurrentUser] = useState<any>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        });

        return () => unsubscribe(); // Cleanup on unmount
    }, []);

    return <AuthContext.Provider value={{ currentUser }}>
        {children}
    </AuthContext.Provider >
}


export const useAuth = () => useContext(AuthContext);