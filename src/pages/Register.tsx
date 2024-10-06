import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";


import { useInfo } from "../context/InfoProviders";
import OAuthSignIn from "../components/OAuthSignIn";

const Register = () => {
    const { validatePassword, checkImageUrl } = useInfo();

    const [registering, setRegistering] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [userImage, setUserImage] = useState('');
    const navigate = useNavigate();

    // Image Validation
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const handleImageChange = (e: any) => {
        const inputUrl = e.target.value;
        setUserImage(inputUrl);
        if (inputUrl) {
            checkImageUrl(inputUrl, setIsValid);
        } else {
            setIsValid(null);
        }
    };


    const register = (e: any) => {
        e.preventDefault();
        setRegistering(true);

        if (!validatePassword(password)) {
            alert("Password must meet complexity requirements.");
            setRegistering(false);
            return;
        }

        if (userImage) {
            if (!isValid) {
                alert("Please set an image adress");
                setRegistering(false);
                return;
            }
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;

                const newUser = {
                    id: user.uid,
                    bookmarkedAnimes: [],
                    created_at: serverTimestamp(),
                    updated_at: serverTimestamp(),
                };

                await updateProfile(user, {
                    displayName: username,
                    photoURL: userImage ? userImage : "https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png"
                })

                const userRef = doc(collection(db, 'users'), newUser.id);
                await setDoc(userRef, newUser);
                navigate("/")
            })
            .catch((error) => {
                console.log(error);
            });

        setRegistering(false);
    }

    return (
        <div className="h-[80vh] flex flex-col items-center justify-center">

            <form
                onSubmit={register}
                className="flex flex-col gap-5 w-[50%]">
                <div>
                    <label htmlFor="username">Username: <span className="font-bold text-red-600 underline">*</span></label>
                    <input className="w-full rounded px-4 py-3 text-black mt-2" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} required />
                </div>

                <div>
                    <label htmlFor="photourl">Photo URL:</label>
                    <input className="w-full rounded px-4 py-3 text-black mt-2" type="url" placeholder="Photo URL"
                        onChange={handleImageChange}
                        value={userImage}
                    />
                    {isValid === true && <small className="text-green-500">Image is valid!</small>}
                    {isValid === false && <small className="text-red-500">Image does not exist!</small>}
                </div>

                {/* TODO: waaay later, email verification */}
                <div>
                    <label htmlFor="email">Email: <span className="font-bold text-red-600 underline">*</span></label> <span className="text-xs">(you can use a fake email, but you won't be able to recover your account)</span>
                    <input className="w-full rounded px-4 py-3 text-black mt-2" placeholder="example@email.com" type="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                </div>

                <div>
                    <label htmlFor="password">Password: <span className="font-bold text-red-600 underline">*</span></label>
                    <input className="w-full rounded px-4 py-3 text-black mt-2" placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                    <small>requirements: at least 8 charcaters including uppercase, lowercase and special characters</small>
                </div>

                <button className="w-full bg-alpha text-white px-4 py-2 rounded"
                    type="submit" disabled={registering}
                >
                    {registering ? 'Loading...' : 'Register'}
                </button>
            </form>

            
            <div className="flex gap-2 mt-4 items-center border-b-2 border-alpha/50 w-[50%] pb-4 mb-6 justify-center">
                <p>Already Have an Account ? </p> <Link to={"/login"} className="font-bold text-lg underline">Sign In</Link>
            </div>


            <OAuthSignIn />
        </div>
    )
}

export default Register;