import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useInfo } from "../context/InfoProviders";
import VoiceCharaCard from "../components/VoiceCharaCard";

const SingleVoiceActor = () => {
    const { id } = useParams();
    const { fetchSingle } = useInfo();
    const [actor, setActor] = useState<any>();
    const [uniqueVoices, setUniqueVoices] = useState<any>();
    //* TODO: Remove the first 2 rows and replace them with information about the VA
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
                        <div className="text-xl border border-alpha rounded">
                            <img src={actor.images.jpg.image_url} alt=""
                                className="w-full"
                            />
                            <div className="p-2">
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
                        </div>
                        <div className="w-[60vw]">
                            <p className="text-2xl mb-5">Nicknames:
                                {
                                    actor.alternate_names.map((nick: string, index: number) => (
                                        <span key={index}> {nick}
                                            {index != actor.alternate_names.length - 1 && ','}
                                        </span>
                                    ))
                                }
                            </p>

                            <p className="text-sm leading-6 tracking-wide"><span className="text-2xl">About: </span>
                                {
                                    actor.about
                                }
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mt-4">
                        {
                            uniqueVoices?.map((ani: any, index: number) => (
                                <VoiceCharaCard ani={ani} index={index} />
                            ))
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default SingleVoiceActor;