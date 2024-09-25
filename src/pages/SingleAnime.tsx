import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Anime } from "../context/InfoProviders";

import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import Loading from "../components/Loading";


const SingleAnime = () => {

    const { id } = useParams();
    const [animeInfo, setAnimeInfo] = useState<Anime>();
    const [animeImages, setAnimeImages] = useState<any>();
    const [animeChara, setAnimeChara] = useState<any>();

    useEffect(() => {
        const fetchAnimes = async () => {
            try {

                const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
                const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/pictures`);
                const resp = await fetch(`https://api.jikan.moe/v4/anime/${id}/characters`)

                if (!response.ok || !res.ok || !response.ok) {
                    throw new Error('Network response was not ok');
                }


                const data = await response.json();
                const imgs = await res.json();
                const chars = await resp.json();

                setAnimeInfo(data.data);
                setAnimeImages(imgs.data);
                setAnimeChara(chars.data);
            } catch (error) {
                console.error('err brr:', error);
            }
        };

        fetchAnimes();
    }, [id]);


    const formatName = (name: string) => {
        if (name.includes(",")) {
            const [lastname, firstname] = name.split(', ');
            return `${firstname} ${lastname}`;
        } else {
            return name;
        }
    };
    return (

        animeInfo ? <section className="px-12 text-lg tracking-wider">

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3 flex items-center justify-center">

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
                                animeImages?.map((img: any, index: number) => (
                                    <SwiperSlide key={index} className="w-full">
                                        <img
                                            src={img.webp?.large_image_url}
                                            alt={animeInfo.title_english ?? animeInfo.title}
                                            className=" rounded-lg w-full"
                                        />
                                    </SwiperSlide>
                                ))
                            }

                        </Swiper>
                    </div>
                    <div className="md:w-2/3">
                        <h1 className="text-4xl font-bold mb-4">{animeInfo.title_english}</h1>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <p className="font-semibold text-xl">Episodes: <span className="font-light">{animeInfo.episodes ?? 'Still Airing'}</span></p>
                                <p className="font-semibold text-xl">Release Year: <span className="font-light">{animeInfo.year}</span></p>
                                <p className="font-semibold text-xl">Season: <span className="font-light">{animeInfo.season}</span></p>
                            </div>
                            <div>
                                <p className="font-semibold">Studio: {animeInfo.studios[0].name}</p>
                                <p className="font-semibold">Rating: {animeInfo.score}/10</p>
                                <p className="font-semibold">Genres: {animeInfo.genres.map((theme) => theme.name).join(', ')}</p>
                            </div>
                        </div>
                        <h2 className="text-4xl font-semibold mb-2">Synopsis</h2>
                        <article className="mb-6">{animeInfo.synopsis}</article>
                        <ul className="list-disc">

                            {
                                animeInfo.relations.map(rel => (
                                    rel.relation == "Sequel" || rel.relation == "Prequel" ?
                                        <li key={rel.entry[0].mal_id}>
                                            <Link
                                                to={`/anime/${rel.entry[0].mal_id}`}
                                            >{rel.relation} : {rel.entry[0].name}
                                            </Link>
                                        </li>
                                        :
                                        null
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>

            <div>
                <h1 className="text-4xl my-2">More Details: </h1>

                <p>Characters: </p>
                <div className="overflow-x-auto my-4">
                    <div className="flex gap-7 w-fit">
                        {animeChara
                            ?.sort((a: any, b: any) => b.favorites - a.favorites)
                            .map((chara: any, index: number) => (
                                <div key={index} className="border-2 border-alpha/50 rounded-xl ">
                                    <Link to={`/characters/${chara.character.mal_id}`}>
                                        <img src={chara.character.images.webp.image_url}
                                            className="w-full rounded-xl aspect-square object-cover"
                                            alt="" />
                                        <div className="p-3 flex flex-col gap-2 w-[250px]">
                                            <p>Name: {formatName(chara.character.name)}</p>
                                            <p>Role: {chara.role}</p>
                                            <p>Voice Actor: {chara.voice_actors.map((human: any, ind: number) => (
                                                <span key={ind}>
                                                    {human.language === "Japanese" && human.person.name.replace(",", "")}
                                                </span>
                                            ))}</p>
                                            <p>Liked by {chara.favorites} person</p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                    </div>
                </div>

            </div>
        </section>
            :
            <Loading />

    )
}

export default SingleAnime;