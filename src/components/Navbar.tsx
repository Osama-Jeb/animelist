import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }
    return (
        // <nav className="flex items-center justify-between p-5 bg-black/80 text-white sticky top-0 z-10 ">
        //     <div>
        //         <NavLink to={'/'} className="font-bold text-lg">The Anime Repo</NavLink>
        //     </div>

        //     <div className="flex items-center gap-3 bg-transparent">
        //         <NavLink className="hover:bg-white hover:text-black p-3 rounded-xl bg-transparent" to={'/animes'}>Anime Series</NavLink>
        //         <NavLink className="hover:bg-white hover:text-black p-3 rounded-xl bg-transparent" to={'/animeMovies'}>Anime Movies</NavLink>
        //         <NavLink className="hover:bg-white hover:text-black p-3 rounded-xl bg-transparent" to={'/singers'}>Singers</NavLink>
        //     </div>
        // </nav>

        <nav className="sticky top-0 z-10 bg-black/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 bg-transparent">
                <div className="flex items-center justify-between h-16 bg-transparent">
                    {/* Logo/Website Name */}
                    <Link to="/" className="text-xl font-bold bg-transparent">
                        Anime Repo
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:block bg-transparent">
                        <div className="ml-10 flex items-baseline space-x-4 bg-transparent" >
                            <Link to="/animes" className="bg-blue-700  px-3 py-2 rounded-md text-sm font-medium">
                                Animes List
                            </Link>
                            <Link to="/animeMovies" className="bg-blue-700  px-3 py-2 rounded-md text-sm font-medium">
                                Anime Movies
                            </Link>
                            <Link to="/singers" className="bg-blue-700  px-3 py-2 rounded-md text-sm font-medium">
                                Singers
                            </Link>
                            {/* <Link to="/voice-actors" className="bg-blue-700  px-3 py-2 rounded-md text-sm font-medium">
                                Voice Actors
                            </Link> */}
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