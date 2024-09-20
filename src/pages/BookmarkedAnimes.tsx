import { useInfo } from "../context/InfoProviders"

const BookmarkedAnime = () => {
    const { user } = useInfo();

    const bookmarkedAnimes = user?.bookmarkedAnime;

    

    return (
        <>
            <p>This page is for the bookmarked/saved animes</p>
            <p>Could also contain stats such as: total episodes watch or episodes to hours ratio</p>
            {
                bookmarkedAnimes?.map((anime: any, index: number) => (
                    <div key={index}>
                        <p>{anime.title}</p>
                    </div>
                ))
            }
        </>
    )
}

export default BookmarkedAnime