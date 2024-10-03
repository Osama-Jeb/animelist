import { Link, Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Film, Mic, Users, Book } from "lucide-react"
import about from "../assets/images/aboutwebp.webp";

const Root = () => {
    const location = useLocation();
    const isRootPath = location.pathname === '/';

    return (
        <>
            <Navbar />
            {!isRootPath && <div className="px-6"><Outlet /> </div>}

            {isRootPath &&
                <>
                    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 hero">
                        <div className="flex flex-col items-center space-y-4 text-center gap-3">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none mb-4">
                                    Welcome to the <span className="text-alpha">Anime Repo</span>
                                </h1>
                                <p className="md:text-xl text-2xl">
                                    Discover, explore and find any information about anything related to anime.
                                </p>
                            </div>
                            <div className="space-x-4">
                                <Link to={`/anime`}>
                                    <button className="px-8 font-bold py-3 bg-alpha rounded-lg hover:scale-105 duration-150 transition-all">Explore Now</button>
                                </Link>
                                {/* <button className="px-8 font-bold py-3 bg-white text-black rounded-xl">Learn More</button> */}
                            </div>
                        </div>
                    </section>

                    {/* About Section */}
                    <section className="container text-center  flex items-center justify-center py-12 md:py-24 lg:py-32 text-xl">
                        <div className="w-[80%]">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">About <span className="text-alpha">Anime Repo</span></h2>
                            <p>
                                Anime Repo is your ultimate destination for all things anime. We provide a comprehensive platform to explore, discover and engage with your favorite series, manga, characters and voice actors.
                            </p>
                            <br />
                            <p>
                                Our mission is to give you an easy-to-access platform where you can find all the information about your favorite media and keep track of them. Including some amazing statistics.
                            </p>
                        </div>

                    </section>



                    <section className="w-full py-12 md:py-24 lg:py-32">
                        <div className="container px-4 md:px-6 mx-auto">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12"><span className="text-alpha">Explore</span> Our Content</h2>
                            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[
                                    {
                                        title: "Anime", icon: Film, link: '/anime',
                                        description: "Browse curated lists of top anime series across various genres."
                                    },
                                    {
                                        title: "Manga", icon: Book, link: '/manga',
                                        description: "Discover a wide range of Manga, from classics to recent releases."
                                    },
                                    {
                                        title: "Characters", icon: Users, link: '/characters',
                                        description: "Learn about the characters and get more detailed information about them."
                                    },
                                    {
                                        title: "Voice Actors", icon: Mic, link: '/va',
                                        description: "Explore profiles of voice actors who bring anime characters to life."
                                    },
                                ].map((item, index) => (
                                    <Link to={item.link} key={index} className="rounded-lg border border-alpha/50  hover:scale-105 transition-all duration-200">
                                        <div className="p-6">
                                            <div className="flex items-center mb-4">
                                                <item.icon size={24} color="#1d4ed8" className="mr-3" />
                                                <h3 className="text-2xl font-semibold tracking-wider">{item.title}</h3>
                                            </div>
                                            <p className="text-lg tracking-wide">{item.description}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div> */}

                            {
                                [
                                    {
                                        title: "Anime", icon: Film, link: '/anime',
                                        description: "Browse curated lists of top anime series across various genres."
                                    },
                                    {
                                        title: "Manga", icon: Book, link: '/manga',
                                        description: "Discover a wide range of Manga, from classics to recent releases."
                                    },
                                    {
                                        title: "Characters", icon: Users, link: '/characters',
                                        description: "Learn about the characters and get more detailed information about them."
                                    },
                                    {
                                        title: "Voice Actors", icon: Mic, link: '/va',
                                        description: "Explore profiles of voice actors who bring anime characters to life."
                                    },
                                ].map((el, ind) => (
                                    <div className={`my-12 flex justify-between gap-5 ${ind % 2 == 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                                        <img src={about} className="rounded-lg grayscale-[50%]" alt="" />
                                        <Link to={el.link} className="rounded-lg h-fit w-fit border border-alpha/50 sticky top-0">
                                            <div className="p-6">
                                                <div className="flex items-center mb-4">
                                                    <el.icon size={24} color="#1d4ed8" className="mr-3" />
                                                    <h3 className="text-2xl font-semibold tracking-wider">{el.title}</h3>
                                                </div>
                                                <p className="text-lg tracking-wide">{el.description}</p>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            }

                        </div>
                    </section>



                </>
            }
        </>
    )
}

export default Root;