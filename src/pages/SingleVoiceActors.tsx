import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useInfo } from "../context/InfoProviders";

const SingleVoiceActor = () => {
    const { id } = useParams();
    const { fetchSingle } = useInfo();
    const [actor, setActor] = useState<any>();

    useEffect(() => {
        fetchSingle(id, "people", setActor)
    }, [id])

    return (
        <>
            <p>Info on a single voice acotr and his roles with the id of : {id}</p>
            {
                actor && <div>
                    <p className="text-4xl">{actor.name}</p>
                    <div className="flex items-center">
                        <img src={actor.images.jpg.image_url} alt="" />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                            {
                                actor.voices.map((ani: any, index: number) => (
                                    index < 10 && <Link to={`/characters/${ani.character.mal_id}`} key={index}>
                                        <img src={ani.character.images.jpg.image_url} alt="" />
                                        <div>
                                            <p>Title: {ani.anime.title}</p>
                                            <p>Character: {ani.character.name}</p>
                                        </div>
                                    </Link>
                                ))
                            }

                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {
                            actor.voices.map((ani: any, index: number) => (
                                index > 10 && <Link to={`/characters/${ani.character.mal_id}`} key={index}>
                                    <img src={ani.character.images.jpg.image_url} alt="" />
                                    <div>
                                        <p>Title: {ani.anime.title}</p>
                                        <p>Character: {ani.character.name}</p>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default SingleVoiceActor;