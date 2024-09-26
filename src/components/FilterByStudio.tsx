// import { useEffect, useState } from "react";
// import { useInfo } from "../context/InfoProviders";

const FilterByStudio = () => {
    // const { bookmarkedAnimes } = useInfo();

    // const [test, setTest] = useState<any>()

    // const counting = () => {
    //     // Step 1: Flatten the studios into a single array
    //     const allStudios = bookmarkedAnimes?.flatMap(anime => anime.studios);

    //     // Step 2: Count occurrences of each studio
    //     const studioCounts = allStudios?.reduce((acc, studio: any) => {
    //         acc[studio.name] = (acc[studio.name] || 0) + 1;
    //         return acc;
    //     }, {});

    //     // Step 3: Sort the counts from most to least
    //     const sortedStudioCounts = Object.entries(studioCounts)
    //         .sort((a, b) => b[1] - a[1]);

    //     // Output the counts
    //     // console.log(studioCounts);
    //     setTest(sortedStudioCounts);

    // }

    // useEffect(() => {
    //     counting()
    // }, [])
    return (
        <>
            <div className="w-full lg:w-[40vw] border border-white rounded-xl p-2">
                <h1 className="text-4xl">Most Watched Studios : </h1>

                <div className="flex items-center justify-between px-5 flex-col">
                    {/* {
                        test?.map((element, index) => (
                            <p>{element}</p>
                        ))
                    }
                    <p>eeee</p> */}
                </div>
            </div>
        </>
    )
}
export default FilterByStudio;