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
    return (
        <>
            <div className="w-full lg:w-[40vw] border border-alpha rounded-xl py-2 px-5">
                <h1 className="text-3xl my-3">Most Watched Studios  </h1>

                <div className="flex items-center justify-between px-5 flex-col gap-2">
                    {
                        filtered?.map((element : any, index : number) => (

                            index < 5 && <div key={index} className="flex items-center justify-between w-full">
                                <p className="text-xl">{element[0]}</p>
                                
                                <p className="bg-alpha/60 px-3 py-1 rounded-full">{element[1]}</p>
                            </div>
                        ))
                    }

                </div>
            </div>
        </>
    )
}
export default FilterByStudio;