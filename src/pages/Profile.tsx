import { updatePassword, updateProfile } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

const Profile = () => {
    const { currentUser } = useAuth();

    const [username, setUsername] = useState<any>('')
    const [photo, setPhoto] = useState<any>('');
    // const [newEmail, setNewEmail] = useState<any>('');

    const [pass, setPass] = useState<any>('');

    const [isGoogleProvider, setIsGoogleProvider] = useState<any>();

    useEffect(() => {
        setUsername(currentUser?.displayName);
        setPhoto(currentUser?.photoURL);
        const answer = currentUser && currentUser.providerData.some((provider: any) => provider.providerId === 'google.com');
        setIsGoogleProvider(answer);

    }, [currentUser])

    const updateUserInfo = async (e: any) => {
        e.preventDefault()
        await updateProfile(currentUser, {
            displayName: username ?? currentUser.displayName,
            photoURL: photo ?? currentUser.photoURL,
        }).then(() => {
            alert('updated Successfully!!');
        }).catch((err) => {
            console.log(err);
        })

    }

    const updateUserPassword = async () => {
        await updatePassword(currentUser, pass).then(() => {
            alert('Password Updated!!');
        }).catch((err) => {
            console.log(err)
        })
    }


    return (
        currentUser &&
        <section className="flex items-center gap-2 h-[90vh]">
            <div className="flex flex-col h-full w-[40vw]">
                <img src={photo ?? currentUser?.photoURL} className="h-full object-cover rounded" alt="" />
            </div>
            <div className="w-full flex flex-col items-center justify-center">

                <form
                    onSubmit={updateUserInfo}
                    className="flex flex-col items-center gap-5 w-[50%]"
                >
                    <div>
                        <img src={photo} className="w-[150px] aspect-square rounded-full" alt="" />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="username">Username: </label>
                        <input type="text" name="username" id="username"
                            value={username}
                            className="w-full rounded px-4 py-2 text-black mt-2"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="photo">Photo URL:</label>
                        <input type="url" name="photo" id="photo"
                            value={photo}
                            className="w-full rounded px-4 py-2 text-black mt-2"
                            onChange={(e) => setPhoto(e.target.value)}
                        />
                    </div>
                    <button className="w-full bg-alpha text-white px-4 py-2 rounded">
                        Update Information
                    </button>
                </form>

                {

                    !isGoogleProvider && <form
                        onSubmit={updateUserPassword}
                        className="flex flex-col items-center gap-5 w-[50%] mt-2"
                    >
                        <div className="flex flex-col gap-1 w-full">
                            <label htmlFor="pass">Password: </label>
                            <input type="password" name="pass" id="pass"
                                className="w-full rounded px-4 py-2 text-black mt-2"
                                onChange={(e) => setPass(e.target.value)}
                                required
                            />
                        </div>
                        <button className="w-full bg-alpha text-white px-4 py-2 rounded">
                            Update Password
                        </button>
                    </form>
                }
            </div>
        </section>

    )
}

export default Profile;