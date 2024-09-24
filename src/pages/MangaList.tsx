import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MangaList = () => {
    const [manga, setManga] = useState<any>();

    const fetchManga = async () => {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/top/manga`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setManga(data.data);
        } catch (error) {
            console.error('err brr:', error);
        }
    };
    useEffect(() => {
        fetchManga()
    }, [])

    return (
        <>
            <p className="mt-5">List of mangas here</p>
            <p className="text-3xl">IN PROGRESS</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {manga?.map((mng:any, index : number) => (
                    <div key={index} className="relative border border-alpha rounded-lg overflow-hidden hover:bg-gray-900">
                        <Link to={`/manga/${mng.mal_id}`} key={index} className="cursor-default">
                            <img src={mng.images?.webp?.large_image_url} alt={mng.title} className="w-full h-64 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">{mng.title_english ?? mng.title}</h3>
                                <p className="text-gray-600 mb-2">{mng.score}</p>
                                <p className="text-sm text-gray-500 mb-1">Chapters: {mng.chapters ?? 'Still Publishing'}</p>
                                <p className="text-sm text-gray-500 mb-1">Release Year: {mng.published?.prop.from.year}</p>
                                <p className="text-sm text-gray-500 mb-2">Genres: {mng.genres.map((genre:any) => genre.name).join(', ')}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    )
}

export default MangaList;