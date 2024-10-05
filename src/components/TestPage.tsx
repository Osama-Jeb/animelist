// import React, { useEffect, useState } from 'react'
// // import { Star, ChevronDown, Play } from 'lucide-react'
// import { Anime, useInfo } from '../context/InfoProviders';
// import { useColor } from 'color-thief-react';

// export default function TestPage() {





//     const { fetchSingle } = useInfo();
//     const id = "21"
//     const [animeInfo, setAnimeInfo] = useState<Anime>();
//     const [animeImages, setAnimeImages] = useState<any>();
//     const [animeChara, setAnimeChara] = useState<any>();

//     // Call useColor only when you have the image URL
//     const imageUrl = animeInfo && animeInfo?.images?.jpg?.large_image_url;
//     const { data: colors } = useColor(imageUrl as string, 'hex', { quality: 2, crossOrigin: 'anonymous' });

//     const fetchCharacters = async () => {
//         try {
//             const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/characters`)

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             const chars = await response.json();

//             setAnimeChara(chars.data);
//         } catch (error) {
//             console.error('err brr:', error);
//         }
//     };
//     useEffect(() => {
//         fetchSingle(id, "anime", setAnimeInfo, setAnimeImages);
//         fetchCharacters();
//     }, [id]);


//     const YouTubeEmbed = (videoId: string) => {
//         return (
//             videoId && <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
//                 <iframe
//                     title="YouTube video"
//                     src={`https://www.youtube.com/embed/${videoId}`}
//                     style={{
//                         position: 'absolute',
//                         top: 0,
//                         left: 0,
//                         width: '100%',
//                         height: '90%',
//                     }}
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                     allowFullScreen
//                 />
//             </div>
//         );
//     };

//     return (
//         <>
//             {
//                 animeInfo && <section className="z-20"
//                 // style={{
//                 //     background: colors
//                 //         ? `linear-gradient(to top, ${colors} 50%, transparent 100%)`
//                 //         : 'transparent',
//                 //     minHeight: '250vh',

//                 // }}
//                 >

//                     {/* header */}
//                     <div className="relative"
//                         style={{
//                             background: colors
//                                 ? `linear-gradient(to top, ${colors} 50%, transparent 100%)`
//                                 : 'transparent',
//                         }}

//                     >
//                         <img src={animeInfo?.images.webp.large_image_url} className="w-full h-[100vh] object-cover absolute top-0 -z-10" alt="" />


//                         <div className="px-12 z-20">
//                             <h1 className="text-7xl">{animeInfo.title_english ?? animeInfo.title}</h1>
//                             <p>{animeInfo.aired.prop.from.year} - {animeInfo.rating} - {animeInfo.duration} - LANGUAGE</p>
//                             <div className="flex items-center justify-between mt-4 ">
//                                 <div className="flex items-center gap-4">
//                                     <img src={animeImages && animeImages[0].webp?.large_image_url} className='w-[250px] rounded-lg' alt="" />
//                                     <div className="w-[50%]">
//                                         <p className="text-xl font-bold">Created By {animeInfo?.studios[0]?.name}</p>
//                                         <p>{animeInfo.synopsis}</p>
//                                         <div className="flex items-center gap-2">
//                                             {animeInfo.genres.map((gen: any) => <span className="border border-white rounded-full px-3 py-1">{gen.name}</span>)}
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div>
//                                     Rating Score
//                                 </div>

//                             </div>
//                         </div>
//                         {/* other content */}
//                         {
//                             animeInfo?.trailer.youtube_id &&
//                             <div className="my-6 px-12">
//                                 <h1 className="text-4xl my-2">Trailer: </h1>
//                                 {YouTubeEmbed(animeInfo?.trailer.youtube_id)}
//                             </div>
//                         }
//                     </div>



//                 </section>
//             }
//         </>
//     )
// }