import { Eye } from "lucide-react";
import { useInfo } from "../context/InfoProviders";
import { Anime } from "../utils/types";

interface ButtonProps {
    anime: Anime,
}

const BookmarkButton = ({ anime }: ButtonProps) => {
    const { onBookmarkClick, bookmarkedAnimes } = useInfo()
    return (
        <>
            <button
                className={`absolute top-[5%] right-[5%] rounded-full p-2 z-10 ${bookmarkedAnimes?.some((anm: any) => anm.mal_id === anime.mal_id) ? "bg-green-500" : "bg-white/90"}`}
                onClick={() => { onBookmarkClick(anime) }}
            >
                {
                    bookmarkedAnimes?.some((anm: any) => anm.mal_id === anime.mal_id) ?
                        <Eye stroke="white" />
                        :

                        <svg xmlns="http://www.w3.org/2000/svg"
                            width={24} height={24}
                            viewBox="0 0 24 24" fill="none" stroke="#ff0000A1"
                            strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                            className="lucide lucide-eye-closed">
                            <path d="m15 18-.722-3.25" />
                            <path d="M2 8a10.645 10.645 0 0 0 20 0" />
                            <path d="m20 15-1.726-2.05" />
                            <path d="m4 15 1.726-2.05" />
                            <path d="m9 18 .722-3.25" />
                        </svg>
                }
            </button>
        </>
    )
}

export default BookmarkButton;