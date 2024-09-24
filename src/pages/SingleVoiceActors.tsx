import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useInfo } from "../context/InfoProviders";

const SingleVoiceActor = () => {
    const { id } = useParams();
    const {fetchSingle} = useInfo();
    const [actor, setActor] = useState<any>();

    useEffect(() => {
        fetchSingle(id, "people", setActor)
    }, [id])

    return (
        <>
            <p>Info on a single voice acotr and his roles with the id of : {id}</p>
            {
                actor && <div>
                    <p>{actor.name}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">

                        {
                            actor.voices.map((ani : any, index:number) => (
                                <div key={index}>
                                    <img src={ani.character.images.jpg.image_url} alt="" />
                                    <div>
                                        <p>Title: {ani.anime.title}</p>
                                        <p>Character: {ani.character.name}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default SingleVoiceActor;