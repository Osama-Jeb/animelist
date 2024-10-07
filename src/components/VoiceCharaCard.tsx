import { Link } from "react-router-dom";
import { useInfo } from "../context/InfoProviders";

interface CharaProps {
    ani: any,
    index: number
}

const VoiceCharaCard = ({ ani, index }: CharaProps) => {
    const {formatName} = useInfo();
    return (
        <>
            <Link to={`/characters/${ani.character.mal_id}`} key={index}
                className="relative"
            >
                <img src={ani.character.images.jpg.image_url} alt=""
                    className="w-full h-[350px] rounded-xl aspect-square object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 " />
                <div className="absolute bottom-4 w-full">
                    <p className="px-2 text-lg">Anime: {ani.anime.title}</p>
                    <hr className="my-2" />
                    <p className="px-2 text-lg ">Character: {formatName(ani.character.name)}</p>
                </div>
            </Link>
        </>
    )
}

export default VoiceCharaCard;