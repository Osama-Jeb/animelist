import { Bar } from "react-chartjs-2";
import { Anime, useInfo } from "../context/InfoProviders";
import { useEffect, useState } from "react";

const ChartSeasons = () => {

    // const { user } = useInfo();
    // const bookmarkedAnimes = user?.bookmarkedAnimes || [];
    const { bookmarkedAnimes } = useInfo();


    const [chartData, setChartData] = useState({
        labels: ['Summer', 'Fall', 'Winter', 'Spring'],
        datasets: [
            {
                data: [0, 0, 0, 0], // Initial empty data
                backgroundColor: ['#ff0000', '#ffa500', '#00ff00', '#0000ff'],
                borderColor: 'black',
                borderWidth: 2,
            },
        ],
    });

    const countBySeason = (season: string) => {
        return bookmarkedAnimes?.filter((anime: Anime) => anime.season === season).length || 0;
    };
    useEffect(() => {

        // Update the chart data based on the current bookmarkedAnimes
        setChartData({
            labels: ['Summer', 'Fall', 'Winter', 'Spring'],
            datasets: [
                {
                    data: [
                        countBySeason('summer'),
                        countBySeason('fall'),
                        countBySeason('winter'),
                        countBySeason('spring'),
                    ],
                    backgroundColor: ['#ff0000', '#ffa500', '#0000ff', '#00ff00'],
                    borderColor: 'black',
                    borderWidth: 2,
                },
            ],
        });
    }, [bookmarkedAnimes]);



    return (
        <>
            <div className=" h-fit border border-alpha p-3 rounded-xl">
                <h1 className="text-3xl p-4 border-b border-gray-700 mb-3 ">Seasonal Anime Info </h1>
                <Bar
                    data={chartData}
                    options={{
                        plugins: {
                            title: {
                                display: false,
                                text: "Anime Genre Chart",
                            },
                            legend: {
                                display: false,
                            }
                        },
                    }}
                />
            </div>
        </>
    );

}

export default ChartSeasons;