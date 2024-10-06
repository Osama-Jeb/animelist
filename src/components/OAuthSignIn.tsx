import { signInWithPopup, updateProfile } from "firebase/auth";
import { auth, db, gitProv, googleProvider } from "../firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

import ggl from "../assets/Google_Icons-09-512.webp"
import git from "../assets/github.webp"
import { useNavigate } from "react-router-dom";

const OAuthSignIn = () => {
    const navigate = useNavigate();


    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            const userRef = doc(db, 'users', user.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                navigate("/");
            } else {
                const newUser = {
                    id: user.uid,
                    bookmarkedAnimes: [],
                    created_at: serverTimestamp(),
                    updated_at: serverTimestamp(),
                };

                await updateProfile(user, {
                    displayName: user.displayName,
                    photoURL: user.photoURL ? user.photoURL : "https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png"
                });

                await setDoc(userRef, newUser);
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    };


    const signInWithGithub = async () => {
        try {
            const result = await signInWithPopup(auth, gitProv);
            const user = result.user;
            const userRef = doc(db, 'users', user.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                navigate("/");
            } else {
                const newUser = {
                    id: user.uid,
                    bookmarkedAnimes: [],
                    created_at: serverTimestamp(),
                    updated_at: serverTimestamp(),
                };

                await updateProfile(user, {
                    displayName: user.displayName,
                    photoURL: user.photoURL ? user.photoURL : "https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png"
                });

                await setDoc(userRef, newUser);
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="flex items-center justify-around w-[75%] lg:w-[15%]">
            <button
                onClick={signInWithGoogle}
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
    )
}

export default OAuthSignIn;