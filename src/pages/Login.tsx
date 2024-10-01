import { useState } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

import OAuthSignIn from "../components/OAuthSignIn";

const Login = () => {
    //* TODO: Password Reset
    const [signing, setSigning] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const signIn = async (e: any) => {
        setSigning(true);
        e.preventDefault()
        await signInWithEmailAndPassword(auth, email, password).then(() => {
            navigate("/")
        }).catch((err) => {
            console.log(err);
            alert('Email or Password are incorrect.')
        })
        setEmail('');
        setPassword('');
        setSigning(false);
    }


    return (
        <div className="h-[90vh] flex flex-col items-center justify-center">

            <form
                onSubmit={signIn}
                className="flex flex-col gap-5 w-full lg:w-[50%]">

                <div>
                    <label htmlFor="username">Username: </label>
                    <input
                        className="w-full rounded px-4 py-3 text-black mt-2" placeholder="Email" type="email"
                        onChange={(e) => { setEmail(e.target.value) }} value={email} />
                </div>

                <div>
                    <label htmlFor="password">Password: </label>
                    <input
                        className="w-full rounded px-4 py-3 text-black mt-2" placeholder="Password" type="password"
                        onChange={(e) => { setPassword(e.target.value) }} value={password} />
                </div>

                <button
                    className="w-full bg-alpha text-white px-4 py-2 rounded"
                    type="submit" disabled={!signing}
                >
                    {!signing ? 'Sign In' : 'LOADING...'}
                </button>
            </form>

            <div className="flex gap-2 mt-4 items-center border-b-2 border-alpha/50 w-full lg:w-[50%] pb-4 mb-6 justify-center">
                <p>Don't Have An Account ? </p> <Link to={"/register"} className="font-bold text-lg underline">Register Now</Link>
            </div>


            <OAuthSignIn />
        </div>
    )
}

export default Login;