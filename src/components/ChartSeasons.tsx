import { Bar } from "react-chartjs-2";
import { useInfo } from "../context/InfoProviders";
import { useEffect, useState } from "react";

const ChartSeasons = () => {

    // const { user } = useInfo();
    // const bookmarkedAnimes = user?.bookmarkedAnimes || [];
    const {bookmarkedAnimes} = useInfo();

    
    const [chartData, setChartData] = useState({
        labels: ['Summer', 'Fall', 'Winter', 'Spring'],
        datasets: [
            {
                label: 'Anime Genres',
                data: [0, 0, 0, 0], // Initial empty data
                backgroundColor: ['#ff0000', '#ffa500', '#00ff00', '#0000ff'],
                borderColor: 'black',
                borderWidth: 2,
            },
        ],
    });

    const countBySeason = (season: string) => {
        return bookmarkedAnimes?.filter((anime: any) => anime.season === season).length || 0;
    };
    useEffect(() => {

        // Update the chart data based on the current bookmarkedAnimes
        setChartData({
            labels: ['Summer', 'Fall', 'Winter', 'Spring'],
            datasets: [
                {
                    label: 'Anime Genres',
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
            <Bar
                data={chartData}
                // options={{
                //     plugins: {
                //         title: {
                //             display: true,
                //             text: "Anime Genre Chart",
                //         },
                //     },
                // }}
            />
        </>
    );

}

export default ChartSeasons;