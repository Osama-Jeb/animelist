import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react"

interface AnimeImage {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
}

interface AnimeImages {
    jpg: AnimeImage;
    webp: AnimeImage;
}

interface AnimeTrailerImages {
    image_url: string;
    small_image_url: string;
    medium_image_url: string;
    large_image_url: string;
    maximum_image_url: string;
}

interface AnimeTrailer {
    youtube_id: string;
    url: string;
    embed_url: string;
    images: AnimeTrailerImages;
}

interface AnimeTitle {
    type: string;
    title: string;
}

interface AnimeAiredProp {
    from: {
        day: number;
        month: number;
        year: number;
    };
    to: {
        day: number;
        month: number;
        year: number;
    };
}

interface AnimeAired {
    from: string;
    to: string;
    prop: AnimeAiredProp;
    string: string;
}

interface AnimeProducer {
    mal_id: number;
    type: string;
    name: string;
    url: string;
}

interface AnimeGenre {
    mal_id: number;
    type: string;
    name: string;
    url: string;
}

interface AnimeTheme {
    mal_id: number;
    type: string;
    name: string;
    url: string;
}

interface Anime {
    mal_id: number;
    url: string;
    images: AnimeImages;
    trailer: AnimeTrailer;
    approved: boolean;
    titles: AnimeTitle[];
    title: string;
    title_english: string;
    title_japanese: string;
    title_synonyms: string[];
    type: string;
    source: string;
    episodes: number;
    status: string;
    airing: boolean;
    aired: AnimeAired;
    duration: string;
    rating: string;
    score: number;
    scored_by: number;
    rank: number;
    popularity: number;
    members: number;
    favorites: number;
    synopsis: string;
    background: string;
    season: string;
    year: number;
    broadcast: {
        day: string;
        time: string;
        timezone: string;
        string: string;
    };
    producers: AnimeProducer[];
    licensors: AnimeProducer[];
    studios: AnimeProducer[];
    genres: AnimeGenre[];
    explicit_genres: any[];
    themes: AnimeTheme[];
    demographics: any[];
}

interface Pagination {
    last_visible_page: number,
    has_next_page: boolean,
    current_page: number,
    items: {
        count: number,
        total: number,
        per_page: number
    }

}

interface InfoContextType {
    allAnimes: Anime[] | null;
    pagination: Pagination | null,
    currentPage: number,
    handlePageChange: (newPage: number) => void;
}


const InfoContext = createContext<InfoContextType>({
    allAnimes: null,
    pagination: null,
    currentPage: 1,
    handlePageChange: () => { },
});

export default function InfoProvider({ children }: PropsWithChildren) {

    const [allAnimes, setAllAnimes] = useState<Anime[] | null>(null);
    const [pagination, setPagination] = useState<Pagination | null>(null)
    const [currentPage, setCurrentPage] = useState<number>(1);


    useEffect(() => {
        const fetchAnimes = async (page: number) => {
            try {
                // Fetch data from the Jikan API
                const response = await fetch(`https://api.jikan.moe/v4/anime?page=${page}&type=TV`);

                // Check if the response is OK
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                // Parse the JSON from the response
                const data = await response.json();

                // Update the state with the fetched data
                setAllAnimes(data.data); 
                setPagination(data.pagination)
            } catch (error) {
                console.error('err brr:', error);
            }
        };

        fetchAnimes(currentPage);

    }, [currentPage])

    // Handle page change
    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && (!pagination || newPage <= pagination.last_visible_page)) {
            setCurrentPage(newPage);
        }
    };

    return <InfoContext.Provider value={{ allAnimes, pagination, currentPage, handlePageChange }}>
        {children}
    </InfoContext.Provider >
}


export const useInfo = () => useContext(InfoContext);