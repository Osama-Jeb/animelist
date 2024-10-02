import { useEffect, useState } from "react";
import { useInfo } from "../context/InfoProviders";

interface Anime {
    year: number;
}

const FilterByYear = () => {
    const { bookmarkedAnimes } = useInfo();
    const [filtered, setFiltered] = useState<Record<string, number>>({
        '2020-2024': 0,
        '2015-2019': 0,
        '2010-2014': 0,
        'Before 2010': 0,
    });

    useEffect(() => {
        const counts = { '2020-2024': 0, '2015-2019': 0, '2010-2014': 0, 'Before 2010': 0 };

        bookmarkedAnimes?.forEach((anime: Anime) => {
            const year = anime.year;
            if (year >= 2020) counts['2020-2024']++;
            else if (year >= 2015) counts['2015-2019']++;
            else if (year >= 2010) counts['2010-2014']++;
            else counts['Before 2010']++;
        });

        setFiltered(counts);
    }, [bookmarkedAnimes]);

    return (
        <div className="border border-alpha rounded-xl py-2 px-5">
            <div className="p-4 border-b border-gray-700">
                <h2 className="text-xl font-semibold">Anime By Year</h2>
            </div>
            <div className="p-4 space-y-4">
                {Object.entries(filtered).map(([range, count]) => (
                    <div key={range} className="flex items-center">
                        <div className="w-36">{range}</div>
                        <div className="flex-1 bg-gray-700 h-4 rounded-full overflow-hidden">
                            {/* <div
                                className="bg-green-500 h-full rounded-full"
                                style={{ width: `${count * 10}%` }}
                            ></div> */}

                            <div
                                className={`bg-green-500 h-full rounded-full transition-all duration-700 ease-in-out`}
                                style={{ width: `${bookmarkedAnimes && (count / bookmarkedAnimes.length) * 150}%` }}
                            ></div>
                        </div>
                        <div className="w-8 text-right">{count}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilterByYear;
