import { collection, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid"
import Navbar from "../components/Navbar";

interface Anime {
    id: string,
    title: string,
    cover: string,
    comment: string,
    episodes: number,
    release_year: number,
    my_score: number
}

const AniList = () => {


    const collectionsRef = collection(db, 'animes');
    const [animes, setAnimes] = useState<Anime[]>([]);
    const [tot, setTot] = useState<number>(0);
    const [newAnime, setNewAnime] = useState<any>({
        title: '',
        cover: '',
        comment: '',
        episodes: '',
        release_year: '',
        my_score: '',
    });

    const handleInput = (event: any) => {
        const { name, value } = event.target;
        setNewAnime((prevState: Anime) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const addAnime = {
            title: newAnime.title,
            comment: newAnime.comment,
            cover: newAnime.cover,
            episodes: newAnime.episodes,
            release_year: newAnime.release_year,
            my_score: newAnime.my_score,
            id: uuidv4()
        }
        try {
            const aniRef = doc(collectionsRef, addAnime.id);
            await setDoc(aniRef, addAnime);

            setNewAnime({
                title: '',
                cover: '',
                comment: '',
                episodes: '',
                release_year: '',
                my_score: '',
            })
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const animeRef = doc(collectionsRef, id);
            await deleteDoc(animeRef);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        const unsub = onSnapshot(collectionsRef, (querySnapshot) => {
            const items: any = [];
            let count: number = 0;
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
                count += parseInt(doc.data().episodes) || 0;
            })
            setAnimes(items);
            setTot(count);
            return () => { unsub() }
        })
    }, []);

    const orderByScore = () => {
        const newOrder = [...animes].sort((a, b) => b.my_score - a.my_score);
        setAnimes(newOrder);
    }

    const orderByTitle = () => {
        let newOrder = [...animes].sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1;
            }
            if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
            }
            return 0;
        });;
        setAnimes(newOrder);
    }

    return (
        <>
            <Navbar />
            <div className="p-5">
                <div>
                    <div className="flex items-center justify-center">
                        <form action="" className='flex flex-col gap-4 w-[50%]' onSubmit={handleSubmit} >
                            <input className='border-2 border-gray-400'
                                type="text" name="title" value={newAnime.title} placeholder="title"
                                onChange={handleInput}
                            />
                            <input className='border-2 border-gray-400'
                                type="url" name="cover" value={newAnime.cover} placeholder="cover"
                                onChange={handleInput} />
                            <input className='border-2 border-gray-400'
                                type="text" name="comment" value={newAnime.comment} placeholder="comment"
                                onChange={handleInput}
                            />
                            <input className='border-2 border-gray-400'
                                type="number" name="episodes" value={newAnime.episodes} placeholder="episodes"
                                onChange={handleInput}
                            />
                            <input className='border-2 border-gray-400'
                                type="number" name="release_year" value={newAnime.release_year} placeholder="release_year"
                                onChange={handleInput}
                            />
                            <input className='border-2 border-gray-400'
                                type="number" name="my_score" value={newAnime.my_score} placeholder="my_score"
                                onChange={handleInput}
                            />
                            <button type="submit" className='bg-black rounded text-white py-2'>Add </button>
                        </form>
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <button onClick={orderByScore}>Score</button>
                            <button onClick={orderByTitle}>Title</button>
                        </div>
                        <p>Anime Count: {animes && animes.length}</p>
                        <p>Total Episodes: {tot} episodes</p>
                        <p>Minutes: {tot * 24} minutes</p>
                        <p>Hours: {(tot * 24) / 60} Hours</p>
                    </div>
                    <div className="grid grid-cols-4 gap-3 mt-4">
                        {
                            animes && animes.map((anime, index) => (
                                <div key={index} className='bg-gray-300 rounded flex items-center flex-col my-4 relative w-[300px] pb-3'>
                                    <img src={anime.cover} alt="the cover" className='rounded-t w-full aspect-square' />
                                    <div className="p-3">
                                        <p>Title: {anime.title}</p>
                                        <br />
                                        <p>My Score: {anime.my_score}/10</p>
                                        <br />
                                        <p>Release Year: {anime.release_year}</p>
                                        <br />
                                        <p>Comment: {anime.comment}</p>
                                    </div>
                                    <button onClick={() => handleDelete(anime.id)} className='bg-red-500 text-white px-2 py-1 rounded absolute top-[5px] right-[5px]'>
                                        Delete
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default AniList;