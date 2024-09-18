import { useState } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const signIn = async (e: any) => {
        e.preventDefault()
        await signInWithEmailAndPassword(auth, email, password).then(() => {
            navigate("/")
        })
        setEmail('');
        setPassword('');
    }

    return (
        <form
            onSubmit={signIn}
            className="flex flex-col items-center gap-4">
            <input
                className="w-full text-black" placeholder="Email" type="email"
                onChange={(e) => { setEmail(e.target.value) }} value={email} />
            <input
                className="w-full text-black" placeholder="Password" type="password"
                onChange={(e) => { setPassword(e.target.value) }} value={password} />

            <button
                className="bg-black text-white px-4 py-2 w-full flex items-center justify-center gap-3"
                type="submit"
            >
                Sign In
            </button>
        </form>
    )
}

export default Login;