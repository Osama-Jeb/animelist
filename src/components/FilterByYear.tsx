import { useEffect, useState } from "react";
import { useInfo } from "../context/InfoProviders";

const FilterByYear = () => {
    const { bookmarkedAnimes } = useInfo();
    const [filtered, setFiltered] = useState<any>()

    useEffect(() => {
        // Count animes by year ranges
        const countAnimesByYearRange = () => {
            const counts = {
                '2020-2024': 0,
                '2015-2019': 0,
                '2010-2014': 0,
                'Before 2010': 0,
            };

            bookmarkedAnimes?.forEach(anime => {
                const year = anime.year;
                if (year >= 2020 && year <= 2024) {
                    counts['2020-2024']++;
                } else if (year >= 2015 && year <= 2019) {
                    counts['2015-2019']++;
                } else if (year >= 2010 && year <= 2014) {
                    counts['2010-2014']++;
                } else if (year < 2010) {
                    counts['Before 2010']++;
                }
            });

            setFiltered(counts)
        };


        countAnimesByYearRange()
    }, [bookmarkedAnimes])
    return (
        <>
            <div className="w-full lg:w-[40vw] border border-alpha rounded-xl py-2 px-5">
                <h1 className="text-3xl my-3">Anime By Year: </h1>
                <div className="flex items-center justify-center">
                    <div className="w-[50%]">

                        {Object.entries(filtered || []).map(([range, count]) => (
                            <div key={range} className="flex items-center justify-between text-lg my-2">
                                <p className="text-xl">{range}</p>
                                <p className="bg-alpha/60 px-2 py-1 rounded-full text-sm">{count as number}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default FilterByYear;