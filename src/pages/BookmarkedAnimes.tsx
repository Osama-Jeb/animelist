import { useState } from "react";
import { Anime, useInfo } from "../context/InfoProviders"
import { Bookmark } from "lucide-react";
import { Link } from "react-router-dom";


const BookmarkedAnime = () => {
    const { bookmarkedAnimes, onBookmarkClick } = useInfo();

    // TODO* Implement Reverse Sorting

    const [searchTerm, setSearchTerm] = useState('')
    const [sortCriteria, setSortCriteria] = useState<keyof Anime>('title')
    const [isAscending, setIsAscending] = useState(true);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    }

    const handleSortClick = (criteria: any) => {
        if (sortCriteria === criteria.toLowerCase()) {
            setIsAscending(!isAscending);
        } else {
            setSortCriteria(criteria.toLowerCase());
            setIsAscending(true);
        }
    };


    const filteredAndSortedAnimes  = bookmarkedAnimes
        ?.filter((anime) => anime.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            const order = isAscending ? 1 : -1;
            if (a[sortCriteria] < b[sortCriteria]) return -1 * order;
            if (a[sortCriteria] > b[sortCriteria]) return 1 * order;
            return 0;
        });



    return (
        <>
            <div className="container mx-auto p-4 mt-4">
                <h1 className="text-3xl font-bold mb-4">My Bookedmarked Animes</h1>
                <div className="mb-4 flex flex-col sm:flex-row justify-between gap-2">
                    <input
                        type="text"
                        placeholder="Search animes..."
                        className="p-2 border rounded flex-grow text-black"
                        value={searchTerm}
                        onChange={handleSearch}
                    />

                    {['Title', 'Score', 'Year'].map((criteria, index) => (
                        <button
                            key={index}
                            className={`px-3 py-1 rounded-lg ${criteria.toLowerCase() === sortCriteria ? 'bg-alpha' : 'bg-white text-black'}`}
                            onClick={() => handleSortClick(criteria)}
                        >
                            {criteria}
                        </button>
                    ))}

                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredAndSortedAnimes?.map((anime: any) => (
                        <div key={anime.mal_id} className="border rounded-lg shadow overflow-hidden relative">

                            <button className="absolute top-[10%] right-[10%] bg-alpha rounded p-1 z-1"
                                onClick={() => { onBookmarkClick(anime) }}
                            >
                                <Bookmark fill={`${bookmarkedAnimes?.some((anm: any) => anm.mal_id === anime.mal_id) ? "white" : "#1d4ed8"}`} />
                            </button>

                            <Link to={`/animes/${anime.mal_id}`} className="cursor-default">
                                <img src={anime.images?.webp?.large_image_url} alt={anime.title} className="w-full aspect-square" />
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold mb-2">{anime.title_english ?? anime.title}</h3>
                                    <p className="text-gray-600 mb-2">{anime.score}</p>
                                    <p className="text-sm text-gray-500 mb-1">Episodes: {anime.episodes}</p>
                                    <p className="text-sm text-gray-500 mb-2">Release Year: {anime.year}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default BookmarkedAnime