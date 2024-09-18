import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react"
import { auth } from "../firebase"


type AuthData = {
    currentUser: any;
    isLoading: boolean;
};

const AuthContext = createContext<AuthData>({
    currentUser: null,
    isLoading: false,
})
export default function AuthProvider({ children }: PropsWithChildren) {
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setIsLoading(true);
        })

    }, [])

    return <AuthContext.Provider value={{ currentUser, isLoading }}>
        {children}
    </AuthContext.Provider >
}


export const useAuth = () => useContext(AuthContext);