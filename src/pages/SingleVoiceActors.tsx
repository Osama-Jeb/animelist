import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useInfo } from "../context/InfoProviders";
import VoiceCharaCard from "../components/VoiceCharaCard";
import ReadMore from "../components/ReadMore";

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

    const [tab, setTab] = useState('characters');

    const renderCharacters = () => {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
                {
                    uniqueVoices?.map((ani: any, index: number) => (
                        <VoiceCharaCard ani={ani} index={index} />
                    ))
                }
            </div>
        )
    }

    const renderAnimes = () => {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {
                    actor?.anime.map((an: any, ind: number) => (
                        <div key={ind} className="group z-1 overflow-hidden rounded-lg bg-gray-900 text-white relative h-full">
                            <Link to={`/anime/${an.anime.mal_id}`}>
                                <div className="relative h-[350px]">
                                    <img src={an.anime.images.webp.large_image_url} alt={an.anime.title} className="absolute inset-0 h-full w-full object-cover" />
                                </div>
                                <div className="p-4">
                                    <h2 className="text-lg font-bold">Position: {an.position}</h2>
                                    <h2 className="text-lg font-bold">Anime: {an.anime.title}</h2>
                                </div>
                            </Link>
                        </div>
                    ))
                }
            </div>
        )
    }

    const renderManga = () => {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {
                    actor?.manga.map((an: any, ind: number) => (
                        <div key={ind} className="group z-1 overflow-hidden rounded-lg bg-gray-900 text-white relative h-full">
                            <Link to={`/manga/${an.manga.mal_id}`}>
                                <div className="relative h-[350px]">
                                    <img src={an.manga.images.webp.large_image_url} alt={an.manga.title} className="absolute inset-0 h-full w-full object-cover" />
                                </div>
                                <div className="p-4">
                                    <h2 className="text-lg font-bold">Position: {an.position}</h2>
                                    <h2 className="text-lg font-bold">Manga: {an.manga.title}</h2>
                                </div>
                            </Link>
                        </div>
                    ))
                }
            </div>
        )
    }

    function calculateAge(birthday: any) {
        const birthDate = new Date(birthday);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();

        // Adjust age if the birthday hasn't occurred yet this year
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    }


    return (
        <>
            {
                actor &&
                <section>
                    {/* Top Section With Image and Information */}
                    <div className="flex items-center justify-around mb-6">
                        <img src={actor.images.jpg.image_url} alt=""
                            className="rounded w-[25%]"
                        />
                        <div className="w-[60vw]">
                            <div className="text-2xl">
                                <p className="mb-2 text-4xl">{actor?.name}</p>
                                <p className="mb-4 text-gray-500">{actor.given_name} {actor.family_name}</p>
                                <p className="mb-4">
                                    <span>
                                        {new Date(actor.birthday).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </span>
                                    <span> (Age: {calculateAge(actor.birthday)})</span>
                                </p>
                                <p className="mb-4">Nicknames:
                                    {
                                        actor.alternate_names.map((nick: string, index: number) => (
                                            <span key={index}> {nick}
                                                {index != actor.alternate_names?.length - 1 && ','}
                                            </span>
                                        ))
                                    }
                                </p>
                            </div>

                            <article className="text-sm">
                                <span className="text-3xl">About: </span><ReadMore text={actor.about} />
                            </article>
                        </div>
                    </div>



                    {/* Tablist Buttons */}
                    <div className="flex items-center gap-2 mt-4">
                        <button
                            className={`px-4 py-2 rounded 
                                ${tab === 'characters' ? 'bg-alpha text-white' : 'bg-white text-black'}
                                ${actor?.voices && actor?.voices.length > 0 ? '' : 'hidden'}`}
                            onClick={() => setTab('characters')}
                        >
                            Characters
                        </button>
                        <button
                            className={`px-4 py-2 rounded 
                                ${tab === 'anime' ? 'bg-alpha text-white' : 'bg-white text-black'}
                                ${actor?.anime && actor?.anime.length > 0 ? '' : 'hidden'}`}
                            onClick={() => setTab('anime')}
                        >
                            Anime
                        </button>
                        <button
                            className={`px-4 py-2 rounded 
                                ${tab === 'manga' ? 'bg-alpha text-white' : 'bg-white text-black'}
                                ${actor?.manga && actor?.manga.length > 0 ? '' : 'hidden'}`}
                            onClick={() => setTab('manga')}
                        >
                            Manga
                        </button>
                    </div>

                    {/* Tab List */}
                    <br />
                    {tab === 'characters' && renderCharacters()}
                    {tab === 'anime' && renderAnimes()}
                    {tab === 'manga' && renderManga()}
                </section>
            }
        </>
    )
}

export default SingleVoiceActor;