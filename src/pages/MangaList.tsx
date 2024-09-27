import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useInfo } from "../context/InfoProviders";

const MangaList = () => {
    const { fetchInfo } = useInfo();
    const [manga, setManga] = useState<any>();
    const [input, setInput] = useState('');
    const [type, setType] = useState('manga');
    const [status, setStatus] = useState('publishing');
    const [order, setOrder] = useState('score');
    const [sort, setSort] = useState('desc');

    const [currPage, setCurrPage] = useState(1);


    useEffect(() => {
        fetchInfo("manga", currPage, type, setManga, status, order, sort)
    }, [currPage, type, status, sort, order])

    const [searchedManga, setSearchedManga] = useState<any>();
    const onSearch = async (term: string) => {
        try {
            const res = await fetch(`https://api.jikan.moe/v4/manga?q=${term}&order_by=favorites&sort=desc`)
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();
            setSearchedManga(data.data);

        } catch (error) {
            console.log("search erro", error)
        }
    }
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {
                    arr?.map((mng: any, index: number) => (
                        <div key={index} className="relative border border-alpha rounded-lg overflow-hidden hover:bg-gray-900">
                            <Link to={`/manga/${mng.mal_id}`} key={index} className="cursor-default">
                                <img src={mng.images?.webp?.large_image_url} alt={mng.title} className="w-full h-64 object-cover" />
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold mb-2">{mng.title_english ?? mng.title}</h3>
                                    <p className="text-gray-600 mb-2">Score: {mng.score}</p>
                                    <p className="text-sm text-gray-500 mb-1">Chapters: {mng.chapters ?? 'Still Publishing'}</p>
                                    <p className="text-sm text-gray-500 mb-1">Release Year: {mng.published?.prop.from.year}</p>
                                    <p className="text-sm text-gray-500 mb-2">Genres: {mng.genres.map((genre: any) => genre.name).join(', ')}</p>
                                </div>
                            </Link>
                        </div>
                    ))
                }
            </div>
        )
    }

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= 2884) {
            setCurrPage(newPage);
        }
    };


    return (
        <>
            <div className="mt-5">
                <div className="mb-4 flex space-x-2 items-center">

                    <div>
                        <input type="text" placeholder="Search..." className="p-2 rounded bg-gray-800"
                            value={input}
                            onChange={(e) => {
                                setInput(e.target.value.toLowerCase())
                                if (!e.target.value) {
                                    setSearchedManga(null)
                                }
                            }}
                            onKeyDown={(e) => {
                                if (e.key == "Enter") {
                                    onSearch(input)
                                }
                            }}

                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="border rounded p-1 text-black capitalize"
                        >
                            {typeSelect.map((option) => (
                                <option key={option.id} value={option.label}>
                                    {option.label}
                                </option>
                            ))}
                        </select>

                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="border rounded p-1 text-black capitalize"
                        >
                            {statusSelect.map((option) => (
                                <option key={option.id} value={option.label}>
                                    {option.label}
                                </option>
                            ))}
                        </select>

                        <select
                            value={order}
                            onChange={(e) => setOrder(e.target.value)}
                            className="border rounded p-1 text-black capitalize"
                        >
                            {orderSelect.map((option) => (
                                <option key={option.id} value={option.label}>
                                    {option.label}
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={() => { sort == "desc" ? setSort('asc') : setSort('desc') }}
                            className="px-4 py-1 bg-alpha rounded capitalize">
                            {sort}
                        </button>
                    </div>
                </div>

                <div>
                    {
                        renderManga(searchedManga || manga)
                    }
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

                <input type="number" name="pagination" id="pagination"
                    className="text-black w-[50px] px-1 rounded"
                    value={currPage}
                    onChange={(e) => {
                        if (Math.round(parseInt(e.target.value)) > 0 && Math.round(parseInt(e.target.value)) < 1095) {
                            setCurrPage(parseInt(e.target.value))
                        }
                    }}

                />

                <button
                    onClick={() => handlePageChange(currPage + 1)}
                    disabled={currPage >= 2884}
                >
                    Next
                </button>
                
            </div>

        </>
    )
}

export default MangaList;