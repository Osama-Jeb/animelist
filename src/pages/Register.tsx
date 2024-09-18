import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
// import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const register = (e: any) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
            .then(async () => {
                // const user = userCredential.user;

                // const newUser = {
                //     id: user.uid,
                //     email: user.email,
                //     username: username,
                //     created_at: serverTimestamp(),
                //     updated_at: serverTimestamp(),
                // };

                // const userRef = doc(collection(db, 'users'), newUser.id);
                // await setDoc(userRef, newUser);
                navigate("/")
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
            <form
                onSubmit={register}
                className="flex flex-col items-center gap-4 ">

                {/* <input className="w-full rounded" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} required /> */}
                <input className="w-full rounded text-black" placeholder="example@email.com" type="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                <input className="w-full rounded text-black" placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} value={password} required />

                <button className="w-full bg-black text-white px-4 py-2 rounded"
                    type="submit"
                >
                    Register
                </button>
            </form>
        </>
    )
}

export default Register;