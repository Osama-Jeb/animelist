import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useInfo } from "../context/InfoProviders";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";

const Characters = () => {
    const { fetchInfo, onSearch, loading } = useInfo();
    const [characters, setCharacters] = useState<any>();
    const [curr, setCurr] = useState(1);

    const [input, setInput] = useState('');
    const [searchedChara, setSearchedChara] = useState<any>();

    useEffect(() => {
        fetchInfo('characters', curr, "all", setCharacters, 'all', 'favorites', 'desc',);
    }, [curr])

    const renderChara = (charas: any | null) => {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {charas?.map((chara: any, index: number) => (
                    <div key={index} className=" rounded-lg overflow-hidden bg-alpha/20 relative">
                        <Link to={`/characters/${chara.mal_id}`} key={index}>
                            <img src={chara.images?.jpg?.image_url} alt={chara.title} className="w-full h-64 object-cover" />
                            <div className="p-4">
                                <p className="my-1 text-xl">{chara.name}</p>
                                <p className="my-1">
                                    <span className="text-lg m-1">{chara.nicknames.length > 0 ? 'Also Known As: ' : 'No Nickname'}</span>
                                    {chara.nicknames.map((nickname: string, index: number) => (
                                        <span key={index} className="inline-block bg-alpha/40 rounded-full px-2 py-1 m-1 text-sm">
                                            {nickname}
                                        </span>
                                    ))}
                                </p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        )
    }

    return (
        characters && !loading ?
            <>
                <div className="py-3">
                    <input type="text" placeholder="Search Name..." className="p-2 rounded bg-gray-800"
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value.toLowerCase())
                            if (!e.target.value) {
                                setSearchedChara(null)
                            }
                        }}
                        onKeyDown={(e) => {
                            if (e.key == "Enter") {
                                onSearch("characters", input, setSearchedChara)
                            }
                        }}

                    />
                </div>
                {renderChara(searchedChara || characters)}


                {/* Pagination */}
                <Pagination currentPage={curr} setCurrentPage={setCurr} max={186280} />
            </>
            :
            <Loading />
    )
}

export default Characters;