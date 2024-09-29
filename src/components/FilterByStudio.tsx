import { useEffect, useState } from "react";
import { useInfo } from "../context/InfoProviders";

const FilterByStudio = () => {
    const { bookmarkedAnimes } = useInfo();

    const [filtered, setFiltered] = useState<any>()

    const counting = () => {
        // Step 1: Flatten the studios into a single array
        const allStudios = bookmarkedAnimes?.flatMap(anime => anime.studios);

        // Step 2: Count occurrences of each studio
        const studioCounts = allStudios?.reduce((acc: any, studio: any) => {
            acc[studio.name] = (acc[studio.name] || 0) + 1;
            return acc;
        }, {});

        // Step 3: Sort the counts from most to least
        const sortedStudioCounts = Object.entries(studioCounts || [])
            .sort((a: any, b: any) => b[1] - a[1]);
        setFiltered(sortedStudioCounts);

    }

    useEffect(() => {
        counting()
    }, [bookmarkedAnimes])

    const [maxStudios, setMaxStudios] = useState<number>(4);
    return (
        <>
            <div className="border border-alpha rounded-xl py-2 px-5">
                <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Most Watched Studios</h2>

                    <div className="flex items-center gap-2">
                        <button
                        className="px-3 py-1 bg-alpha rounded"
                        onClick={() => {
                            if (maxStudios > 3) {
                                setMaxStudios(maxStudios - 1)
                            }
                        }}
                        >
                            -
                        </button>
                        <button
                        className="px-3 py-1 bg-alpha rounded"
                        onClick={() => {
                            if (maxStudios < 10) {
                                setMaxStudios(maxStudios + 1)
                            }
                        }}
                        >
                            +
                        </button>
                    </div>
                </div>
                <div className="p-4">
                    <div className="space-y-4">
                        {filtered?.map((studio : any, index: number) => (
                            index < maxStudios && <div key={studio.name} className="flex items-center">
                                <div className="w-36">{studio[0]}</div>
                                <div className="flex-1 bg-gray-700 h-4 rounded-full overflow-hidden">
                                    <div
                                        className="bg-alpha h-full rounded-full"
                                        style={{ width: `${(studio[1] / filtered.length) * 100}%` }}
                                    ></div>
                                </div>
                                <div className="w-8 text-right">{studio[1]}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
export default FilterByStudio;