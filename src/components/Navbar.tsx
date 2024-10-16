import { Bookmark, ChartPie, Menu, UserCog, X, Film, Mic, Users, Book, Eye } from "lucide-react";
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
            name: "Anime",
            icon: Film,
        },
        {
            link: "/manga",
            name: "Manga",
            icon: Book,
        },
        {
            link: "/characters",
            name: "Characters",
            icon: Users
        },
        {
            link: "/va",
            name: "People",
            icon: Mic,
        }
    ]

    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const handleScroll = () => {
        if (typeof window !== 'undefined') {
            const currentScrollY = window.scrollY;
            setIsVisible(currentScrollY < lastScrollY || currentScrollY < 10);
            setLastScrollY(currentScrollY);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <nav className={`sticky top-0 z-20 bg-black/80 transition-transform ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 bg-transparent">
                <div className="flex items-center justify-between h-16 bg-transparent">
                    {/* Logo/Website Name */}
                    <Link to="/" className="text-xl font-bold">

                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                            width="60" height="60" viewBox="0 0 600.000000 600.000000"
                            preserveAspectRatio="xMidYMid meet">

                            <g transform="translate(0.000000,600.000000) scale(0.100000,-0.100000)"
                                fill="#ffffff" stroke="none">
                                <path d="M2060 3182 c-212 -454 -391 -839 -398 -856 -15 -35 -18 -38 73 69
167 196 369 358 623 496 20 12 39 36 57 78 15 34 30 61 34 61 3 0 13 -18 22
-39 l17 -39 85 34 c47 18 134 48 194 65 59 18 109 33 111 34 3 3 -417 907
-426 917 -4 3 -180 -365 -392 -820z"/>
                                <path d="M2920 4005 c0 -3 19 -47 43 -98 23 -51 65 -140 92 -198 l49 -106 425
-2 c338 -2 430 -5 451 -16 40 -21 87 -79 99 -122 13 -47 13 -59 1 -105 -36
-127 -171 -175 -635 -228 -182 -20 -458 -69 -594 -105 -588 -156 -1009 -474
-1320 -997 l-23 -38 225 0 224 0 41 58 c134 190 325 353 539 461 180 90 481
169 783 206 74 9 147 18 161 21 24 5 29 -1 79 -110 29 -63 56 -114 59 -112 3
2 6 -6 7 -17 1 -12 52 -131 115 -264 l114 -242 223 -1 c122 0 222 2 222 4 0 2
-51 114 -114 248 -62 133 -146 312 -185 397 -39 84 -70 155 -69 156 2 2 39 13
83 25 260 71 412 219 461 450 46 216 -9 413 -156 561 -72 72 -129 109 -229
148 l-66 26 -552 3 c-304 2 -553 0 -553 -3z"/>
                                <path d="M2955 2604 c-84 -21 -254 -72 -263 -79 -1 -1 54 -124 124 -274 l127
-271 223 0 c123 0 224 4 224 8 0 5 -58 132 -128 283 -70 151 -136 293 -146
317 -23 50 -23 50 -161 16z"/>
                            </g>
                        </svg>

                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:block bg-transparent">
                        <div className="ml-10 flex items-center space-x-4 bg-transparent" >
                            {
                                links.map((link, index) => (
                                    <NavLink key={index} to={link.link} className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "bg-alpha px-3 py-2 rounded-tr-xl rounded-bl-xl text-sm font-medium" : "px-3 py-2 border-2 border-white/50 rounded-lg"}>
                                        {link.name}
                                    </NavLink>
                                ))
                            }

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
                                            profileMenu && <div className="absolute top-[120%] -left-[100px] w-[200px] z-20 bg-black">
                                                <Link to={"/watchedAnimes"} onClick={() => { setProfileMenu(false) }} className="px-3 py-2 flex gap-2 items-center">
                                                    <Eye /> <p>Watched Anime</p>
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
                <div className="md:hidden ">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {
                            links.map((link, index) => (
                                <NavLink key={index} to={link.link}
                                    onClick={() => { setIsMenuOpen(false) }}
                                    className="px-3 py-2 rounded-md text-base font-medium flex items-center gap-3"

                                >
                                    <link.icon />
                                    <p>{link.name}</p>
                                </NavLink>
                            ))
                        }

                        {
                            currentUser ? <div>
                                <Link to={"/watchedAnimes"} onClick={() => { setIsMenuOpen(false) }} className="px-3 py-2 flex gap-3 items-center">
                                    <Bookmark /> <p>Bookmarked Anime</p>
                                </Link>
                                <Link to={"/statistics"} onClick={() => { setIsMenuOpen(false) }} className="px-3 py-2 flex gap-3 items-center my-4">
                                    <ChartPie /> <p>Statistics</p>
                                </Link>
                                <Link to={"/profile"} onClick={() => { setIsMenuOpen(false) }} className="px-3 py-2 flex gap-3 items-center my-4">
                                    <UserCog /> <p>Profile</p>
                                </Link>
                                <button className="bg-red-600 px-3 py-2 rounded-md w-full"
                                    onClick={doSignOut}
                                >
                                    Log Out
                                </button>
                            </div>
                                :
                                <Link to={"/login"}
                                    className="block px-3 py-2 rounded-md text-base font-medium"
                                    onClick={() => { setIsMenuOpen(false) }}
                                >
                                    Register/Login
                                </Link>
                        }
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar;