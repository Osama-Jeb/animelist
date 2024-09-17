// import { collection, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
// import { db } from "../firebase";
// import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useInfo } from "../context/InfoProviders";

// import { v4 as uuidv4 } from "uuid"
// import { Grid, List, Star, TableIcon } from "lucide-react";

// interface Anime {
//     id: string,
//     title: string,
//     cover: string,
//     comment: string,
//     episodes: number,
//     release_year: number,
//     my_score: number
// }
// type DisplayMode = 'grid' | 'list' | 'masonry' | 'table'
// const AniList = () => {
//     const [displayMode, setDisplayMode] = useState<DisplayMode>('grid')

//     const collectionsRef = collection(db, 'animes');
//     const [animes, setAnimes] = useState<Anime[]>([]);
//     const [tot, setTot] = useState<number>(0);
//     const [newAnime, setNewAnime] = useState<any>({
//         title: '',
//         cover: '',
//         comment: '',
//         episodes: '',
//         release_year: '',
//         my_score: '',
//     });

//     const handleInput = (event: any) => {
//         const { name, value } = event.target;
//         setNewAnime((prevState: Anime) => ({
//             ...prevState,
//             [name]: value,
//         }));
//     }

//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();
//         const addAnime = {
//             title: newAnime.title,
//             comment: newAnime.comment,
//             cover: newAnime.cover,
//             episodes: newAnime.episodes,
//             release_year: newAnime.release_year,
//             my_score: newAnime.my_score,
//             id: uuidv4()
//         }
//         try {
//             const aniRef = doc(collectionsRef, addAnime.id);
//             await setDoc(aniRef, addAnime);

//             setNewAnime({
//                 title: '',
//                 cover: '',
//                 comment: '',
//                 episodes: '',
//                 release_year: '',
//                 my_score: '',
//             })
//         } catch (e) {
//             console.error('Error adding document: ', e);
//         }
//     };

//     const handleDelete = async (id: string) => {
//         try {
//             const animeRef = doc(collectionsRef, id);
//             await deleteDoc(animeRef);
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     useEffect(() => {

//         const unsub = onSnapshot(collectionsRef, (querySnapshot) => {
//             const items: any = [];
//             let count: number = 0;
//             querySnapshot.forEach((doc) => {
//                 items.push(doc.data());
//                 count += parseInt(doc.data().episodes) || 0;
//             })
//             setAnimes(items);
//             setTot(count);
//             return () => { unsub() }
//         })
//     }, []);

//     const orderByScore = () => {
//         const newOrder = [...animes].sort((a, b) => b.my_score - a.my_score);
//         setAnimes(newOrder);
//     }

//     const orderByTitle = () => {
//         let newOrder = [...animes].sort((a, b) => {
//             if (a.title.toLowerCase() < b.title.toLowerCase()) {
//                 return -1;
//             }
//             if (a.title.toLowerCase() > b.title.toLowerCase()) {
//                 return 1;
//             }
//             return 0;
//         });;
//         setAnimes(newOrder);
//     }

//     const renderStars = (score: number) => (
//         <div className="flex">
//             {[...Array(10)].map((_, i) => (
//                 <Star
//                     key={i}
//                     size={16}
//                     className={i < score ? 'text-yellow-400 fill-current' : 'text-gray-300'}
//                 />
//             ))}
//         </div>
//     )

//     const renderGrid = () => (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {animes.map((anime, index) => (
//                 <div key={index} className="border rounded-lg overflow-hidden shadow-lg">
//                     <img src={anime.cover} alt={anime.title} className="w-full h-64 object-cover" />
//                     <div className="p-4">
//                         <h3 className="text-xl font-semibold mb-2">{anime.title}</h3>
//                         <p className="text-gray-600 mb-2">{anime.comment}</p>
//                         <p className="text-sm text-gray-500 mb-1">Episodes: {anime.episodes}</p>
//                         <p className="text-sm text-gray-500 mb-2">Release Year: {anime.release_year}</p>
//                         <div className="flex items-center">
//                             <span className="text-sm text-gray-500 mr-1">My Score:</span>
//                             {renderStars(anime.my_score)}
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     )

//     const renderList = () => (
//         <div className="space-y-4">
//             {animes.map((anime, index) => (
//                 <div key={index} className="flex border rounded-lg overflow-hidden shadow-lg">
//                     <img src={anime.cover} alt={anime.title} className="w-48 h-48 object-cover" />
//                     <div className="p-4 flex-grow">
//                         <h3 className="text-xl font-semibold mb-2">{anime.title}</h3>
//                         <p className="text-gray-600 mb-2">{anime.comment}</p>
//                         <p className="text-sm text-gray-500 mb-1">Episodes: {anime.episodes}</p>
//                         <p className="text-sm text-gray-500 mb-2">Release Year: {anime.release_year}</p>
//                         <div className="flex items-center">
//                             <span className="text-sm text-gray-500 mr-1">My Score:</span>
//                             {renderStars(anime.my_score)}
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     )

//     const renderMasonry = () => (
//         <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
//             {animes.map((anime, index) => (
//                 <div key={index} className="break-inside-avoid mb-4 border rounded-lg overflow-hidden shadow-lg">
//                     <img src={anime.cover} alt={anime.title} className="w-full object-cover" />
//                     <div className="p-4">
//                         <h3 className="text-xl font-semibold mb-2">{anime.title}</h3>
//                         <p className="text-gray-600 mb-2">{anime.comment}</p>
//                         <p className="text-sm text-gray-500 mb-1">Episodes: {anime.episodes}</p>
//                         <p className="text-sm text-gray-500 mb-2">Release Year: {anime.release_year}</p>
//                         <div className="flex items-center">
//                             <span className="text-sm text-gray-500 mr-1">My Score:</span>
//                             {renderStars(anime.my_score)}
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     )

//     const renderTable = () => (
//         <div className="overflow-x-auto">
//             <table className="min-w-full bg-white">
//                 <thead className="bg-gray-100">
//                     <tr>
//                         <th className="px-4 py-2 text-left">Title</th>
//                         <th className="px-4 py-2 text-left">Cover</th>
//                         <th className="px-4 py-2 text-left">Comment</th>
//                         <th className="px-4 py-2 text-left">Episodes</th>
//                         <th className="px-4 py-2 text-left">Release Year</th>
//                         <th className="px-4 py-2 text-left">My Score</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {animes.map((anime, index) => (
//                         <tr key={index} className="border-b">
//                             <td className="px-4 py-2">{anime.title}</td>
//                             <td className="px-4 py-2">
//                                 <img src={anime.cover} alt={anime.title} className="w-16 h-16 object-cover" />
//                             </td>
//                             <td className="px-4 py-2">{anime.comment}</td>
//                             <td className="px-4 py-2">{anime.episodes}</td>
//                             <td className="px-4 py-2">{anime.release_year}</td>
//                             <td className="px-4 py-2">{renderStars(anime.my_score)}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     )

//     return (
//         <>
//             <div className="p-5">
//                 <div>
//                     <div className="flex items-center justify-center">
//                         <form action="" className='flex flex-col gap-4 w-[50%]' onSubmit={handleSubmit} >
//                             <input className='w-full p-2 border rounded'
//                                 type="text" name="title" value={newAnime.title} placeholder="Title"
//                                 onChange={handleInput}
//                             />
//                             <input className='w-full p-2 border rounded'
//                                 type="url" name="cover" value={newAnime.cover} placeholder="Cover"
//                                 onChange={handleInput} />
//                             <input className='w-full p-2 border rounded'
//                                 type="text" name="comment" value={newAnime.comment} placeholder="Comment"
//                                 onChange={handleInput}
//                             />
//                             <input className='w-full p-2 border rounded'
//                                 type="number" name="episodes" value={newAnime.episodes} placeholder="Number of Episodes"
//                                 onChange={handleInput}
//                             />
//                             <input className='w-full p-2 border rounded'
//                                 type="number" name="release_year" value={newAnime.release_year} placeholder="Release Year"
//                                 onChange={handleInput}
//                             />
//                             <input className='w-full p-2 border rounded'
//                                 type="number" name="my_score" value={newAnime.my_score} placeholder="My Score (0-10)"
//                                 min="0" max="10"
//                                 onChange={handleInput}
//                             />
//                             <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
//                                 Add Anime
//                             </button>
//                         </form>
//                     </div>
//                     <div>
//                         <div className="flex items-center gap-2">
//                             <button onClick={orderByScore}>Score</button>
//                             <button onClick={orderByTitle}>Title</button>
//                         </div>
//                         <p>Anime Count: {animes && animes.length}</p>
//                         <p>Total Episodes: {tot} episodes</p>
//                         <p>Minutes: {tot * 24} minutes</p>
//                         <p>Hours: {(tot * 24) / 60} Hours</p>
//                     </div>
//                 </div>

//                 {/* Display Mode Selector */}
//                 <div className="mb-4 flex space-x-2">
//                     <button
//                         onClick={() => setDisplayMode('grid')}
//                         className={`p-2 ${displayMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}
//                     >
//                         <Grid size={20} />
//                     </button>
//                     <button
//                         onClick={() => setDisplayMode('list')}
//                         className={`p-2 ${displayMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}
//                     >
//                         <List size={20} />
//                     </button>
//                     <button
//                         onClick={() => setDisplayMode('masonry')}
//                         className={`p-2 ${displayMode === 'masonry' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}
//                     >
//                         <Grid size={20} />
//                     </button>
//                     <button
//                         onClick={() => setDisplayMode('table')}
//                         className={`p-2 ${displayMode === 'table' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}
//                     >
//                         <TableIcon size={20} />
//                     </button>
//                 </div>

//                 {/* Anime Display Section */}
//                 <div>
//                     <h2 className="text-2xl font-semibold mb-4">My Anime List</h2>
//                     {displayMode === 'grid' && renderGrid()}
//                     {displayMode === 'list' && renderList()}
//                     {displayMode === 'masonry' && renderMasonry()}
//                     {displayMode === 'table' && renderTable()}
//                 </div>
//             </div>

//         </>
//     )
// }

// export default AniList;

const AniList = () => {
    const { allAnimes, pagination, currentPage, handlePageChange } = useInfo();

    const totalPages = pagination ? pagination.last_visible_page : 1;
    const maxPagesToShow = 3;

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pageNumbers = [];
        const startPage = Math.max(1, currentPage - maxPagesToShow);
        const endPage = Math.min(totalPages, currentPage + maxPagesToShow);

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };
    const pageNumbers = getPageNumbers();

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {allAnimes?.map((anime, index) => (
                    <Link
                        to={`/animes/${anime.mal_id}`}
                        key={index} className="border rounded-lg overflow-hidden shadow-lg">
                        <img src={anime.images?.webp?.large_image_url} alt={anime.title} className="w-full h-32 object-cover aspect-square" />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">{anime.title_english ?? anime.title}</h3>
                            <p className="text-sm text-gray-500 mb-1">Episodes: {anime.episodes}</p>
                            <p className="text-sm text-gray-500 mb-2">Release Year: {anime.year}</p>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="flex items-center bg-black justify-center gap-5 font-bold text-xl h-[30px] sticky bottom-0">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                >
                    Previous
                </button>

                {pageNumbers.map(pageNumber => (
                    <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`px-2 ${pageNumber === currentPage ? 'bg-gray-600' : ''}`}
                    >
                        {pageNumber}
                    </button>
                ))}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={pagination ? currentPage >= totalPages : true}
                >
                    Next
                </button>
            </div>
        </>
    )
}

export default AniList;