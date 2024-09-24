import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { useInfo } from "../context/InfoProviders";

const SingleManga = () => {
    const { id } = useParams();
    const {fetchSingle} = useInfo();
    const [manga, setManga] = useState<any>();
    const [pics, setPics] = useState<any>();

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
                manga && <section className="px-6 text-lg tracking-wider">

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
                                        pics?.map((img: any, index: number) => (
                                            <SwiperSlide key={index} className="w-full">
                                                <img
                                                    src={img.webp?.large_image_url}
                                                    alt={manga.title_english ?? manga.title}
                                                    className=" rounded-lg w-full"
                                                />
                                            </SwiperSlide>
                                        ))
                                    }

                                </Swiper>
                            </div>
                            <div className="md:w-2/3">
                                <h1 className="text-4xl font-bold mb-4">{manga.title_english ?? manga.title}</h1>
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div>
                                        <p className="font-semibold text-xl">Author: <span className="font-light">{formatName(manga.authors[0].name)}</span></p>
                                        <p className="font-semibold text-xl">Chapters: <span className="font-light">{manga.chapters ?? 'Still Publishing'}</span></p>
                                        <p className="font-semibold text-xl">Release Year: <span className="font-light">{manga.published?.prop.from.year}</span></p>
                                    </div>
                                    <div>
                                        {/* <p className="font-semibold">Studio: {manga.studios[0].name}</p> */}
                                        <p className="font-semibold">Rating: {manga.score}/10</p>
                                        <p className="font-semibold">Genres: {manga.genres.map((theme : any) => theme.name).join(', ')}</p>
                                    </div>
                                </div>
                                <h2 className="text-4xl font-semibold mb-2">Synopsis</h2>
                                <article className="mb-6">{manga.synopsis}</article>
                                <ul className="list-disc">

                                    {/* {
                                        manga.relations.map(rel => (
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
                                    } */}
                                </ul>
                            </div>
                        </div>
                    </div>

                </section>
}
        </>
    )
}
export default SingleManga;