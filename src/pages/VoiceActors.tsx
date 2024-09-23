import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const VoiceActors = () => {
    const [voiceActors, setVoiceActors] = useState<any>();

    const fetchVoiceActors = async () => {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/top/people`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setVoiceActors(data.data);
        } catch (error) {
            console.error('err brr:', error);
        }
    };
    useEffect(() => {
        fetchVoiceActors()
    }, [])

    return (
        <>
            <p>Page to show Anime Voice Actors</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {voiceActors?.map((chara: any, index: number) => (
                    <div key={index} className="relative border border-alpha rounded-lg overflow-hidden hover:bg-gray-900">
                        <Link to={`/va/${chara.mal_id}`} key={index} className="cursor-default">
                        <img src={chara.images?.jpg?.image_url} alt={chara.title} className="w-full h-64 object-cover" />
                        <div className="p-4">
                            <p>Name: {chara.name}</p>
                            <p>Japanese Name: {chara.given_name} {chara.family_name}</p>

                        </div>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    )
}

export default VoiceActors;