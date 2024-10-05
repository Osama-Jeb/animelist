import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useInfo } from "../context/InfoProviders";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";
import { Search } from "lucide-react";

const Characters = () => {
    const { fetchInfo, onSearch, loading } = useInfo();
    const [characters, setCharacters] = useState<any>();
    const [curr, setCurr] = useState(1);

    const [input, setInput] = useState('');
    const [searchedChara, setSearchedChara] = useState<any>();

    useEffect(() => {
        if (input) {
            onSearch('characters', input, setSearchedChara, curr);
        } else {
            fetchInfo('characters', curr, "all", setCharacters, 'all', 'favorites', 'desc',);
        }
    }, [curr])

    const renderChara = (charas: any | null) => {
        return (
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
                {charas?.map((chara: any, index: number) => (
                    <Link to={`/characters/${chara.mal_id}`} key={index}>
                        <div className="relative h-[400px]">
                            <img src={chara.images?.jpg?.image_url} alt={chara.title} className="absolute inset-0 h-full w-full object-cover" />
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent  transition-all duration-300" />
                            <div className="absolute bottom-4 left-4">
                                <p className="my-1 text-xl">{chara.name}</p>
                                <p className="my-1">
                                    <span className="text-lg m-1">{chara.nicknames.length > 0 ? 'Also Known As: ' : 'No Nickname'}</span>
                                    {chara.nicknames.map((nickname: string, index: number) => (
                                        index < 3 && <span key={index} className="inline-block bg-alpha/40 rounded-full px-2 py-1 m-1 text-sm">
                                            {nickname}
                                        </span>
                                    ))}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        )
    }

    return (
        characters && !loading ?
            <>
                <div className="py-3 flex items-center gap-2">
                    <input type="text" placeholder="Search Name..." className="p-2 rounded bg-gray-800 w-full md:w-fit"
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value.toLowerCase())
                            if (!e.target.value) {
                                setSearchedChara(null)
                                setCurr(1)
                            }
                        }}
                        onKeyDown={(e) => {
                            if (e.key == "Enter") {
                                onSearch("characters", input, setSearchedChara, curr)
                                setCurr(1)
                            }
                        }}

                    />

                    <button
                        className="px-3 py-2 rounded bg-alpha"
                        onClick={() => {
                            if (input) {
                                onSearch('characters', input, setSearchedChara, curr)
                                setCurr(1)
                            }
                        }
                        }

                    >

                        <Search size={20} />
                    </button>

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