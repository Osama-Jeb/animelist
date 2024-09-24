import { Bookmark, ChartPie, Menu, UserCog, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase";

const Navbar = () => {

    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const [profileMenu, setProfileMenu] = useState(false);
    const toggleProfileMenu = () => {
        setProfileMenu(!profileMenu);
    }
    const settingsRef = useRef<HTMLDivElement>(null);
    const handleClickOutside = (event: MouseEvent) => {
        if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
            setProfileMenu(false);
        }
    };

    useEffect(() => {
        if (profileMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [profileMenu]);

    const doSignOut = () => {
        auth.signOut();
        setProfileMenu(false)
        navigate("/")
    }

    const links = [
        {
            link: "/anime",
            name: "Anime"
        },
        {
            link: "/manga",
            name: "Manga"
        },
        {
            link: "/characters",
            name: "Characters",
        },
        {
            link: "/va",
            name: "Voice Actors"
        }
    ]
    return (
        <nav className="sticky top-0 z-10 bg-black/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 bg-transparent">
                <div className="flex items-center justify-between h-16 bg-transparent">
                    {/* Logo/Website Name */}
                    <Link to="/" className="text-xl font-bold bg-transparent">
                        Anime Repo
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:block bg-transparent">
                        <div className="ml-10 flex items-center space-x-4 bg-transparent" >
                            {
                                links.map((link, index) => (
                                    <NavLink key={index} to={link.link} className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "bg-alpha px-3 py-2 rounded-md text-sm font-medium" : "px-3 py-2 border-2 border-alpha/50 rounded-md"}>
                                        {link.name}
                                    </NavLink>
                                ))
                            }
                            {/* <NavLink to="/voice-actors" className="bg-alpha  px-3 py-2 rounded-md text-sm font-medium">
                                Voice Actors
                            </NavLink> */}
                            {
                                currentUser ?
                                    <div className="relative" ref={settingsRef}>

                                        <button
                                            onClick={toggleProfileMenu}
                                            className="flex items-center gap-2"
                                        >
                                            <img src={currentUser?.photoURL} className="w-[40px] rounded-full" alt="" />
                                            <p>{currentUser?.displayName}</p>
                                        </button>
                                        {
                                            profileMenu && <div className="absolute top-[150%] -left-[100px] w-[200px] z-20 bg-black">
                                                <Link to={"/bookmarkedAnime"} onClick={() => { setProfileMenu(false) }} className="px-3 py-2 flex gap-2 items-center">
                                                    <Bookmark /> <p>Bookmarked Anime</p>
                                                </Link>
                                                <Link to={"/statistics"} onClick={() => { setProfileMenu(false) }} className="px-3 py-2 flex gap-2 items-center my-4">
                                                    <ChartPie /> <p>Statistics</p>
                                                </Link>
                                                <Link to={"/profile"} onClick={() => { setProfileMenu(false) }} className="px-3 py-2 flex gap-2 items-center my-4">
                                                    <UserCog /> <p>Profile</p>
                                                </Link>
                                                <button className="bg-red-600 px-3 py-2 rounded-md w-full"
                                                    onClick={doSignOut}
                                                >
                                                    Log Out
                                                </button>
                                            </div>
                                        }
                                    </div>

                                    :

                                    <Link to={"/login"}>
                                        Register/Login
                                    </Link>

                            }

                        </div>

                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/anime" className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">
                            Animes List
                        </Link>

                        <Link to="/manga" className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">
                            Manga List
                        </Link>

                        <Link to={"/bookmarkedAnime"} onClick={() => { setProfileMenu(false) }} className="px-3 py-2 flex gap-2 items-center">
                            <Bookmark /> <p>Bookmarked Anime</p>
                        </Link>
                        <Link to={"/statistics"} onClick={() => { setProfileMenu(false) }} className="px-3 py-2 flex gap-2 items-center my-4">
                            <ChartPie /> <p>Statistics</p>
                        </Link>
                        <Link to={"/profile"} onClick={() => { setProfileMenu(false) }} className="px-3 py-2 flex gap-2 items-center my-4">
                            <UserCog /> <p>Profile</p>
                        </Link>
                        <button className="bg-red-600 px-3 py-2 rounded-md w-full"
                            onClick={doSignOut}
                        >
                            Log Out
                        </button>
                        {/* <Link to="/voice-actors" className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">
                            Voice Actors
                        </Link> */}
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar;