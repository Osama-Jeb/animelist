import { useState } from "react";

import { signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { auth, db, gitProv, googleProvider } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";

import ggl from "../assets/Google_Icons-09-512.webp"
import git from "../assets/github.webp"

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


    const singInWithGoogle = async () => {
        try {
            const result = signInWithPopup(auth, googleProvider);
            const user = (await result).user;


            const newUser = {
                id: user.uid,
                bookmarkedAnimes: [],
                created_at: serverTimestamp(),
                updated_at: serverTimestamp(),
            };

            await updateProfile(user, {
                displayName: user.displayName,
                photoURL: user.photoURL ?? "https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png"
            })

            const userRef = doc(collection(db, 'users'), newUser.id);
            await setDoc(userRef, newUser);

            navigate("/")

        } catch (error) {
            console.log(error)
        }
    }

    const signInWithGithub = async () => {
        try {
            const result = signInWithPopup(auth, gitProv);
            const user = (await result).user;


            const newUser = {
                id: user.uid,
                bookmarkedAnimes: [],
                created_at: serverTimestamp(),
                updated_at: serverTimestamp(),
            };

            await updateProfile(user, {
                displayName: user.displayName,
                photoURL: user.photoURL ?? "https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png"
            })

            const userRef = doc(collection(db, 'users'), newUser.id);
            await setDoc(userRef, newUser);

            navigate("/")

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="h-screen flex flex-col items-center justify-center">

            <form
                onSubmit={signIn}
                className="flex flex-col gap-5 w-[50%]">

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
                    type="submit"
                >
                    Sign In
                </button>
            </form>

            <div className="flex gap-2 mt-4 items-center border-b-2 border-alpha/50 w-[50%] pb-4 mb-6 justify-center">
                <p>Don't Have An Account ? </p> <Link to={"/register"} className="font-bold text-lg underline">Register Now</Link>
            </div>


            <div className="flex items-center justify-around w-[15%]">
                <button
                    onClick={singInWithGoogle}
                    className="bg-white rounded-full"
                >
                    <img src={ggl} className="w-[35px] aspect-square p-1" alt="" />
                </button>
                <p>OR</p>
                <button
                    onClick={signInWithGithub}
                    className="bg-white rounded-full"
                >
                    <img src={git} className="w-[35px] aspect-square" />
                </button>
            </div>
        </div>
    )
}

export default Login;