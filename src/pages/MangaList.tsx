import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useInfo } from "../context/InfoProviders";
import Pagination from "../components/Pagination";
import { BookOpen, Calendar, Star } from "lucide-react";
import Loading from "../components/Loading";

const MangaList = () => {
    const { fetchInfo, onSearch, loading } = useInfo();

    const [manga, setManga] = useState<any>();
    const [input, setInput] = useState('');
    const [type, setType] = useState('');
    const [status, setStatus] = useState('');
    const [order, setOrder] = useState('');
    const [sort, setSort] = useState('desc');
    const [genres, setGenres] = useState<number[]>([])
    const [currPage, setCurrPage] = useState(1);

    const [searchedManga, setSearchedManga] = useState<any>();


    useEffect(() => {
        if (input) {
            onSearch("manga", input, setSearchedManga, currPage)
        } else {
            fetchInfo("manga", currPage, type, setManga, status, order, sort, genres)
        }
    }, [currPage, type, status, sort, order, genres])


    const typeSelect = [
        { id: "manga", label: "manga" },
        { id: "manhwa", label: "manhwa" },
        { id: "manhua", label: "manhua" },
        { id: "novel", label: "novel" },
        { id: "lightnovel", label: "lightnovel" },
    ];

    const statusSelect = [
        { id: 'publishing', label: 'publishing' },
        { id: 'complete', label: 'complete' },
        { id: 'hiatus', label: 'hiatus' },
        { id: 'discontinued', label: 'discontinued' },
    ];

    const orderSelect = [
        { id: "score", label: "score" },
        { id: "chapters", label: "chapters" },
        { id: "volumes", label: "volumes" },
        { id: "title", label: "title" },
        { id: "favorites", label: "favorites" },
        { id: "popularity", label: "popularity" },
        { id: "start_date", label: "start_date" },
        { id: "rank", label: "rank" },
    ];

    const renderManga = (arr: any | null) => {
        return (
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 md:gap-6">
                {
                    arr?.map((mng: any, index: number) => (
                        <Link to={`/manga/${mng.mal_id}`} key={index} className="group z-1 overflow-hidden rounded-lg bg-gray-900 text-white relative">
                            <div className="relative h-[200px] md:h-[350px]">
                                <img
                                    src={mng.images?.webp?.large_image_url} className="object-cover h-full w-full "
                                    alt="" />
                            </div>
                            <div className="px-2 pb-2 md:p-3">
                                <h2 className="text-xl font-bold mb-3">{mng.title_english ?? mng.title}</h2>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center">
                                        <Star className="w-5 h-5 mr-2 text-yellow-400" />
                                        <span>{mng.score}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <BookOpen className="w-5 h-5 mr-2 text-blue-400" />
                                        <span>{mng.chapters ?? 'Still Publishing'}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Calendar className="w-5 h-5 mr-2 text-green-400" />
                                        <span>{mng.published?.prop.from.year}</span>
                                    </div>
                                </div>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {mng.genres.map((genre: any, index: number) => (

                                        index < 3 && <span key={index} className="px-2 py-1 text-xs font-semibold rounded-full bg-alpha/30 text-gray-200">
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        )
    }


    const handleRemoveGenre = (genreId: number) => {
        setGenres(genres.filter(gen => gen !== genreId));
    };
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
        { id: "45", name: "Suspense" },
        { id: "50", name: "Adult Cast" },
        { id: "51", name: "Anthropomorphic" },
        { id: "52", name: "CGDCT" },
        { id: "53", name: "Childcare" },
        { id: "54", name: "Combat Sports" },
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
        { id: "68", name: "Memoir" },
        { id: "38", name: "Military" },
        { id: "19", name: "Music" },
        { id: "6", name: "Mythology" },
        { id: "69", name: "Organized Crime" },
        { id: "70", name: "Otaku Culture" },
        { id: "20", name: "Parody" },
        { id: "71", name: "Performing Arts" },
        { id: "72", name: "Pets" },
        { id: "40", name: "Psychological" },
        { id: "3", name: "Racing" },
        { id: "73", name: "Reincarnation" },
        { id: "74", name: "Reverse Harem" },
        { id: "75", name: "Romantic Subtext" },
        { id: "21", name: "Samurai" },
        { id: "23", name: "School" },
        { id: "76", name: "Showbiz" },
        { id: "29", name: "Space" },
        { id: "11", name: "Strategy Game" },
        { id: "31", name: "Super Power" },
        { id: "77", name: "Survival" },
        { id: "78", name: "Team Sports" },
        { id: "79", name: "Time Travel" },
        { id: "32", name: "Vampire" },
        { id: "80", name: "Video Game" },
        { id: "81", name: "Villainess" },
        { id: "82", name: "Visual Arts" },
        { id: "48", name: "Workplace" },
        { id: "42", name: "Josei" },
        { id: "15", name: "Kids" },
        { id: "41", name: "Seinen" },
        { id: "25", name: "Shoujo" },
        { id: "27", name: "Shounen" }
    ];

    return (
        manga && !loading ?
            <>
                <div className="mt-5">
                    <div className="mb-4 flex space-x-2 items-center flex-wrap">

                        <input type="text" placeholder="Search..." className="p-2 rounded bg-gray-800 w-full md:w-fit"
                            value={input}
                            onChange={(e) => {
                                setInput(e.target.value.toLowerCase())
                                if (!e.target.value) {
                                    setSearchedManga(null)
                                    setCurrPage(1)
                                }
                            }}
                            onKeyDown={(e) => {
                                if (e.key == "Enter") {
                                    onSearch("manga", input, setSearchedManga, currPage)
                                }
                            }}

                        />

                        {
                            !input && <div className="flex items-center gap-3 md:gap-2 flex-wrap mt-4 md:m-0">
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="border rounded p-1 md:p-2 text-black capitalize"
                            >
                                <option disabled value="">Type</option>
                                {typeSelect.map((option) => (
                                    <option key={option.id} value={option.label}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="border rounded p-1 md:p-2 text-black capitalize"
                            >
                                <option disabled value="">Status</option>
                                {statusSelect.map((option) => (
                                    <option key={option.id} value={option.label}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={order}
                                onChange={(e) => setOrder(e.target.value)}
                                className="border rounded p-1 md:p-2 text-black capitalize"
                            >
                                <option disabled value="">Order By</option>
                                {orderSelect.map((option) => (
                                    <option key={option.id} value={option.label}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>

                            <button
                                onClick={() => { sort == "desc" ? setSort('asc') : setSort('desc') }}
                                className="p-1 md:p-2 bg-alpha rounded capitalize">
                                {sort}
                            </button>

                            <select
                                value=""
                                onChange={(e) =>
                                    setGenres([...genres, parseInt(e.target.value)])
                                }
                                className="border rounded p-1 md:p-2 text-black capitalize"
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
                        }
                    </div>

                    <div>
                        {
                            renderManga(searchedManga || manga)
                        }
                    </div>

                </div>

                {/* Pagination */}
                <Pagination currentPage={currPage} max={2884} setCurrentPage={setCurrPage} />
            </>
            :
            <Loading />
    )
}

export default MangaList;