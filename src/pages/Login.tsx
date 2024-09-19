import { useState } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

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
        <div className="h-screen flex flex-col items-center justify-center reg">

            <form
                onSubmit={signIn}
                className="flex flex-col gap-5 w-[50%]">
                <input
                    className="w-full rounded px-4 py-3" placeholder="Email" type="email"
                    onChange={(e) => { setEmail(e.target.value) }} value={email} />
                <input
                    className="w-full rounded px-4 py-3" placeholder="Password" type="password"
                    onChange={(e) => { setPassword(e.target.value) }} value={password} />

                <button
                    className="w-full bg-alpha text-white px-4 py-2 rounded"
                    type="submit"
                >
                    Sign In
                </button>
            </form>

            <div className="flex gap-2 mt-4 items-center">
                <p>Don't Have An Account ? </p> <Link to={"/register"} className="font-bold text-lg underline">Register Now</Link>
            </div>
        </div>
    )
}

export default Login;