import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Anime, useInfo } from "../context/InfoProviders";
import { Bookmark, Calendar, PlayCircle } from "lucide-react";
import Loading from "../components/Loading";
import { useAuth } from "../context/AuthContext";
import Pagination from "../components/Pagination";


const AniList = () => {

    const { fetchInfo, bookmarkedAnimes, onBookmarkClick, onSearch, loading } = useInfo();
    const [type, setType] = useState('');
    const [status, setStatus] = useState('');
    const [order, setOrder] = useState('');
    const [sort, setSort] = useState('desc');
    const [genres, setGenres] = useState<number[]>([]);

    const { currentUser } = useAuth();

    const [animeTV, setAnimeTV] = useState<Anime[] | null>(null);
    const [currPage, setCurrPage] = useState(1);




    useEffect(() => {
        fetchInfo("anime", currPage, type, setAnimeTV, status, order, sort, genres)
    }, [currPage, type, status, order, sort, genres])


    const renderGrid = (animes: Anime[] | null) => (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 md:gap-6">
            {animes?.map((anime, index) => (
                <div key={index} className="group z-1 overflow-hidden rounded-lg bg-gray-900 text-white relative">
                    {
                        currentUser &&
                        // TODO! some loading circle to show the user the function.
                        <button className="cursor-default absolute top-[5%] right-[5%] bg-alpha rounded-full p-2 z-10"
                            onClick={() => { onBookmarkClick(anime) }}
                        >

                            <Bookmark fill={`${bookmarkedAnimes?.some((anm: any) => anm.mal_id === anime.mal_id) ? "white" : "#1d4ed8"}`} />
                        </button>
                    }
                    <Link to={`/anime/${anime.mal_id}`}>
                        <div className="relative h-[400px]">
                            <img src={anime.images?.webp?.large_image_url} alt={anime.title} className="absolute inset-0 h-full w-full object-cover" />

                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent  transition-all duration-300" />
                            <div className="absolute bottom-4 left-4">
                                <p className="rounded-full bg-alpha text-white px-2 py-1 text-sm font-bold w-fit mb-2">
                                    {anime.score}
                                </p>
                                <h2 className="text-lg font-bold mb-2">{anime.title_english ?? anime.title}</h2>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <PlayCircle size={16} color="#9ca3af" />
                                        <span className="text-sm text-gray-400">{anime.episodes ?? 'Still Airing'}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar size={16} color="#9ca3af" />
                                        <span className="text-sm text-gray-400">{anime.aired.prop.from.year}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {anime.genres.map((genre, index) => (
                                            index < 3 && <span
                                                key={index}
                                                className="px-2 py-1 text-xs font-semibold rounded-full bg-alpha/30 text-gray-200"
                                            >
                                                {genre.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="p-4 ">
                        </div> */}
                    </Link>
                </div>
            ))}
        </div>
    )

    const [searchedAnimes, setSearchedAnimes] = useState<Anime[] | null>(null);
    const [inputValue, setInputValue] = useState('')


    const typeSelect = [
        { id: "TV", label: "Serie" },
        { id: "movie", label: "Movie" },
        { id: "OVA", label: "OVA" },
        { id: "ONA", label: "ONA" },
        { id: "special", label: "Special" },
    ];

    const statusSelect = [
        { id: "complete", label: "Complete" },
        { id: "airing", label: "Airing" },
        { id: "upcoming", label: "Upcoming" },
    ];

    const orderSelect = [
        { id: "score", label: "Score" },
        { id: "episodes", label: "Episodes" },
        { id: "rank", label: "Rank" },
        { id: "title", label: "Title" },
        { id: "favorites", label: "Favorite" },
        { id: "start_date", label: "Start Date" },
    ]

    const genreSelect = [
        { id: "1", name: "Action" },
        { id: "2", name: "Adventure" },
        { id: "5", name: "Avant Garde" },
        { id: "46", name: "Award Winning" },
        { id: "28", name: "Boys Love" },
        { id: "4", name: "Comedy" },
        { id: "8", name: "Drama" },
        { id: "10", name: "Fantasy" },
        { id: "26", name: "Girls Love" },
        { id: "47", name: "Gourmet" },
        { id: "14", name: "Horror" },
        { id: "7", name: "Mystery" },
        { id: "22", name: "Romance" },
        { id: "24", name: "Sci-Fi" },
        { id: "36", name: "Slice of Life" },
        { id: "30", name: "Sports" },
        { id: "37", name: "Supernatural" },
        { id: "41", name: "Suspense" },
        { id: "9", name: "Ecchi" },
        { id: "49", name: "Erotica" },
        { id: "12", name: "Hentai" },
        { id: "50", name: "Adult Cast" },
        { id: "51", name: "Anthropomorphic" },
        { id: "52", name: "CGDCT" },
        { id: "53", name: "Childcare" },
        { id: "54", name: "Combat Sports" },
        { id: "81", name: "Crossdressing" },
        { id: "55", name: "Delinquents" },
        { id: "39", name: "Detective" },
        { id: "56", name: "Educational" },
        { id: "57", name: "Gag Humor" },
        { id: "58", name: "Gore" },
        { id: "35", name: "Harem" },
        { id: "59", name: "High Stakes Game" },
        { id: "13", name: "Historical" },
        { id: "60", name: "Idols (Female)" },
        { id: "61", name: "Idols (Male)" },
        { id: "62", name: "Isekai" },
        { id: "63", name: "Iyashikei" },
        { id: "64", name: "Love Polygon" },
        { id: "65", name: "Magical Sex Shift" },
        { id: "66", name: "Mahou Shoujo" },
        { id: "17", name: "Martial Arts" },
        { id: "18", name: "Mecha" },
        { id: "67", name: "Medical" },
        { id: "38", name: "Military" },
        { id: "19", name: "Music" },
        { id: "6", name: "Mythology" },
        { id: "68", name: "Organized Crime" },
        { id: "69", name: "Otaku Culture" },
        { id: "20", name: "Parody" },
        { id: "70", name: "Performing Arts" },
        { id: "71", name: "Pets" },
        { id: "40", name: "Psychological" },
        { id: "3", name: "Racing" },
        { id: "72", name: "Reincarnation" },
        { id: "73", name: "Reverse Harem" },
        { id: "74", name: "Romantic Subtext" },
        { id: "21", name: "Samurai" },
        { id: "23", name: "School" },
        { id: "75", name: "Showbiz" },
        { id: "29", name: "Space" },
        { id: "11", name: "Strategy Game" },
        { id: "31", name: "Super Power" },
        { id: "76", name: "Survival" },
        { id: "77", name: "Team Sports" },
        { id: "78", name: "Time Travel" },
        { id: "32", name: "Vampire" },
        { id: "79", name: "Video Game" },
        { id: "80", name: "Visual Arts" },
        { id: "48", name: "Workplace" },
        { id: "43", name: "Josei" },
        { id: "15", name: "Kids" },
        { id: "42", name: "Seinen" },
        { id: "25", name: "Shoujo" },
        { id: "27", name: "Shounen" }
    ];

    const handleRemoveGenre = (genreId: number) => {
        setGenres(genres.filter(gen => gen !== genreId));
    };
    return (
        <>
            {
                animeTV && !loading ?
                    <>
                        <div className="mt-5">
                            {/* Display Mode Selector */}
                            <div className="mb-4 flex space-x-2 items-center flex-wrap">
                                <input type="text" placeholder="Search" className="p-2 rounded bg-gray-800 w-full md:w-fit mb-4 md:m-0"
                                    value={inputValue}
                                    onChange={(e) => {
                                        setInputValue(e.target.value.toLowerCase())
                                        if (!e.target.value) {
                                            setSearchedAnimes(null)
                                        }
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key == "Enter") {
                                            onSearch("anime", inputValue, setSearchedAnimes)
                                        }
                                    }}

                                />

                                <div className="flex items-center gap-3 flex-wrap">
                                    <select
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                        className="border rounded p-2 text-black capitalize"
                                    >
                                        <option disabled value="">Type</option>

                                        {typeSelect.map((option) => (
                                            <option key={option.id} value={option.id}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>

                                    <select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="border rounded p-2 text-black capitalize"
                                    >
                                        <option disabled value="">Status</option>
                                        {statusSelect.map((option) => (
                                            <option key={option.id} value={option.id}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>

                                    <select
                                        value={order}
                                        onChange={(e) => setOrder(e.target.value)}
                                        className="border rounded p-2 text-black capitalize"
                                    >
                                        <option disabled value="">Order By</option>
                                        {orderSelect.map((option) => (
                                            <option key={option.id} value={option.id}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>

                                    <button
                                        onClick={() => { sort == "desc" ? setSort('asc') : setSort('desc') }}
                                        className="px-4 py-2 bg-alpha rounded capitalize">
                                        {sort}
                                    </button>

                                    <select
                                        // value={order}
                                        onChange={(e) =>
                                            setGenres([...genres, parseInt(e.target.value)])
                                        }
                                        className="border rounded p-2 text-black capitalize"
                                    >
                                        <option disabled value="">Add Genres</option>
                                        {genreSelect.map((option) => (
                                            <option key={option.id} value={option.id}>
                                                {option.name}
                                            </option>
                                        ))}
                                    </select>
                                    {
                                        genreSelect
                                            .filter(el => genres.includes(parseInt(el.id)))
                                            .map(el => (
                                                <button key={el.id}
                                                    className="bg-alpha px-2 py-1 rounded-xl"
                                                    onClick={() => handleRemoveGenre(parseInt(el.id))}>
                                                    {el.name} X
                                                </button>
                                            ))
                                    }
                                </div>
                            </div>

                            {/* Anime Display Section */}
                            <div className="mt-4">
                                {renderGrid(searchedAnimes || animeTV)}
                                {/* {displayMode === 'list' && renderList(searchedAnimes || animeTV)}
                                {displayMode === 'table' && renderTable(searchedAnimes || animeTV)} */}

                            </div>
                        </div>


                        {/* Pagination */}
                        <Pagination currentPage={currPage} setCurrentPage={setCurrPage} max={1095} />

                    </>
                    :
                    <Loading />
            }
        </>
    )
}

export default AniList;