import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
// import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const register = (e: any) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;

                const newUser = {
                    id: user.uid,
                    email: user.email,
                    username: username,
                    bookmarkedAnime: [],
                    bookmarkedMovies: [],
                    created_at: serverTimestamp(),
                    updated_at: serverTimestamp(),
                };

                const userRef = doc(collection(db, 'users'), newUser.id);
                await setDoc(userRef, newUser);
                navigate("/")
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center reg">

            <form
                onSubmit={register}
                className="flex flex-col gap-5 w-[50%]">

                <input className="w-full rounded px-4 py-3 text-black" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} required />
                <input className="w-full rounded px-4 py-3 text-black" placeholder="example@email.com" type="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                <input className="w-full rounded px-4 py-3 text-black" placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} value={password} required />

                <button className="w-full bg-alpha text-white px-4 py-2 rounded"
                    type="submit"
                >
                    Register
                </button>
            </form>
            <div className="flex gap-2 mt-4 items-center">
                <p>Already Have an Account ? </p> <Link to={"/login"} className="font-bold text-lg underline">Sign In</Link>
            </div>
        </div>
    )
}

export default Register;