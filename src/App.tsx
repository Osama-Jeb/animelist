import { useEffect, useState } from 'react'
import './App.css'
import { db } from './firebase';
import { addDoc, collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';


interface Anime {
  id: string,
  title: string,
  cover: string,
  comment: string,
  episodes: number,
  release_year: number,
  my_score: number
}

function App() {
  const [animes, setAnimes] = useState<Anime[]>([]);

  const [newAnime, setNewAnime] = useState<any>({
    id: '',
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
    try {

      const animeCollection = collection(db, 'animes');


      await addDoc(animeCollection, {
        id: uuidv4(),
        title: newAnime.title,
        cover: newAnime.cover,
        comment: newAnime.comment,
        episodes: newAnime.episodes,
        release_year: newAnime.release_year,
        my_score: newAnime.my_score,
      });


      
      setNewAnime({
        title: '',
        cover: '',
        comment: '',
        episodes: '',
        release_year: '',
        my_score: '',
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      // Reference to the specific document to be deleted
      const docRef = doc(db, 'animes', id);
      
      // Delete the document
      await deleteDoc(docRef);
      
      // Update local state to remove the deleted document
      setAnimes(animes.filter(anime => anime.id !== id));
    } catch (e) {
      console.error('Error deleting document: ', e);
    }
  };


  useEffect(() => {
    const getAnimes = onSnapshot(collection(db, "animes"), (QuerySnapshot) => {
      const items: any = []
      QuerySnapshot.forEach((doc) => {
        items.push(doc.data())
      })

      setAnimes(items);
    })

    return () => { getAnimes() }
  }, [])

  return (
    <>
      <p>this is the home page</p>
      <div>
        <form action="" className='flex flex-col gap-4 w-[50%]' onSubmit={handleSubmit}>
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
      {
        animes && animes.map((anime, index) => (
          <div key={index}>
            <p>{anime.title}</p>
            <p>{anime.comment}</p>
            <p>{anime.my_score}</p>
            <button onClick={() => handleDelete(anime.id)} className='bg-red-500 text-white px-2 py-1 rounded'>
              Delete
            </button>
          </div>
        ))
      }
    </>
  )
}

export default App
