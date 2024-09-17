import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between p-5 bg-black/80 text-white sticky top-0 z-10">
            <div>
                <NavLink to={'/'}>Logo</NavLink>
            </div>

            <div className="flex items-center gap-3">
                <NavLink className="hover:bg-white hover:text-black p-3 rounded-xl" to={'/'}>Anime Series</NavLink>
                <NavLink className="hover:bg-white hover:text-black p-3 rounded-xl" to={'/animeMovies'}>Anime Movies</NavLink>
                <NavLink className="hover:bg-white hover:text-black p-3 rounded-xl" to={'/singers'}>Singers</NavLink>
                {/* <p>VA</p> */}
            </div>
        </nav>
    )
}

export default Navbar;