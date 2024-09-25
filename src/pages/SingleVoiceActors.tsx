import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useInfo } from "../context/InfoProviders";
import VoiceCharaCard from "../components/VoiceCharaCard";

const SingleVoiceActor = () => {
    const { id } = useParams();
    const { fetchSingle } = useInfo();
    const [actor, setActor] = useState<any>();
    const [uniqueVoices, setUniqueVoices] = useState<any>();

    useEffect(() => {
        fetchSingle(id, "people", setActor)

        const uv = actor?.voices.filter((ani: any, index: number, self: any) =>
            index === self.findIndex((t: any) => (
                t.character.name === ani.character.name
            ))
        );

        setUniqueVoices(uv);
    }, [id, uniqueVoices, actor])

    return (
        <>
            {
                actor && <div>
                    <div className="flex items-center justify-around gap-2">
                        <div className="flex flex-col items-center text-xl">
                            <img src={actor.images.jpg.image_url} alt=""
                                className="w-[300px]"
                            />
                            <p className="mt-3">Name: {actor.name}</p>
                            <p>Name Kanji: {actor.given_name} {actor.family_name}</p>
                            <p>
                                Birthday: {new Date(actor.birthday).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                        <div className="w-[60vw] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                            {
                                uniqueVoices?.map((ani: any, index: number) => (
                                    index < 10 && <VoiceCharaCard ani={ani} index={index} />
                                ))
                            }

                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mt-4">
                        {
                            uniqueVoices?.map((ani: any, index: number) => (
                                index > 10 && <VoiceCharaCard ani={ani} index={index} />
                            ))
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default SingleVoiceActor;