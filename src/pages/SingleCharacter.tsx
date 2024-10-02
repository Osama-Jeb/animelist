import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import { useInfo } from "../context/InfoProviders";
import ReadMore from "../components/ReadMore";
import Loading from "../components/Loading";

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
                character ? <section className="px-6 text-lg tracking-wider">

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
                                            <SwiperSlide key={img.jpg.image_url} className="w-full">
                                                <img
                                                    src={img.jpg.image_url}
                                                    alt={character?.name}
                                                    className=" rounded-lg w-full h-full"
                                                />
                                            </SwiperSlide>
                                        ))
                                    }

                                </Swiper>
                            </div>
                            <div className="md:w-2/3">
                                <h1 className="text-4xl font-bold">{character?.name}</h1>
                                <h1 className="text-xl font-bold text-gray-400 mb-2">{character?.name_kanji}</h1>
                                <div className="flex flex-col gap-2">
                                    <p className="font-semibold text-xl">Anime: <Link to={`/anime/${character?.anime[0].anime.mal_id}`} className="font-light">{character?.anime[0].anime.title} </Link></p>
                                    <p className="font-semibold text-xl">
                                        Japanese Voice: {character?.voices.filter((char: any) => char.language === "Japanese").map((cha: any) =>
                                        (<><Link key={cha.person.name} to={`/va/${cha.person.mal_id}`} className="font-light">{formatName(cha.person.name)}

                                            <span>, </span>

                                        </Link></>))}
                                    </p>

                                    <p className="font-semibold text-xl">
                                        NickNames: {character?.nicknames.length > 0 ? character?.nicknames.map((char: string, index: number) => (
                                            <span key={index} className="font-light"> {char}
                                                {index != character?.nicknames.length - 1 && ','}
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
                                <article className="mb-6">
                                    <ReadMore text={character?.about} />
                                </article>
                            </div>
                        </div>
                    </div>


                    <div>
                        <h1 className="text-4xl my-6">Animes: </h1>
                        <Swiper
                            slidesPerView={5}
                            slidesPerGroup={2}
                            spaceBetween={30}
                            modules={[Navigation]}
                            navigation
                            loop={true}
                        >

                            {character?.anime.map((anime: any) => (
                                <SwiperSlide
                                    style={{ height: "500px" }}
                                    key={anime.anime.mal_id}
                                >

                                    <div className="group z-1 overflow-hidden rounded-lg bg-gray-900 text-white relative h-full">
                                        <Link to={`/anime/${anime.anime.mal_id}`}>
                                            <div className="relative h-[350px]">
                                                <img src={anime.anime.images?.webp?.large_image_url} alt={anime.title} className="absolute inset-0 h-full w-full object-cover" />
                                            </div>
                                            <div className="p-4">
                                                <h2 className="text-lg font-bold mb-2">{anime.anime.title}</h2>
                                            </div>
                                        </Link>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>


                    <div>
                        <h1 className="text-4xl my-6">Manga: </h1>
                        <Swiper
                            slidesPerView={5}
                            slidesPerGroup={2}
                            spaceBetween={30}
                            modules={[Navigation]}
                            navigation
                            loop={true}
                        >

                            {character?.manga.map((mng: any) => (
                                <SwiperSlide
                                    style={{ height: "450px" }}
                                    key={mng.manga.mal_id}
                                >

                                    <div  className="group z-1 overflow-hidden rounded-lg bg-gray-900 text-white relative h-full">
                                        <Link to={`/manga/${mng.manga.mal_id}`}>
                                            <div className="relative h-[350px]">
                                                <img src={mng.manga.images?.webp?.large_image_url} alt={mng.manga.title} className="absolute inset-0 h-full w-full object-cover" />
                                            </div>
                                            <div className="p-4">
                                                <h2 className="text-lg font-bold mb-2">{mng.manga.title}</h2>
                                            </div>
                                        </Link>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <div>
                        <h1 className="text-4xl my-6">Voice Actors: </h1>
                        <Swiper
                            slidesPerView={5}
                            slidesPerGroup={2}
                            spaceBetween={30}
                            modules={[Navigation]}
                            navigation
                            loop={true}
                        >

                            {character?.voices.map((va: any) => (
                                <SwiperSlide
                                    style={{ height: "500px" }}
                                    key={va.person.mal_id}
                                >

                                    <div  className="group z-1 overflow-hidden rounded-lg bg-gray-900 text-white relative h-full">
                                        <Link to={`/va/${va.person.mal_id}`}>
                                            <div className="relative h-[350px]">
                                                <img src={va.person.images?.jpg?.image_url} alt={va.person.name} className="absolute inset-0 h-full w-full object-cover" />
                                            </div>
                                            <div className="p-4">
                                                <h2 className="text-lg font-bold mb-2">{formatName(va.person.name)}</h2>
                                                <h2 className="text-lg font-bold mb-2">Language: {va.language}</h2>
                                            </div>
                                        </Link>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                </section>
                    :
                    <Loading />
            }
        </>
    )
}

export default SingleCharacter;