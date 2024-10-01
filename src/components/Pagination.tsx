import { useInfo } from "../context/InfoProviders";

interface PaginationProps {
    currentPage: number,
    setCurrentPage: (arg: any) => void,
    max: number,
}

const Pagination = ({ currentPage, setCurrentPage, max }: PaginationProps) => {
    const { setLoading } = useInfo();

    const handlePageChange = (newPage: number, max: number, setCurrentPage: (arg: any) => void) => {
        setLoading(true)
        if (newPage > 0 && newPage <= max) {
            setCurrentPage(newPage);
        }

        const timeoutId = setTimeout(() => {
            setLoading(false);
        }, 750);

        return () => clearTimeout(timeoutId);
    };

    return (
        <>
            <div className="flex items-center z-20 bg-black justify-center gap-5 font-bold text-xl sticky bottom-0">
                <button
                    onClick={() => handlePageChange(currentPage - 1, max, setCurrentPage)}
                    disabled={currentPage <= 1}
                >
                    Previous
                </button>

                <input type="number" name="pagination" id="pagination"
                    className="text-black w-[50px] px-1 rounded"
                    value={currentPage}
                    onChange={(e) => {
                        if (Math.round(parseInt(e.target.value)) > 0 && Math.round(parseInt(e.target.value)) < max) {
                            setCurrentPage(parseInt(e.target.value))
                        }
                    }}

                />

                <button
                    onClick={() => handlePageChange(currentPage + 1, max, setCurrentPage)}
                    disabled={currentPage >= max}
                >
                    Next
                </button>

            </div>
        </>
    )
}

export default Pagination;