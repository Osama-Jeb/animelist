import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Anime, useInfo } from "../context/InfoProviders";

Chart.register(CategoryScale);

const ChartComponent = () => {
    const { user } = useInfo();
    const bookmarkedAnimes = user?.bookmarkedAnimes;

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
            anime.genres.forEach((genre) => {
                genreCount[genre.name] = (genreCount[genre.name] || 0) + 1;
            });
            // genreCount[anime.genres[0].name] = (genreCount[anime.genres[0].name] || 0) + 1;
        });


        const dataEntries = Object.entries(genreCount);
        
        const sortedEntries = dataEntries.sort((a, b) => b[1] - a[1]);

        const labels: string[] = [];
        const data: number[] = [];
        const backgroundColor: string[] = [];

        let otherCount = 0;

        for (const [genre, count] of sortedEntries) {
            if (count <= 2) {
                otherCount += count;
            } else {
                labels.push(genre);
                data.push(count);
                backgroundColor.push(getRandomHexColor());
            }
        }

        if (otherCount > 0) {
            labels.push('Other');
            data.push(otherCount);
            backgroundColor.push(getRandomHexColor());
        }

        setChartData({
            labels,
            datasets: [
                {
                    label: 'Anime Genres',
                    data,
                    backgroundColor,
                },
            ],
        });
    }, [bookmarkedAnimes]);

    return (
        <>
            <Pie
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Anime Genre Chart",
                        },
                    },
                }}
            />
        </>
    );
};

export default ChartComponent;
