import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useInfo } from "../context/InfoProviders";
import Pagination from "../components/Pagination";
import { Calendar, Search } from "lucide-react";
import Loading from "../components/Loading";

const VoiceActors = () => {
    const { onSearch, loading } = useInfo();
    const [voiceActors, setVoiceActors] = useState<any>();
    const [currPage, setCurrPage] = useState(1);

    const [input, setInput] = useState('');
    const [searchededVA, setSearchedVA] = useState<any>();

    const fetchVoiceActors = async () => {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/people?page=${currPage}&order_by=favorites&sort=desc`);

            if (!response.ok) {
                throw new Error('Voice Chara response no OK');
            }

            const data = await response.json();
            setVoiceActors(data.data);
        } catch (error) {
            console.error('err brr:', error);
        }
    };
    useEffect(() => {
        if (input) {
            onSearch('people', input, setSearchedVA, currPage)
        } else {
            fetchVoiceActors()
        }
    }, [currPage])

    const rendeerVA = (actors: any | null) => {
        return (
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
                {actors?.map((chara: any, index: number) => (
                    <Link to={`/va/${chara?.mal_id}`} key={index}>
                        <div className="relative h-[400px]">
                            <img src={chara?.images?.jpg?.image_url} alt={chara?.title} className="absolute inset-0 h-full w-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent  transition-all duration-300" />

                            <div className="absolute bottom-4 w-full">
                                <p className="text-center text-lg">{chara?.name}</p>
                                <p className="text-center text-[#9ca3af]">({chara?.given_name} {chara?.family_name})</p>
                                <br />
                                <p className="flex items-center justify-center gap-2 "> 
                                    <Calendar size={16} color="#9ca3af" /> 
                                    {new Date(chara?.birthday).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        )
    }

    return (
        voiceActors && !loading ?
            <>

                <div className="flex items-center gap-2">
                    <input type="text" placeholder="Search..." className="p-2 rounded bg-gray-800 w-full md:w-fit"
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value.toLowerCase())
                            if (!e.target.value) {
                                setSearchedVA(null)
                                setCurrPage(1)
                            }
                        }}
                        onKeyDown={(e) => {
                            if (e.key == "Enter") {
                                onSearch("people", input, setSearchedVA, currPage)
                                setCurrPage(1)
                            }
                        }}

                    />

                    <button
                        className="px-3 py-2 bg-alpha rounded"
                        onClick={() => {
                            onSearch('people', input, setSearchedVA, currPage)
                            setCurrPage(1)
                        }}
                    >
                        <Search size={20} />
                    </button>
                </div>

                <div className="mt-4">
                    {rendeerVA(searchededVA || voiceActors)}

                </div>


                {/* Pagination */}
                <Pagination currentPage={currPage} setCurrentPage={setCurrPage} max={2884} />
            </>
            :
            <Loading />
    )
}

export default VoiceActors;