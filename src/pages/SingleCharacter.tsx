import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { useInfo } from "../context/InfoProviders";

const SingleCharacter = () => {
    const { id } = useParams()
    const { fetchSingle, formatName } = useInfo();

    const [character, setCharacter] = useState<any>();
    const [pics, setPics] = useState<any>();

    useEffect(() => {
        fetchSingle(id, "characters", setCharacter, setPics)
    }, [id])

    return (
        <>

            {
                character && <section className="px-6 text-lg tracking-wider">

                    <div className="container mx-auto px-4 py-8">
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="md:w-1/3 flex justify-center">

                                <Swiper
                                    slidesPerView={1}
                                    modules={[Navigation, Autoplay]}
                                    navigation
                                    loop={true}
                                    autoplay={{
                                        delay: 2000,
                                        disableOnInteraction: false,
                                    }}
                                >
                                    {
                                        pics?.map((img: any, index: number) => (
                                            <SwiperSlide key={index} className="w-full">
                                                <img
                                                    src={img.jpg.image_url}
                                                    alt={character.name}
                                                    className=" rounded-lg w-full h-full"
                                                />
                                            </SwiperSlide>
                                        ))
                                    }

                                </Swiper>
                            </div>
                            <div className="md:w-2/3">
                                <h1 className="text-4xl font-bold mb-4">{character.name}</h1>
                                    <div className="flex flex-col gap-2">
                                        <p className="font-semibold text-xl">Anime: <Link to={`/anime/${character.anime[0].anime.mal_id}`} className="font-light">{character.anime[0].anime.title} </Link></p>
                                        <p className="font-semibold text-xl">Japanese Name: <span className="font-light">{character.name_kanji}</span></p>
                                        <p className="font-semibold text-xl">
                                            Voice By: {character.voices.filter((char: any) => char.language === "Japanese").map((cha: any) => (<><Link to={`/va/${cha.person.mal_id}`} className="font-light">{formatName(cha.person.name)}
                                            
                                            </Link></>))}
                                        </p>

                                        <p className="font-semibold text-xl">
                                            NickNames: {character.nicknames.length > 0 ? character.nicknames.map((char: string, index: number) => (
                                                <span key={index} className="font-light"> {char}
                                                {index != character.nicknames.length - 1 && ','}
                                                </span>
                                            ))
                                            :
                                            <>
                                            NONE
                                            </>
                                        }
                                        </p>
                                    </div>
                                <h2 className="text-4xl font-semibold my-3">About: </h2>
                                <article className="mb-6">{character.about}</article>
                            </div>
                        </div>
                    </div>

                </section>
            }
        </>
    )
}

export default SingleCharacter;