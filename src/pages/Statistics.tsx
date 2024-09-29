import { useEffect, useState } from "react";
import { Anime, useInfo } from "../context/InfoProviders"
import { Clock, Film, Play } from "lucide-react";
// import ChartSeasons from "../components/ChartSeasons";
import FilterByStudio from "../components/FilterByStudio";
import ChartComponent from "../components/ChartComponent";
import ChartSeasons from "../components/ChartSeasons";
import FilterByYear from "../components/FilterByYear";


const Statistics = () => {
    // TODO* anime.duration to get episode duration
    const [timeFormat, setTimeFormat] = useState('Min'); 
    const { bookmarkedAnimes } = useInfo();
    
    const [total, setTotal] = useState(0)
    const animeTotalEpisodes = () => {
        let tempTot = 0;
        bookmarkedAnimes?.forEach((anime: Anime) => {
            tempTot += anime.episodes
        });

        setTotal(tempTot)
    }


    const formatTime = () => {
        const minutes = total * 24;
        const hours = minutes / 60;
        const days = hours / 24;
        switch (timeFormat) {
            case 'Min':
                return minutes.toFixed(0);
            case 'Hours':
                return hours.toFixed(0);
            case 'Days':
                return days.toFixed(0);
            default:
                return total.toFixed(0);
        }
    };

    useEffect(() => {
        animeTotalEpisodes()
    }, [bookmarkedAnimes])

    const stats = [
        {
            title: "Total Animes Watched",
            icon: <Film color="#6b7280" size={25} />,
            number: bookmarkedAnimes?.length,
        },
        {
            title: "Total Episodes Watched",
            icon: <Play color="#6b7280" size={25} />,
            number: total,
        },
    ]

    return (
        <>
            <section>
                {/* Top Details */}
                <div className="flex flex-wrap gap-4 mt-4 px-4">
                    {
                        stats.map((stat, index) => (
                            <div key={index} className="flex-1 min-w-[200px] shadow-alpha border border-alpha shadow-md rounded-lg p-4">
                                <div className="flex flex-row items-center justify-between pb-2">
                                    <h3 className="text-2xl">{stat.title}</h3>
                                    {stat.icon}
                                </div>
                                <h1 className="text-4xl">{stat.number}</h1>
                            </div>
                        ))
                    }

                    <div className="flex-1 min-w-[200px] shadow-alpha border border-alpha shadow-md rounded-lg p-4">
                        <div className="flex flex-row items-center justify-between pb-2">
                            <h1 className="text-2xl">Total Watch Time</h1>
                            <Clock color="#6b7280" size={25} />
                        </div>
                        <h1 className="text-4xl">{formatTime()}</h1>

                        <div className="flex items-center justify-around gap-1 w-full mt-2">
                            {
                                ['Min', 'Hours', 'Days'].map((format, index) => (

                                    <button
                                        key={index}
                                        className={`text-black rounded w-full py-1 text-lg ${timeFormat === format ? 'bg-alpha text-white font-bold' : 'bg-white'}`}
                                        onClick={() => setTimeFormat(format)}
                                    >
                                        {format}
                                    </button>
                                ))
                            }
                        </div>
                    </div>


                </div>

                <br />
                <br />
                <br />
                {/* Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FilterByStudio />
                    <FilterByYear />

                    <div className=" border border-alpha p-2 rounded-xl">
                        <h1 className="text-4xl p-4 border-b border-gray-700 mb-3">Most Watched Genres : </h1>
                        <ChartComponent />
                    </div>


                    <div className=" h-fit border border-alpha p-3 rounded-xl">
                        <h1 className="text-4xl p-4 border-b border-gray-700 mb-3 ">Seasonal Anime Info: </h1>
                        <ChartSeasons />
                    </div>

                </div>

                {/* Studios */}
                {/* <div className="flex  justify-around mt-6">




                </div> */}


            </section>
        </>
    )
}

export default Statistics;