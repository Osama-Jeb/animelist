import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useInfo } from "../context/InfoProviders";

const Characters = () => {
    const { fetchInfo } = useInfo();
    const [characters, setCharacters] = useState<any>();
    const [curr, setCurr] = useState(1);

    useEffect(() => {
        fetchInfo('characters', curr, "all", setCharacters, 'all', 'favorites', 'desc');
    }, [curr])

    const [input, setInput] = useState('');
    const [searchedChara, setSearchedChara] = useState<any>();
    const onSearch = async (term: string) => {
        try {
            const res = await fetch(`https://api.jikan.moe/v4/characters?q=${term}&order_by=favorites&sort=desc`)
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();
            setSearchedChara(data.data);

        } catch (error) {
            console.log("search erro", error)
        }
    }

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= 186280) {
            setCurr(newPage);
        }
    };
    const renderChara = (charas: any | null) => {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {charas?.map((chara: any, index: number) => (
                    <div key={index} className="relative border border-alpha rounded-lg overflow-hidden hover:bg-gray-900">
                        <Link to={`/characters/${chara.mal_id}`} key={index} className="cursor-default">
                            <img src={chara.images?.jpg?.image_url} alt={chara.title} className="w-full h-64 object-cover" />
                            <div className="p-4">
                                <p className="my-1">Name: {chara.name}</p>
                                <p className="my-1">Name Kanji: {chara.name_kanji}</p>
                                <p className="my-1">
                                    NickNames: {chara.nicknames.length > 0 ? chara.nicknames.map((char: string, index: number) => (
                                        <span key={index} className="font-light">{char}, </span>
                                    ))
                                        :
                                        <>
                                            NONE
                                        </>
                                    }
                                </p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        )
    }

    return (
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
                            onSearch(input)
                        }
                    }}

                />
            </div>
            {renderChara(searchedChara || characters)}


            {/* Pagination */}
            <div className="flex items-center bg-black justify-center gap-5 font-bold text-xl h-[30px] sticky bottom-0">
                <button
                    onClick={() => handlePageChange(curr - 1)}
                    disabled={curr <= 1}
                >
                    Previous
                </button>

                <input type="number" name="pagination" id="pagination"
                    className="text-black w-[50px] px-1"
                    value={curr}
                    onChange={(e) => {
                        if (Math.round(parseInt(e.target.value)) > 0 && Math.round(parseInt(e.target.value)) < 1095) {
                            setCurr(parseInt(e.target.value))
                        }
                    }}

                />

                <button
                    onClick={() => handlePageChange(curr + 1)}
                    disabled={curr >= 186280}
                >
                    Next
                </button>

            </div>
        </>
    )
}

export default Characters;