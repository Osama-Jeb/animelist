import { onAuthStateChanged } from "firebase/auth";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react"
import { auth, db } from "../firebase";
import { arrayRemove, arrayUnion, doc, DocumentData, getDoc, updateDoc } from "firebase/firestore";
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
    explicit_genres: any[]; // Empty array in this case
    themes: Genre[];
    demographics: Genre[];
    relations: Relation[];
    theme: Theme;
    external: ExternalLink[];
    streaming: StreamingService[];
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


interface User {
    username: string,
    bookmarkedAnime: string[],
    bookmarkedMovies: string[]
}
interface InfoContextType {
    pagination: Pagination | null,
    fetchAnimes: (page: number, type: string, setAnime: (arg: any) => void) => void;
    user: User | null | DocumentData,
    bookmarkedAnimes: Anime[] | null,
    onBookmarkClick: (animeData: Anime) => void,
    loading: boolean,
}


const InfoContext = createContext<InfoContextType>({
    pagination: null,
    fetchAnimes: () => { },
    user: null,
    bookmarkedAnimes: null,
    onBookmarkClick: () => { },
    loading: false,
});

export default function InfoProvider({ children }: PropsWithChildren) {

    const [pagination, setPagination] = useState<Pagination | null>(null)


    const fetchAnimes = async (page: number, type: string, setAnime: (arg: any) => void) => {
        try {
            // Fetch data from the Jikan API
            const response = await fetch(`https://api.jikan.moe/v4/top/anime?page=${page}&type=${type}`);

            // Check if the response is OK
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Parse the JSON from the response
            const data = await response.json();

            // Update the state with the fetched data
            setAnime(data.data);
            setPagination(data.pagination)
        } catch (error) {
            console.error('err brr:', error);
        }
    };

    const [user, setUser] = useState<User | null | DocumentData>(null)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userId = user.uid;
                const userDoc = await getDoc(doc(db, 'users', userId));
                if (userDoc.exists()) {
                    setUser(userDoc.data());
                }
            } else {
                setUser(null); // User is signed out
            }
        });

        return () => unsubscribe(); // Clean up subscription on unmount
    }, []);

    const { currentUser } = useAuth();
    const [bookmarkedAnimes, setBookmarkedAnimes] = useState<any>()
    const [loading, setLoading] = useState(false);
    const onBookmarkClick = async (animeData: Anime) => {
        const userRef = doc(db, 'users', currentUser.uid);

        setLoading(true);
        try {
            // Fetch the user's current data
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                const userData = userDoc.data();
                const isBookmarked = userData.bookmarkedAnime.some((anime: any) => anime.mal_id === animeData.mal_id);

                // Update the local state immediately based on whether it's bookmarked or not
                const updatedBookmarks = isBookmarked
                    ? userData.bookmarkedAnime.filter((anime: any) => anime.mal_id !== animeData.mal_id)
                    : [...userData.bookmarkedAnime, animeData];

                setBookmarkedAnimes(updatedBookmarks); // Update local state immediately

                if (isBookmarked) {
                    await updateDoc(userRef, {
                        bookmarkedAnime: arrayRemove(animeData)
                    });
                    console.log(`${animeData.mal_id} removed from bookmarks`);
                } else {
                    await updateDoc(userRef, {
                        bookmarkedAnime: arrayUnion(animeData)
                    });
                    console.log(`${animeData.mal_id} added to bookmarks`);
                }
            } else {
                console.error("User not found");
            }
        } catch (error) {
            console.error("Error updating bookmarks: ", error);
        }
        setLoading(false)
    };


    useEffect(() => {
        const fetchBookmarks = async () => {
            const userRef = doc(db, 'users', currentUser.uid);
            try {
                const userDoc = await getDoc(userRef);
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setBookmarkedAnimes(userData.bookmarkedAnime || []);
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
    }, [bookmarkedAnimes, currentUser]);

    return <InfoContext.Provider value={{ pagination, fetchAnimes, user, bookmarkedAnimes, onBookmarkClick, loading }}>
        {children}
    </InfoContext.Provider >
}


export const useInfo = () => useContext(InfoContext);