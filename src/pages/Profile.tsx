import { updatePassword, updateProfile } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useInfo } from "../context/InfoProviders";

const Profile = () => {
    const { currentUser } = useAuth();
    const { checkImageUrl } = useInfo();

    const [username, setUsername] = useState<any>('')
    const [photo, setPhoto] = useState<any>('');
    // const [newEmail, setNewEmail] = useState<any>('');

    const [pass, setPass] = useState<any>('');

    const [isGoogleProvider, setIsGoogleProvider] = useState<any>();

    // Image Validation
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const handleImageChange = (e: any) => {
        const inputUrl = e.target.value;
        setPhoto(inputUrl);
        if (inputUrl) {
            checkImageUrl(inputUrl, setIsValid);
        } else {
            setIsValid(null);
        }
    };

    useEffect(() => {
        setUsername(currentUser?.displayName);
        setPhoto(currentUser?.photoURL);
        const answer = currentUser && currentUser.providerData.some((provider: any) => provider.providerId === 'google.com' || provider.providerId === 'github.com');
        setIsGoogleProvider(answer);

    }, [currentUser])

    const updateUserInfo = async (e: any) => {
        e.preventDefault();
        if (!isValid) {
            alert('Please provide a proper image link');
            return;
        }

        await updateProfile(currentUser, {
            displayName: username ?? currentUser.displayName,
            photoURL: photo ?? currentUser.photoURL,
        }).then(() => {
            alert('updated Successfully!!');
        }).catch((err) => {
            console.log(err);
        })

    }

    const updateUserPassword = async (e : any) => {
        e.preventDefault()
        // if (!validatePassword(pass)) {
        //     alert('Please Meet the requirements!!');
        //     return;
        // }

        await updatePassword(currentUser, pass).then(() => {
            alert('Password Updated!!');
            setPass('');
        }).catch((err) => {
            console.log(err)
            alert(err)
        })
    }


    return (
        currentUser &&
        <section className="flex items-center gap-2 h-[90vh]">
            <div className="hidden lg:flex flex-col h-full w-[40vw]">
                <img src={photo ?? currentUser?.photoURL} className="h-full object-cover rounded" alt="" />
            </div>
            <div className="w-full flex flex-col items-center justify-center px-4 lg:p-0">

                <form
                    onSubmit={updateUserInfo}
                    className="flex flex-col items-center gap-5 lg:w-[50%] w-full"
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
                            onChange={handleImageChange}
                        />
                        {isValid === true && <small className="text-green-500">Image is valid!</small>}
                        {isValid === false && <small className="text-red-500">Image does not exist!</small>}
                    </div>
                    <button className="w-full bg-alpha text-white px-4 py-2 rounded">
                        Update Information
                    </button>
                </form>

                {

                    !isGoogleProvider && <form
                        onSubmit={updateUserPassword}
                        className="flex flex-col items-center gap-5 lg:w-[50%] w-full mt-2"
                    >
                        <div className="flex flex-col gap-1 w-full">
                            <label htmlFor="pass">Password: </label>
                            <input type="password" name="pass" id="pass"
                                className="w-full rounded px-4 py-2 text-black mt-2"
                                onChange={(e) => setPass(e.target.value)}
                                required
                            />
                            {/* <small>requirements: at least 8 charcaters including uppercase, lowercase and special characters</small> */}
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