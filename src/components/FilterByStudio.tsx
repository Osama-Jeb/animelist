// import { useInfo } from "../context/InfoProviders";

const FilterByStudio = () => {
    // const {bookmarkedAnimes} = useInfo();
    
    return (
        <>
            <div className="w-full lg:w-[40vw] border border-white rounded-xl p-1">
                <h1 className="text-4xl">Most Watched Studios: </h1>
                <div className="flex items-center justify-between px-5">
                    <p>Studio Name</p>

                    <p>5</p>
                </div>
            </div>
        </>
    )
}
export default FilterByStudio;