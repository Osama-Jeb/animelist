import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleVoiceActor = () => {
    const { id } = useParams()
    const [actor, setActor] = useState<any>();

    const fetchActor = async () => {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/people/${id}/full`)

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setActor(data.data);
        } catch (error) {
            console.error('err brr:', error);
        }
    }

    useEffect(() => {
        fetchActor()
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