import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useInfo } from "../context/InfoProviders";
import Pagination from "../components/Pagination";
import { Calendar } from "lucide-react";
import Loading from "../components/Loading";

const VoiceActors = () => {
    const { onSearch, loading } = useInfo();
    const [voiceActors, setVoiceActors] = useState<any>();
    const [order, setOrder] = useState<string>('favorites');
    const [currPage, setCurrPage] = useState(1);

    const [input, setInput] = useState('');
    const [searchededVA, setSearcheedVa] = useState<any>();

    const fetchVoiceActors = async () => {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/people?page=${currPage}&order_by=${order}&sort=desc`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setVoiceActors(data.data);
        } catch (error) {
            console.error('err brr:', error);
        }
    };
    useEffect(() => {
        if (input) {
            onSearch('people', input, setSearcheedVa, currPage)
        } else {
            fetchVoiceActors()
        }
    }, [order, currPage])


    const orderSelect = [
        { id: "favorites", label: "Popularity" },
        { id: "name", label: "Name" },
        { id: "birthday", label: "Birthday" },
    ];


    const rendeerVA = (actors: any | null) => {
        return (
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
                {actors?.map((chara: any, index: number) => (
                    <div key={index} className="relative bg-alpha/30 rounded-lg overflow-hidden hover:bg-gray-900">
                        <Link to={`/va/${chara?.mal_id}`} key={index} className="cursor-default">
                            <img src={chara?.images?.jpg?.image_url} alt={chara?.title} className="w-full h-64 object-cover" />
                            <div className="p-4 flex flex-col gap-2">
                                <p className="text-center text-lg">{chara?.name}</p>
                                <p className="text-center text-[#9ca3af]">({chara?.given_name} {chara?.family_name})</p>
                                <p className="flex items-center gap-2">
                                    <Calendar size={16} color="#9ca3af" /> {new Date(chara?.birthday).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                                <p className="my-1">
                                    {/* <span>{chara?.alternate_names.length > 0 ? '' : 'No Nickname'}</span> */}
                                    {chara?.alternate_names?.map((nickname: string, index: number) => (
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
        voiceActors && !loading ?
            <>

                <div className="flex items-center gap-2">
                    <input type="text" placeholder="Search..." className="p-2 rounded bg-gray-800"
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value.toLowerCase())
                            if (!e.target.value) {
                                setSearcheedVa(null)
                            }
                        }}
                        onKeyDown={(e) => {
                            if (e.key == "Enter") {
                                onSearch("people", input, setSearcheedVa, currPage)
                            }
                        }}

                    />
                    <select
                        value={order}
                        onChange={(e) => setOrder(e.target.value)}
                        className="border rounded p-1 text-black capitalize"
                    >
                        {orderSelect?.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.label}
                            </option>
                        ))}
                    </select>
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