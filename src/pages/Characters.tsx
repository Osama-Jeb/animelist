import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Characters = () => {

    const [characters, setCharacters] = useState<any>();

    const fetchCharacters = async () => {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/top/characters`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setCharacters(data.data);
        } catch (error) {
            console.error('err brr:', error);
        }
    };
    useEffect(() => {
        fetchCharacters()
    }, [])

    return (
        <>
            <p>page to show anime characters</p>
            <p>IN PROGRESS</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {characters?.map((chara: any, index: number) => (
                    <div key={index} className="relative border border-alpha rounded-lg overflow-hidden hover:bg-gray-900">
                        <Link to={`/characters/${chara.mal_id}`} key={index} className="cursor-default">
                        <img src={chara.images?.jpg?.image_url} alt={chara.title} className="w-full h-64 object-cover" />
                        <div className="p-4">
                            <p>Name: {chara.name}</p>

                        </div>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Characters;