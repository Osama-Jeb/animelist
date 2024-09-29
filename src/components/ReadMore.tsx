import { useState } from "react";

interface ReadProp {
    text: string
}

const ReadMore = ({ text }: ReadProp) => {
    const [readMore, setReadMore] = useState(true);

    return (
        <>
            {
                text && text.length > 365 ?

                    readMore ?
                        <>
                            {text.slice(0, 365)}...
                            <span
                                onClick={() => setReadMore(!readMore)}
                                className="text-alpha underline cursor-pointer">Read More
                            </span>

                        </> :
                        <>
                            {text}
                            <span
                                onClick={() => setReadMore(!readMore)}
                                className="text-alpha underline cursor-pointer">
                                Read Less
                            </span>
                        </>
                    :
                    text
            }
        </>
    )
}

export default ReadMore;