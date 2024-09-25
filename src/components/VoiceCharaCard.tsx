import { Link } from "react-router-dom";

interface CharaProps {
    ani : any,
    index: number
}

const VoiceCharaCard = ({ ani, index }: CharaProps) => {
    return (
        <>
            <Link to={`/characters/${ani.character.mal_id}`} key={index}
            className="border border-alpha/50 rounded"
            >
                <img src={ani.character.images.jpg.image_url} alt=""
                className="w-full aspect-square object-cover rounded-t "
                />
                <div className="px-4 flex items-start gap-3 flex-col p-2">
                    <p>Anime: {ani.anime.title}</p>
                    <p>Character: {ani.character.name}</p>
                </div>
            </Link>
        </>
    )
}

export default VoiceCharaCard;