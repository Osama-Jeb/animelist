import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Anime, useInfo } from "../context/InfoProviders";

import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import Loading from "../components/Loading";
import { Building2, Calendar, Heart, Mic, PlayCircle, Star, SunSnow, Tag } from "lucide-react";
import ReadMore from "../components/ReadMore";
// import { useColor } from "color-thief-react";

// TODO*** Color-thief for palette
const SingleAnime = () => {




    const { fetchSingle } = useInfo();
    const { id } = useParams();
    const [animeInfo, setAnimeInfo] = useState<Anime>();
    const [animeImages, setAnimeImages] = useState<any>();
    const [animeChara, setAnimeChara] = useState<any>();

    // Call useColor only when you have the image URL
    // const imageUrl = animeInfo && animeInfo?.images?.jpg?.large_image_url;
    // const { data: colors } = useColor(imageUrl as string, 'hex', { quality: 2, crossOrigin: 'anonymous' });

    const fetchCharacters = async () => {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/characters`)

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const chars = await response.json();

            setAnimeChara(chars.data);
        } catch (error) {
            console.error('err brr:', error);
        }
    };
    useEffect(() => {
        fetchSingle(id, "anime", setAnimeInfo, setAnimeImages);
        fetchCharacters();
    }, [id]);


    const formatName = (name: string) => {
        if (name.includes(",")) {
            const [lastname, firstname] = name.split(', ');
            return `${firstname} ${lastname}`;
        } else {
            return name;
        }
    };

    const createYouTubeLink = (text: string) => {
        const match = text.match(/"(.*?)"/);
        const searchText = match ? match[1] : '';
        const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchText)}`;
        return <a href={url} target="_blank" rel="noopener noreferrer">{searchText}</a>;
    };

    const YouTubeEmbed = (videoId: string) => {
        return (
            videoId && <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                <iframe
                    title="YouTube video"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '90%',
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
        );
    };

    const iconSize = 20;
    const iconColor = "#1d4ed8";
    return (

        animeInfo ? <section className="px-6 text-lg tracking-wider relative"
        // style={{
        //     background: colors
        //         ? `linear-gradient(to top, ${colors} 20%, transparent 100%)`
        //         : 'transparent',
        // }}
        >

            {/* new header */}
            {/* <div
                className="h-screen absolute inset-0 -z-10 opacity-35"
                style={{
                    backgroundImage: `url(${animeInfo?.images.jpg.large_image_url})`, // Fix: add `url()`
                    backgroundSize: 'cover', // Optional: ensure the image covers the entire div
                    backgroundPosition: 'center', // Optional: centers the background image
                }}
            >
            </div> */}

            <div className={`container mx-auto px-4 py-8`}


            >
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3 flex  justify-center">

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
                                            alt={animeInfo?.title_english ?? animeInfo?.title}
                                            className=" rounded-lg w-full h-full"
                                        />
                                    </SwiperSlide>
                                ))
                            }

                        </Swiper>
                        {/* <img
                            src={animeInfo?.images.jpg?.large_image_url}
                            alt={animeInfo?.title_english ?? animeInfo?.title}
                            className=" rounded-lg w-full h-full"
                        /> */}
                    </div>
                    <div className="md:w-2/3">
                        <h1 className="text-4xl font-bold">{animeInfo?.title_english ?? animeInfo?.title}</h1>
                        <h1 className="text-xl font-bold text-gray-400 mb-2">{animeInfo?.title_japanese}</h1>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <p className="font-semibold my-1 text-xl flex items-center gap-2">
                                    <PlayCircle size={iconSize} color={iconColor} />
                                    <span className="font-light">{animeInfo?.episodes ?? 'Still Airing'}</span>
                                </p>
                                <p className="font-semibold my-1 text-xl flex items-center gap-2">
                                    <Calendar size={iconSize} color={iconColor} />
                                    <span className="font-light">{animeInfo?.aired?.prop?.from?.year}</span>
                                </p>
                                <p className="font-semibold my-1 text-xl flex items-center gap-2">
                                    <SunSnow size={iconSize} color={iconColor} />
                                    <span className="font-light">{animeInfo?.season}</span>
                                </p>
                            </div>
                            <div>
                                <p className="font-semibold my-1 flex items-center gap-2">
                                    <Building2 size={iconSize} color={iconColor} />
                                    <span>
                                        {animeInfo?.studios[0]?.name}
                                    </span>
                                </p>
                                <p className="font-semibold my-1 flex items-center gap-2">
                                    <Star size={iconSize} color={iconColor} />
                                    <span>
                                        {animeInfo?.score}
                                    </span>
                                </p>
                                <p className="font-semibold flex items-center gap-2">
                                    <Tag size={27} color={iconColor} />
                                    <span>
                                        {animeInfo?.genres.map((theme: any) => theme.name).join(', ')}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <h2 className="text-4xl font-semibold mb-2">Synopsis: </h2>
                        <article className="mb-6">
                            <ReadMore text={animeInfo?.synopsis} />
                        </article>

                        <h2 className="text-4xl font-semibold mb-2">Related: </h2>
                        <ul className="list-disc">

                            {
                                animeInfo?.relations.map(rel => (
                                    <li key={rel.entry[0].mal_id}>
                                        <Link
                                            to={rel.relation != 'Adaptation' ? `/anime/${rel.entry[0].mal_id}` : `/manga/${rel.entry[0].mal_id}`}
                                        >{rel.relation} : {rel.entry[0].name}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>

            {
                animeInfo?.trailer.youtube_id &&
                <div className="mb-6">
                    <h1 className="text-4xl my-2">Trailer: </h1>
                    {YouTubeEmbed(animeInfo?.trailer.youtube_id)}
                </div>
            }

            <div>

                <div>
                    <p className="text-4xl my-2">Characters: </p>
                    <div className="overflow-x-auto my-4 h-full">
                        {/* TODO: swipers responsive */}
                        <Swiper
                            slidesPerGroup={2}
                            spaceBetween={50}
                            modules={[Navigation]}
                            navigation
                            loop={true}
                            breakpoints={{
                                0: {
                                    slidesPerView: 1,
                                    spaceBetween: 0,
                                },
                                640: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                                768: {
                                    slidesPerView: 4,
                                    spaceBetween: 40,
                                },
                                1024: {
                                    slidesPerView: 5,
                                    spaceBetween: 50,
                                },
                            }}
                        >
                            {animeChara
                                ?.sort((a: any, b: any) => b.favorites - a.favorites)
                                .map((chara: any, index: number) => (
                                    <SwiperSlide key={index}>
                                        <div className="rounded-xl bg-alpha/30"
                                        // style={{
                                        //     backgroundColor: colors,
                                        // }}
                                        >
                                            <Link to={`/characters/${chara.character.mal_id}`}>
                                                <img src={chara.character.images.webp.image_url}
                                                    className="w-full rounded-xl aspect-square object-cover"
                                                    alt="" />
                                                <div className="p-3">
                                                    <p className="my-1">{formatName(chara.character.name)}</p>
                                                    {/* <p className="my-1">Role: {chara.role}</p> */}
                                                    <div className="my-1">{chara.voice_actors.map((human: any, ind: number) => (
                                                        human.language === "Japanese" &&
                                                        <p key={ind} className="flex items-center gap-1">
                                                            <Mic size={16} color="#9ca3af" />
                                                            <span> {human.person.name.replace(",", "")}</span>
                                                        </p>

                                                    ))}
                                                    </div>
                                                    <p className="my-1 flex items-center gap-1"><Heart size={16} color="#9ca3af" /> {chara.favorites}</p>
                                                </div>
                                            </Link>
                                        </div>
                                    </SwiperSlide>
                                ))}

                        </Swiper>
                    </div>


                </div>


                {
                    animeInfo?.theme.openings && animeInfo?.theme.endings && (animeInfo?.theme.openings.length > 0 || animeInfo?.theme.endings.length > 0) && <div>
                        {/* <h1 className="text-4xl my-2">Theme Songs: </h1> */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-0">

                            <div>
                                <p className="text-4xl my-2">Openings: </p>
                                <ul className="list-disc px-3">
                                    {
                                        animeInfo?.theme.openings.map((op, ind) => (
                                            <li className="my-2" key={ind}>
                                                {
                                                    createYouTubeLink(op)
                                                }
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>

                            <div>
                                <p className="text-4xl my-2">Endings: </p>
                                <ul className="list-disc px-3">
                                    {
                                        animeInfo?.theme.endings.map((ed, ind) => (
                                            <li className="my-2" key={ind}>
                                                {
                                                    createYouTubeLink(ed)
                                                }
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                }


            </div>
        </section>
            :
            <Loading />

    )
}

export default SingleAnime;