import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useEffect, useRef, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Anime, useInfo } from "../context/InfoProviders";

Chart.register(CategoryScale);

const ChartComponent = () => {
    const { bookmarkedAnimes } = useInfo();
    const [chartFilter, setChartFilter] = useState('genre');


    const [chartData, setChartData] = useState<any>({
        labels: [],
        datasets: [
            {
                label: 'Anime Genres',
                data: [],
                backgroundColor: [],
                borderColor: 'black',
                borderWidth: 2,
            },
        ],
    });

    const getRandomHexColor = (): string => {
        const randomColor = Math.floor(Math.random() * 16777215);
        return `#${randomColor.toString(16).padStart(6, '0')}`;
    };

    useEffect(() => {
        const genreCount: Record<string, number> = {};

        bookmarkedAnimes?.forEach((anime: Anime) => {
            // filter by what the user wants
            switch (chartFilter) {
                case 'genre':
                    genreCount[anime.genres[0].name] = (genreCount[anime.genres[0].name] || 0) + 1;
                    break;
                case 'duration':
                    genreCount[anime.duration] = (genreCount[anime.duration] || 0) + 1;
                    break;
                case 'source':
                    genreCount[anime.source] = (genreCount[anime.source] || 0) + 1;
                    break;
                case 'type':
                    genreCount[anime.type] = (genreCount[anime.type] || 0) + 1;
                    break;
                case 'episodes':
                    genreCount[anime.episodes] = (genreCount[anime.studios[0].name] || 0) + 1;
                    break;
            }
        });


        const dataEntries = Object.entries(genreCount);

        const sortedEntries = dataEntries.sort((a, b) => b[1] - a[1]);

        const labels: string[] = [];
        const data: number[] = [];
        const backgroundColor: string[] = [];

        // let otherCount = 0;

        for (const [genre, count] of sortedEntries) {
            // if (count <= 2) {
            //     otherCount += count;
            // } else {
            // }
            labels.push(genre);
            data.push(count);
            backgroundColor.push(getRandomHexColor());
        }

        // if (otherCount > 0) {
        //     labels.push('Other');
        //     data.push(otherCount);
        //     backgroundColor.push(getRandomHexColor());
        // }

        setChartData({
            labels,
            datasets: [
                {
                    label: '',
                    data,
                    backgroundColor,
                },
            ],
        });
    }, [bookmarkedAnimes, chartFilter]);


    const chartRef = useRef<any>(null);

    const handleChartClick = (event: any) => {
        if (chartRef.current) {
            const elements = chartRef.current.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false);
            if (elements.length) {
                const { index } = elements[0];
                const selectedLabel = chartData.labels[index];
                console.log(selectedLabel);
            }
        }
    };
    const filterButtons = ['genre', 'duration', 'source', 'type', 'episodes']
    return (
        <div className=" border border-alpha p-2 rounded-xl h-[105%]">
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Get Statistics by:  </h1>
                <div className="flex items-center gap-2 flex-wrap">
                    {
                        filterButtons.map((btn, index) =>
                            <button
                                key={index}
                                className="px-2 py-1 bg-alpha rounded capitalize"
                                onClick={() => setChartFilter(btn)}
                            >
                                {btn}
                            </button>
                        )
                    }
                </div>
            </div>
            <div className="flex items-center justify-center">
                <Doughnut
                    data={chartData}
                    ref={chartRef}
                    options={{
                        borderColor: "#000000",
                        onClick: handleChartClick,
                        plugins: {
                            legend: {
                                display: true,
                                position: "right",
                            },
                            // title: {
                            //     display: true,
                            //     text: "Anime Genre Chart",
                            // },

                        },
                    }}
                />
            </div>
        </div>
    );
};

export default ChartComponent;
