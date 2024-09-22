import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [userImage, setUserImage] = useState('');
    const navigate = useNavigate();

    const register = (e: any) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;

                const newUser = {
                    id: user.uid,
                    bookmarkedAnime: [],
                    created_at: serverTimestamp(),
                    updated_at: serverTimestamp(),
                };

                await updateProfile(user, {
                    displayName: username,
                    photoURL: userImage ?? "https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png"
                })

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
                <div>
                    <label htmlFor="username">Username: <span className="font-bold text-red-600 underline">*</span></label>
                    <input className="w-full rounded px-4 py-3 text-black mt-2" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} required />
                </div>

                <div>
                    <label htmlFor="photourl">Photo URL:</label>
                    <input className="w-full rounded px-4 py-3 text-black mt-2" type="url" placeholder="Photo URL" onChange={(e) => setUserImage(e.target.value)} value={userImage} />
                </div>

                {/* TODO: waaay later, email verification */}
                <div>
                    <label htmlFor="email">Email: <span className="font-bold text-red-600 underline">*</span></label> <span>(can be fake for now, idc)</span>
                    <input className="w-full rounded px-4 py-3 text-black mt-2" placeholder="example@email.com" type="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                </div>

                <div>
                    <label htmlFor="password">Password: <span className="font-bold text-red-600 underline">*</span></label>
                    <input className="w-full rounded px-4 py-3 text-black mt-2" placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                </div>

                {/* TODO: Add Password Verification */}
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