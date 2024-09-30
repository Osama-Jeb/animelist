import { useState } from "react";
import { Anime, useInfo } from "../context/InfoProviders"
import { Bookmark, Calendar, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";


const BookmarkedAnime = () => {
    const { bookmarkedAnimes, onBookmarkClick } = useInfo();

    const [searchTerm, setSearchTerm] = useState('')
    const [sortCriteria, setSortCriteria] = useState<keyof Anime>('score')
    const [isAscending, setIsAscending] = useState(true);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    }

    const handleSortClick = (criteria: any) => {
        setSortCriteria(criteria.toLowerCase());
    };


    const filteredAndSortedAnimes = bookmarkedAnimes
        ?.filter((anime) => anime.titles[0].title.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            const order = isAscending ? 1 : -1;
            if (a[sortCriteria] < b[sortCriteria]) return -1 * order;
            if (a[sortCriteria] > b[sortCriteria]) return 1 * order;
            return 0;
        });


    const [showMax, setShowMax] = useState(10);
    return (
        <>
            <div className="container mx-auto p-4 mt-4">
                <h1 className="text-3xl font-bold mb-4">My Bookedmarked Animes</h1>
                <div className="mb-4 flex flex-col sm:flex-row justify-between gap-2">
                    <input
                        type="text"
                        placeholder="Search Animes..."
                        className="p-2 border rounded flex-grow text-black"
                        value={searchTerm}
                        onChange={handleSearch}
                    />

                    <select
                        // value={type}
                        onChange={(e) => handleSortClick(e.target.value)}
                        className="border rounded p-2 text-black capitalize"
                    >
                        <option disabled value="">Type</option>

                        {['Score', 'Year', 'Episodes'].map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <button className="px-3 py-1 rounded-lg bg-alpha"
                        onClick={() => setIsAscending(!isAscending)}
                    >
                        {isAscending ? 'Ascending' : 'Descending'}
                    </button>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {filteredAndSortedAnimes?.map((anime: any, index: number) => (
                        index < showMax &&
                        <div key={index} className="group z-1 overflow-hidden rounded-lg bg-gray-900 text-white relative">

                            <button className="cursor-default absolute top-[5%] right-[5%] bg-alpha rounded-full p-2 z-10"
                                onClick={() => { onBookmarkClick(anime) }}
                            >

                                <Bookmark fill={`${bookmarkedAnimes?.some((anm: any) => anm.mal_id === anime.mal_id) ? "white" : "#1d4ed8"}`} />
                            </button>
                            <Link to={`/anime/${anime.mal_id}`}>
                                <div className="relative h-[300px] lg:h-[400px]">
                                    <img src={anime.images?.webp?.large_image_url} alt={anime.title} className="absolute inset-0 h-full w-full object-cover" />

                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                                    <div className="absolute bottom-4 left-4">
                                        <span className="rounded-full bg-alpha text-white px-2 py-1 text-sm font-bold">
                                            {anime.score}
                                        </span>
                                    <h2 className="text-lg font-bold mb-2">{anime.title_english ?? anime.title}</h2>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <PlayCircle size={16} color="#9ca3af" />
                                            <span className="text-sm text-gray-400">{anime.episodes ?? 'Still Airing'}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar size={16} color="#9ca3af" />
                                            <span className="text-sm text-gray-400">{anime.year}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {anime.genres.map((genre: any, ind: number) => (
                                                <span
                                                    key={ind}
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
                <button className={`bg-alpha rounded w-full py-3 mt-4`}
                    onClick={() => {
                        if (bookmarkedAnimes && showMax < bookmarkedAnimes?.length) {
                            setShowMax(showMax + 15)
                        }
                    }}
                >
                    Show More
                </button>
            </div>
        </>
    )
}

export default BookmarkedAnime