import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Anime } from "../context/InfoProviders";

const SingleAnime = () => {
    const { id } = useParams();
    const [animeInfo, setAnimeInfo] = useState<Anime>();

    useEffect(() => {
        const fetchAnimes = async () => {
            try {
                // Fetch data from the Jikan API
                const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);

                // Check if the response is OK
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                // Parse the JSON from the response
                const data = await response.json();

                setAnimeInfo(data.data)
            } catch (error) {
                console.error('err brr:', error);
            }
        };

        fetchAnimes();
    }, [id]);

    return (

        animeInfo && <section className="px-12 text-lg tracking-wider">

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3 flex items-center justify-center">
                        <img
                            src={animeInfo.images?.webp?.large_image_url}
                            alt={animeInfo.title_english ?? animeInfo.title}
                            width={400}
                            className=" rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="md:w-2/3">
                        <h1 className="text-4xl font-bold mb-4">{animeInfo.title_english}</h1>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <p className="font-semibold text-xl">Episodes: <span className="font-light">{animeInfo.episodes}</span></p>
                                <p className="font-semibold text-xl">Release Year: <span className="font-light">{animeInfo.year}</span></p>
                                <p className="font-semibold text-xl">Season: <span className="font-light">{animeInfo.season}</span></p>
                            </div>
                            <div>
                                <p className="font-semibold">Studio: {animeInfo.studios[0].name}</p>
                                <p className="font-semibold">Rating: {animeInfo.score}/10</p>
                                <p className="font-semibold">Genres: {animeInfo.themes.map((theme) => theme.name).join(', ')}</p>
                            </div>
                        </div>
                        <h2 className="text-4xl font-semibold mb-2">Synopsis</h2>
                        <p className="mb-6">{animeInfo.synopsis}</p>
                        {animeInfo.relations.length && <p className="text-3xl font-bold">Related Shows</p>}
                        <ul className="list-disc">

                            {
                                animeInfo.relations.map(rel => (
                                    rel.relation == "Sequel" || rel.relation == "Prequel" ?
                                        <li key={rel.entry[0].mal_id}>
                                            <Link
                                                to={`/animes/${rel.entry[0].mal_id}`}
                                            >{rel.relation} : {rel.entry[0].name}
                                            </Link>
                                        </li>
                                        :
                                        null
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default SingleAnime;