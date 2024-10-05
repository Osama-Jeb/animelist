import { useEffect, useState } from "react";
import { useInfo } from "../context/InfoProviders"
import { Clock, Film, Play } from "lucide-react";
// import ChartSeasons from "../components/ChartSeasons";
import FilterByStudio from "../components/FilterByStudio";
import ChartComponent from "../components/ChartComponent";
import ChartSeasons from "../components/ChartSeasons";
import FilterByYear from "../components/FilterByYear";
import { Anime } from "../utils/types";


const Statistics = () => {

    const [timeFormat, setTimeFormat] = useState('Min');
    const { bookmarkedAnimes } = useInfo();
    const [total, setTotal] = useState(0)
    const [totalMin, setTotalMin] = useState(0);

    const animeTotalEpisodes = () => {
        let tempTot = 0;
        bookmarkedAnimes?.forEach((anime: Anime) => {
            tempTot += anime.episodes
        });

        setTotal(tempTot)
    }

    function convertToMinutes(timeString: string): number {
        const regex = /(\d+)\s*(hr|min)/g;
        let totalMinutes = 0;
        let match: RegExpExecArray | null;

        while ((match = regex.exec(timeString)) !== null) {
            const value = parseInt(match[1]);
            totalMinutes += match[2] === 'hr' ? value * 60 : value;
        }

        return totalMinutes;
    }

    const duration = () => {
        let tempMin = 0;
        bookmarkedAnimes?.forEach((anime: Anime) => {
            tempMin += anime.episodes * convertToMinutes(anime.duration)
        })

        setTotalMin(tempMin);
    }


    const formatTime = (totalDuration: number) => {
        const hours = totalDuration / 60;
        const days = hours / 24;
        switch (timeFormat) {
            case 'Min':
                return totalDuration?.toFixed(0);
            case 'Hours':
                return hours.toFixed(0);
            case 'Days':
                return days.toFixed(0);
        }
    };

    useEffect(() => {
        animeTotalEpisodes()
        duration()
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
            <section className="px-4 pb-4">
                {/* Top Details */}
                <div className="flex flex-wrap gap-4 mt-4">
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
                        <h1 className="text-4xl">{formatTime(totalMin)}</h1>

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

                    <ChartComponent />

                    <ChartSeasons />

                </div>
            </section>
        </>
    )
}

export default Statistics;