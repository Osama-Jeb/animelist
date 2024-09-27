import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const VoiceActors = () => {
    const [voiceActors, setVoiceActors] = useState<any>();
    const [order, setOrder] = useState<string>('favorites');
    const [currPage, setCurrPage] = useState(1);


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
        fetchVoiceActors()
    }, [order, currPage])


    const orderSelect = [
        { id: "favorites", label: "Popularity" },
        { id: "name", label: "Name" },
        { id: "birthday", label: "Birthday" },
    ];
    const [input, setInput] = useState('');
    const [searchededVA, setSearcheedVa] = useState<any>();
    const onSearch = async (term: string) => {
        try {
            const res = await fetch(`https://api.jikan.moe/v4/people?q=${term}&order_by=${order}&sort=desc`)
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();
            setSearcheedVa(data.data);

        } catch (error) {
            console.log("search erro", error)
        }
    }


    const rendeerVA = (actors: any | null) => {
        return (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {actors?.map((chara: any, index: number) => (
                    <div key={index} className="relative border border-alpha rounded-lg overflow-hidden hover:bg-gray-900">
                        <Link to={`/va/${chara.mal_id}`} key={index} className="cursor-default">
                            <img src={chara.images?.jpg?.image_url} alt={chara.title} className="w-full h-64 object-cover" />
                            <div className="p-4">
                                <p>Name: {chara.name}</p>
                                <p>Japanese Name: {chara.given_name} {chara.family_name}</p>

                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        )
    }

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= 2593) {
            setCurrPage(newPage);
        }
    };
    return (
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
                            onSearch(input)
                        }
                    }}

                />
                <select
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                    className="border rounded p-1 text-black capitalize"
                >
                    {orderSelect.map((option) => (
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
            <div className="flex items-center bg-black justify-center gap-5 font-bold text-xl h-[30px] sticky bottom-0">
                <button
                    onClick={() => handlePageChange(currPage - 1)}
                    disabled={currPage <= 1}
                >
                    Previous
                </button>

                <input type="number" name="pagination" id="pagination"
                    className="text-black w-[50px] px-1 rounded"
                    value={currPage}
                    onChange={(e) => {
                        if (Math.round(parseInt(e.target.value)) > 0 && Math.round(parseInt(e.target.value)) < 1095) {
                            setCurrPage(parseInt(e.target.value))
                        }
                    }}

                />

                <button
                    onClick={() => handlePageChange(currPage + 1)}
                    disabled={currPage >= 2884}
                >
                    Next
                </button>

            </div>
        </>
    )
}

export default VoiceActors;