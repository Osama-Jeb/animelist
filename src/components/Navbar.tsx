import { Bookmark, Menu, User, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase";
import { useInfo } from "../context/InfoProviders";

const Navbar = () => {

    const { currentUser } = useAuth();
    const { user } = useInfo();
    const navigate = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const [profileMenu, setProfileMenu] = useState(false);
    const toggleProfileMenu = () => {
        setProfileMenu(!profileMenu);
    }

    const doSignOut = () => {
        auth.signOut();
        navigate("/")
    }

    const links = [
        {
            link: "/animes",
            name: "Animes List"
        },
        {
            link: "/animeMovies",
            name: "Animes Movies"
        },
        {
            link: "/singers",
            name: "Singers"
        },
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
                                    <div className="relative">

                                        <button
                                            onClick={toggleProfileMenu}
                                            className="flex items-center gap-1"
                                        >
                                            <User size={24} />
                                            <p>{user?.username}</p>
                                        </button>
                                        {
                                            profileMenu && <div className="absolute top-[150%] -left-[100px] w-[150px] bg-black">
                                                <Link to={"/bookmarkedAnime"} className="px-3 py-2 flex gap-2 items-center"><Bookmark /> <p>Saved Anime</p></Link>
                                                <div className="px-3 py-2 flex gap-2 items-center"><Bookmark /> <p>Second Page</p></div>
                                                <button className="bg-red-600 px-3 py-2 rounded-md w-full"
                                                    onClick={doSignOut}
                                                >
                                                    Log Out
                                                </button>
                                            </div>
                                        }
                                    </div>

                                    :

                                    <Link to={"/register"}>
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
                        <Link to="/animes" className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">
                            Animes List
                        </Link>
                        <Link to="/animeMovies" className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">
                            Anime Movies
                        </Link>
                        <Link to="/singers" className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">
                            Singers
                        </Link>
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