import React, { useEffect, useState } from 'react'
import { Star, ChevronDown, Play } from 'lucide-react'
import { Anime, useInfo } from '../context/InfoProviders';
import { useColor } from 'color-thief-react';

export default function TestPage() {





    const { fetchSingle } = useInfo();
    const id = "50594"
    const [animeInfo, setAnimeInfo] = useState<Anime>();
    const [animeImages, setAnimeImages] = useState<any>();
    const [animeChara, setAnimeChara] = useState<any>();

    // Call useColor only when you have the image URL
    const imageUrl = animeInfo && animeInfo?.images?.jpg?.large_image_url;
    const { data: colors } = useColor(imageUrl as string, 'hex', { quality: 2, crossOrigin: 'anonymous' });

    const fetchCharacters = async () => {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/characters`)

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const chars = await response.json();

            setAnimeChara(chars.data);
        } catch (error) {
            console.error('err brr:', error);
        }
    };
    useEffect(() => {
        fetchSingle(id, "anime", setAnimeInfo, setAnimeImages);
        fetchCharacters();
    }, [id]);



    return (
        <div
            style={{
                background: colors
                    ? `linear-gradient(to top, ${colors} 50%, transparent 100%)`
                    : 'transparent',
            }}
        >
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-2/3">
                        <img src={animeInfo?.images.webp.large_image_url} alt="Suzume" className="w-[600px] h-[400px] object-cover rounded-lg" />
                    </div>
                    <div className="md:w-1/3">
                        <h1 className="text-4xl font-bold mb-2">Suzume</h1>
                        <p className="text-sm mb-4">2022 | 13+ | 2h 3m | Language: Japanese</p>
                        <p className="font-semibold mb-2">Directed by: Makoto Shinkai</p>
                        <p className="text-sm mb-4">
                            Suzume, 17, lost her mother as a little girl. On her way to school, she meets a mysterious young man. But her curiosity unleashes a calamity that endangers the entire population of Japan, and so Suzume embarks on a journey to set things right.
                        </p>
                        <div className="flex gap-2 mb-4">
                            <span className="bg-sky-200 text-sky-800 px-3 py-1 rounded-full text-sm">Drama</span>
                            <span className="bg-sky-200 text-sky-800 px-3 py-1 rounded-full text-sm">Adventure</span>
                            <span className="bg-sky-200 text-sky-800 px-3 py-1 rounded-full text-sm">Fantasy</span>
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="bg-yellow-400 text-yellow-900 rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">
                                8.5
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4 flex items-center">
                        GALLERY
                        <ChevronDown className="ml-2 w-6 h-6" />
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[...Array(9)].map((_, i) => (
                            <img key={i} src={`/placeholder.svg?height=150&width=200`} alt={`Gallery image ${i + 1}`} className="w-full h-auto rounded-lg shadow" />
                        ))}
                    </div>
                </div>

                <div className="mt-8">
                    <p className="text-lg italic text-center">
                        "The future's not that scary. You'll meet a lot of people you care for and you'll meet lots of people who'll care for you too. The night might seem endless right now but one day, morning will come."
                    </p>
                </div>

                <div className="mt-8 flex flex-wrap justify-between items-center">
                    <div>
                        <h3 className="font-bold mb-2">Voices of:</h3>
                        <p className="text-sm">Nanoka Hara as Suzume Iwato</p>
                        <p className="text-sm">Hokuto Matsumura as Souta Munakata</p>
                        <p className="text-sm">Eri Fukatsu as Tamaki Iwato</p>
                        {/* Add more voice actors as needed */}
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">Where To Watch:</h3>
                        <div className="flex gap-2">
                            <img src="/placeholder.svg?height=30&width=30" alt="Prime Video" className="w-8 h-8" />
                            <img src="/placeholder.svg?height=30&width=30" alt="Apple TV" className="w-8 h-8" />
                            <img src="/placeholder.svg?height=30&width=30" alt="Crunchyroll" className="w-8 h-8" />
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="font-bold">Original Title:</p>
                    <p className="text-lg">すずめの戸締まり</p>
                    <p>(Suzume no Tojimari)</p>
                </div>

                <div className="mt-8 text-center text-sm text-sky-700">
                    <p>created by dearrev_</p>
                </div>
            </div>
        </div>
    )
}