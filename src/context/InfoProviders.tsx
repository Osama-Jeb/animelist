// import { onAuthStateChanged } from "firebase/auth";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react"
import { db } from "../firebase";
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";

interface ImageUrls {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
}

interface Images {
    jpg: ImageUrls;
    webp: ImageUrls;
}

interface TrailerImages {
    image_url: string;
    small_image_url: string;
    medium_image_url: string;
    large_image_url: string;
    maximum_image_url: string;
}

interface Trailer {
    youtube_id: string;
    url: string;
    embed_url: string;
    images: TrailerImages;
}

interface Title {
    type: string;
    title: string;
}

interface Aired {
    from: string; // ISO 8601 date format
    to: string;   // ISO 8601 date format
    prop: {
        from: DateProp;
        to: DateProp;
    };
    string: string;
}

interface DateProp {
    day: number;
    month: number;
    year: number;
}

interface Producer {
    mal_id: number;
    type: string;
    name: string;
    url: string;
}

interface Genre {
    mal_id: number;
    type: string;
    name: string;
    url: string;
}

interface Theme {
    openings: string[];
    endings: string[];
}

interface ExternalLink {
    name: string;
    url: string;
}

interface StreamingService {
    name: string;
    url: string;
}

interface RelationEntry {
    mal_id: number;
    type: string;
    name: string;
    url: string;
}

interface Relation {
    relation: string;
    entry: RelationEntry[];
}

export interface Anime {
    mal_id: number;
    url: string;
    images: Images;
    trailer: Trailer;
    approved: boolean;
    titles: Title[];
    title: string;
    title_english: string;
    title_japanese: string;
    title_synonyms: string[];
    type: string;
    source: string;
    episodes: number;
    status: string;
    airing: boolean;
    aired: Aired;
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
    producers: Producer[];
    licensors: Producer[];
    studios: Producer[];
    genres: Genre[];
    explicit_genres: any[];
    themes: Genre[];
    demographics: Genre[];
    relations: Relation[];
    theme: Theme;
    external: ExternalLink[];
    streaming: StreamingService[];
}
interface InfoContextType {
    fetchInfo: (what: string, page: number, type: string, setInfo: (arg: any) => void, status: string, order_by: string, sort: string, genres?: number[]) => void,
    fetchSingle: (id: string | undefined, what: string, setSingle: (arg: any) => void, setPic?: (arg: any) => void) => void,
    onSearch: (what: string, term: string, setResult: (arg: any) => void, currentPage: number) => void,
    bookmarkedAnimes: Anime[] | null,
    onBookmarkClick: (animeData: Anime) => void,
    loading: boolean,
    setLoading: (arg: boolean) => void,
    formatName: (name: string) => string,
    validatePassword: (password: string) => boolean,
    checkImageUrl: (url: any, set: (arg: any) => void) => void,
}


const InfoContext = createContext<InfoContextType>({
    fetchInfo: () => { },
    fetchSingle: () => { },
    onSearch: () => { },
    bookmarkedAnimes: null,
    onBookmarkClick: () => { },
    loading: false,
    setLoading: () => { },
    formatName: () => '',
    validatePassword: () => true || false,
    checkImageUrl: () => { },
});

export default function InfoProvider({ children }: PropsWithChildren) {
    const { currentUser } = useAuth();
    const [bookmarkedAnimes, setBookmarkedAnimes] = useState<any>()
    const [loading, setLoading] = useState(false);


    const fetchInfo = async (what: string, page: number, type: string, setInfo: (arg: any) => void, status: string, order_by: string, sort: string, genres?: number[]) => {
        try {
            let response;
            if (genres) {
                response = await fetch(`https://api.jikan.moe/v4/${what}?page=${page}&type=${type}&status=${status}&order_by=${order_by}&sort=${sort}&genres=${genres}`);
            } else {
                response = await fetch(`https://api.jikan.moe/v4/${what}?page=${page}&type=${type}&status=${status}&order_by=${order_by}&sort=${sort}`);
            }

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            if (what == "people") {
                const filteredData = data.data.filter((item: any) => Array.isArray(item.voices) && item.voices.length > 0);
                setInfo(filteredData)
            } else {
                setInfo(data.data);
            }
        } catch (error) {
            console.error('err brr:', error);
        }
    };

    const fetchSingle = async (id: string | undefined, what: string, setSingle: (data: any) => void, setPic?: (data: any) => void) => {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/${what}/${id}/full`)

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setSingle(data.data);

            if (setPic) {
                const res = await fetch(`https://api.jikan.moe/v4/${what}/${id}/pictures`);
                if (!res.ok) {
                    throw new Error('Network response not OKIE DOKIE');
                }
                const imgs = await res.json();
                setPic(imgs.data);
            }
        } catch (error) {
            console.error('err brr:', error);
        }
    }

    const onSearch = async (what: string, term: string, setResult: (arg: any) => void, currentPage: number) => {
        try {
            setLoading(true);
            let res;
            res = await fetch(`https://api.jikan.moe/v4/${what}?q=${term}&page=${currentPage}&order_by=favorites&sort=desc`)
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();
            setResult(data.data);
            setLoading(false);

        } catch (error) {
            console.log("search error", error)
        }
    }

    const onBookmarkClick = async (animeData: Anime) => {
        const userRef = doc(db, 'users', currentUser.uid);

        const ani = {
            mal_id: animeData.mal_id,
            genres: animeData.genres,
            titles: animeData.titles,
            type: animeData.type,
            source: animeData.source,
            episodes: animeData.episodes,
            year: animeData?.aired?.prop.from.year ?? animeData.year,
            season: animeData.season,
            studios: animeData.studios,
            score: animeData.score,
            images: animeData.images,
            duration: animeData.duration,
        };

        try {
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                const userData = userDoc.data();
                const isBookmarked = userData.bookmarkedAnimes.some((anime: any) => anime.mal_id === animeData.mal_id);

                const updatedBookmarks = isBookmarked
                    ? userData.bookmarkedAnimes.filter((anime: any) => anime.mal_id !== animeData.mal_id)
                    : [...userData.bookmarkedAnimes, ani];

                setBookmarkedAnimes(updatedBookmarks);

                if (isBookmarked) {
                    await updateDoc(userRef, {
                        bookmarkedAnimes: arrayRemove(ani)
                    });
                } else {
                    await updateDoc(userRef, {
                        bookmarkedAnimes: arrayUnion(ani)
                    });
                }
            } else {
                console.error("User not found");
            }
        } catch (error) {
            console.error("Error updating bookmarks: ", error);
        }
    };



    useEffect(() => {
        const fetchBookmarks = async () => {
            const userRef = doc(db, 'users', currentUser.uid);
            try {
                const userDoc = await getDoc(userRef);
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setBookmarkedAnimes(userData.bookmarkedAnimes || []);
                } else {
                    console.error("User not found");
                }
            } catch (error) {
                console.error("Error fetching bookmarks: ", error);
            }
        };

        if (currentUser) {
            fetchBookmarks();
        }
    }, [currentUser]);

    const formatName = (name: string) => {
        if (name.includes(",")) {
            const [lastname, firstname] = name.split(', ');
            return `${firstname} ${lastname}`;
        } else {
            return name;
        }
    };


    // Image Validation
    const checkImageUrl = (url: any, set: (arg: any) => void) => {
        const img = new Image();
        img.src = url;

        img.onload = () => {
            set(true);
        };

        img.onerror = () => {
            set(false);
        };
    };

    // Password Validation
    const validatePassword = (password: string) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChars = /[!@#$%^&*]/.test(password);
        return (
            password.length >= minLength &&
            hasUpperCase &&
            hasLowerCase &&
            hasNumbers &&
            hasSpecialChars
        );
    };


    return <InfoContext.Provider
        value={{ fetchInfo, bookmarkedAnimes, onBookmarkClick, loading, setLoading, fetchSingle, formatName, onSearch, validatePassword, checkImageUrl }}>
        {children}
    </InfoContext.Provider >
}


export const useInfo = () => useContext(InfoContext);