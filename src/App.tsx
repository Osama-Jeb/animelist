import { collection, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { v4 as uuidv4 } from "uuid"

interface Anime {
  id: string,
  title: string,
  cover: string,
  comment: string,
  episodes: number,
  release_year: number,
  my_score: number
}

const App = () => {
  const collectionsRef = collection(db, 'animes');
  const [animes, setAnimes] = useState<Anime[]>([]);
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
      const items : any = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());

      })
      setAnimes(items);
      return () => {unsub()}
    })
  }, []);

  return (
    <div className="p-5">
      <p>this is the home page</p>
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

        <div className="flex gap-5">
          {
            animes && animes.map((anime, index) => (
              <div key={index} className='bg-gray-500 rounded flex items-center flex-col my-4 relative w-[250px] pb-3'>
                <img src={anime.cover} alt="the cover" className='rounded' />
                <p>{anime.title}</p>
                <p>{anime.comment}</p>
                <p>{anime.my_score}</p>
                <p>{anime.release_year}</p>
                <p>{anime.id}</p>
                <button onClick={() => handleDelete(anime.id)} className='bg-red-500 text-white px-2 py-1 rounded absolute top-[5px] right-[5px]'>
                  Delete
                </button>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default App;
