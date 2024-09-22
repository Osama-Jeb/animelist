import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Anime, useInfo } from "../context/InfoProviders";
import { Bookmark, Grid, List, TableIcon } from "lucide-react";
import Loading from "../components/Loading";


type DisplayMode = 'grid' | 'list' | 'masonry' | 'table'


const AniList = () => {

    // TODO* add criteria when fetching/radio https://docs.api.jikan.moe/#tag/anime/operation/getAnimeSearch
    const { pagination, fetchAnimes, bookmarkedAnimes, onBookmarkClick } = useInfo();
    const [type, setType] = useState('TV');

    const goto = useNavigate()
    const [displayMode, setDisplayMode] = useState<DisplayMode>('grid')

    const [animeTV, setAnimeTV] = useState<Anime[] | null>(null);
    const [currPage, setCurrPage] = useState(1);
    const totalPages = pagination ? pagination.last_visible_page : 1;
    const maxPagesToShow = 3;

    useEffect(() => {
        fetchAnimes(currPage, type, setAnimeTV)
    }, [currPage, type])

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && (!pagination || newPage <= pagination.last_visible_page)) {
            setCurrPage(newPage);
        }
    };

    const getPageNumbers = () => {
        const pageNumbers = [];
        const startPage = Math.max(1, currPage - maxPagesToShow);
        const endPage = Math.min(totalPages, currPage + maxPagesToShow);

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };
    const pageNumbers = getPageNumbers();


    const renderGrid = (animes: Anime[] | null) => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {animes?.map((anime, index) => (
                <div className="relative border border-alpha rounded-lg overflow-hidden hover:bg-gray-900">
                    <button className="absolute top-[10%] right-[10%] bg-alpha rounded p-1 z-1"
                        onClick={() => { onBookmarkClick(anime) }}
                    >

                        <Bookmark fill={`${bookmarkedAnimes?.some((anm: any) => anm.mal_id === anime.mal_id) ? "white" : "#1d4ed8"}`} />
                    </button>
                    <Link to={`/animes/${anime.mal_id}`} key={index} className="cursor-default">
                        <img src={anime.images?.webp?.large_image_url} alt={anime.title} className="w-full h-64 object-cover" />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">{anime.title_english ?? anime.title}</h3>
                            <p className="text-gray-600 mb-2">{anime.score}</p>
                            <p className="text-sm text-gray-500 mb-1">Episodes: {anime.episodes}</p>
                            <p className="text-sm text-gray-500 mb-1">Release Year: {anime.year}</p>
                            <p className="text-sm text-gray-500 mb-2">Genres: {anime.genres.map((genre) => genre.name).join(', ')}</p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    )

    const renderList = (animes: Anime[] | null) => (
        <div className="space-y-4">
            {animes?.map((anime, index) => (
                <Link to={`/animes/${anime.mal_id}`} key={index} className="flex border rounded-lg overflow-hidden hover:bg-gray-900">
                    <img src={anime.images?.webp?.large_image_url} alt={anime.title} className="w-48 h-48 object-cover" />
                    <div className="p-4 flex-grow">
                        <h3 className="text-xl font-semibold mb-2">{anime.title_english ?? anime.title}</h3>
                        <p className="text-gray-600 mb-2">{anime.score}</p>
                        <p className="text-sm text-gray-500 mb-1">Episodes: {anime.episodes}</p>
                        <p className="text-sm text-gray-500 mb-2">Release Year: {anime.year}</p>

                    </div>
                </Link>
            ))}
        </div>
    )

    const renderTable = (animes: Anime[] | null) => (
        <div className="overflow-x-auto">
            <table className="min-w-full ">
                <thead className="">
                    <tr>
                        <th className="px-4 py-2 text-left">Title</th>
                        <th className="px-4 py-2 text-left">Cover</th>
                        <th className="px-4 py-2 text-left">Score</th>
                        <th className="px-4 py-2 text-left">Episodes</th>
                        <th className="px-4 py-2 text-left">Release Year</th>
                    </tr>
                </thead>
                <tbody>
                    {animes?.map((anime, index) => (
                        <tr onClick={() => { goto(`/animes/${anime.mal_id}`) }} key={index} className="border-b cursor-pointer hover:bg-gray-700">
                            <td className="px-4 py-2">{anime.title_english ?? anime.title}</td>
                            <td className="px-4 py-2">
                                <img src={anime.images?.webp?.large_image_url} alt={anime.title} className="w-16 h-16 object-cover" />
                            </td>
                            <td className="px-4 py-2">{anime.score}</td>
                            <td className="px-4 py-2">{anime.episodes}</td>
                            <td className="px-4 py-2">{anime.year}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

    const [searchedAnimes, setSearchedAnimes] = useState<Anime[] | null>(null);
    const [inputValue, setInputValue] = useState('')

    const onSearch = async (term: string) => {
        try {
            const res = await fetch(`https://api.jikan.moe/v4/anime?q=${term}`)
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();
            setSearchedAnimes(data.data);

        } catch (error) {
            console.log("search erro", error)
        }
    }


    const radioOptions = [
        { id: "TV", label: "TV" },
        { id: "movie", label: "Movie" },
        { id: "OVA", label: "OVA" },
        { id: "ONA", label: "ONA" },
        { id: "special", label: "Special" },
    ];
    return (
        <>
            {
                animeTV ?
                    <>
                        <div className="mt-5">
                            {/* Display Mode Selector */}
                            <div className="mb-4 flex space-x-2 items-center">
                                <button
                                    onClick={() => setDisplayMode('grid')}
                                    className={`p-2 ${displayMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-800'} rounded`}
                                >
                                    <Grid size={20} />
                                </button>
                                <button
                                    onClick={() => setDisplayMode('list')}
                                    className={`p-2 ${displayMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-800'} rounded`}
                                >
                                    <List size={20} />
                                </button>
                                <button
                                    onClick={() => setDisplayMode('table')}
                                    className={`p-2 ${displayMode === 'table' ? 'bg-blue-500 text-white' : 'bg-gray-800'} rounded`}
                                >
                                    <TableIcon size={20} />
                                </button>

                                <div>
                                    <input type="text" placeholder="Search" className="p-2 rounded bg-gray-800"
                                        value={inputValue}
                                        onChange={(e) => {
                                            setInputValue(e.target.value.toLowerCase())
                                            if (!e.target.value) {
                                                setSearchedAnimes(null)
                                            }
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key == "Enter") {
                                                onSearch(inputValue)
                                            }
                                        }}

                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    {radioOptions.map((option, index) => (
                                        <div className="flex items-center gap-1" key={index}>
                                            <input
                                                type="radio"
                                                name="type"
                                                id={option.id}
                                                checked={type === option.label}
                                                value={option.label}
                                                onChange={() => setType(option.label)}
                                            />
                                            <label htmlFor={option.id}>{option.label}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Anime Display Section */}
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">My Anime List</h2>


                                {displayMode === 'grid' && renderGrid(searchedAnimes || animeTV)}
                                {displayMode === 'list' && renderList(searchedAnimes || animeTV)}
                                {displayMode === 'table' && renderTable(searchedAnimes || animeTV)}
                            </div>
                        </div>


                        {/* Pagination */}
                        <div className="flex items-center bg-black justify-center gap-5 font-bold text-xl h-[30px] sticky bottom-0">
                            <button
                                onClick={() => handlePageChange(currPage - 1)}
                                disabled={currPage <= 1}
                            >
                                Previous
                            </button>

                            {pageNumbers.map(pageNumber => (
                                <button
                                    key={pageNumber}
                                    onClick={() => handlePageChange(pageNumber)}
                                    className={`px-2 ${pageNumber === currPage ? 'bg-gray-600' : ''}`}
                                >
                                    {pageNumber}
                                </button>
                            ))}

                            <button
                                onClick={() => handlePageChange(currPage + 1)}
                                disabled={pagination ? currPage >= totalPages : true}
                            >
                                Next
                            </button>
                        </div>
                    </>
                    :
                    <Loading />
            }
        </>
    )
}

export default AniList;