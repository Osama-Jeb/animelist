import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { useInfo } from "../context/InfoProviders";
import ReadMore from "../components/ReadMore";
import { Book, BookOpen, Calendar, Pen, Star, Tag } from "lucide-react";
import Loading from "../components/Loading";

const SingleManga = () => {
    const { id } = useParams();
    const { fetchSingle } = useInfo();
    const [manga, setManga] = useState<any>();
    const [pics, setPics] = useState<any>();

    const iconSize = 18;
    const iconColor = "#1d4ed8";

    useEffect(() => {
        fetchSingle(id, "manga", setManga, setPics)
    }, [id])


    const formatName = (name: string) => {
        if (name.includes(",")) {
            const [lastname, firstname] = name.split(', ');
            return `${firstname} ${lastname}`;
        } else {
            return name;
        }
    };
    return (
        <>
            {
                manga ? <section className="px-6 text-lg tracking-wider">

                    <div className="container mx-auto px-4 py-8">
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
                                        pics?.map((img: any, index: number) => (
                                            <SwiperSlide key={index} className="w-full">
                                                <img
                                                    src={img.webp?.large_image_url}
                                                    alt={manga?.title_english ?? manga?.title}
                                                    className=" rounded-lg w-full h-full"
                                                />
                                            </SwiperSlide>
                                        ))
                                    }

                                </Swiper>
                            </div>
                            <div className="md:w-2/3">
                                <h1 className="text-4xl font-bold">{manga?.title_english ?? manga?.title}</h1>
                                <h1 className="text-xl font-bold text-gray-400 mb-2">{manga?.title_japanese}</h1>
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div>
                                        <div className="font-semibold text-xl">
                                            {
                                                manga?.authors.map((auth: any, ind: number) => (
                                                    <div className="flex my-1 items-center gap-2">
                                                        <Pen size={iconSize} color={iconColor} />
                                                        <Link key={ind} to={`/va/${auth.mal_id}`} className="font-light">
                                                            {formatName(auth?.name)}
                                                        </Link>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <p className="font-semibold my-1 text-xl flex items-center gap-2">
                                            <BookOpen size={iconSize} color={iconColor} />
                                            <span className="font-light">{manga?.chapters ?? 'Still Publishing'}</span>
                                        </p>
                                        <p className="font-semibold my-1 text-xl flex items-center gap-2">
                                            <Calendar size={iconSize} color={iconColor} />
                                            <span className="font-light">{manga?.published?.prop.from.year}</span>
                                        </p>
                                    </div>
                                    <div>
                                        <p className="font-semibold my-1 flex items-center gap-2">
                                            <Book size={iconSize} color={iconColor} />
                                            <span>
                                                {manga?.serializations[0]?.name}
                                            </span>
                                        </p>
                                        <p className="font-semibold my-1 flex items-center gap-2">
                                            <Star size={iconSize} color={iconColor} />
                                            <span>
                                                {manga?.score}/10
                                            </span>
                                        </p>
                                        <p className="font-semibold my-1 flex gap-2">
                                            <Tag size={32} color={iconColor} />
                                            <span>
                                                {manga?.genres.map((theme: any) => theme?.name).join(', ')}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <h2 className="text-4xl font-semibold mb-2">Synopsis</h2>
                                <article className="mb-6">
                                    <ReadMore text={manga?.synopsis} />
                                </article>
                                <ul className="list-disc">
                                    {
                                        manga?.relations.map((rel: any) => (
                                            <li key={rel.entry[0].mal_id}>
                                                <Link
                                                    to={rel.relation == 'Adaptation' ? `/anime/${rel.entry[0].mal_id}` : `/manga/${rel.entry[0].mal_id}`}
                                                >{rel.relation} : {rel.entry[0]?.name}
                                                </Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>

                </section>
                :
                <Loading />
            }
        </>
    )
}
export default SingleManga;