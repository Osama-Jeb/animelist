import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import {List, Film, Mic, Users } from "lucide-react"
import about from "../assets/images/aboutwebp.webp";

const Root = () => {
    const location = useLocation();
    const isRootPath = location.pathname === '/';

    return (
        <>
            <Navbar />
            {!isRootPath && <div className="px-6"><Outlet /></div>}

            {isRootPath &&
                <>
                    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-cover bg-center hero">
                            <div className="flex flex-col items-center space-y-4 text-center gap-3">
                                <div>
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none mb-4">
                                        Welcome to AnimeWorld
                                    </h1>
                                    <p className="md:text-xl">
                                        Discover, explore, and immerse yourself in the fascinating world of anime
                                    </p>
                                </div>
                                <div className="space-x-4">
                                    <button className="px-8 font-bold py-3 bg-alpha rounded-xl">Explore Now</button>
                                    <button className="px-8 font-bold py-3 bg-white text-black rounded-xl">Learn More</button>
                                </div>
                            </div>
                    </section>

                    {/* About Section */}
                    <section className="w-full py-12 md:py-24 lg:py-32">
                        <div className="container px-4 md:px-6">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">About <span className="text-alpha">AnimeRepo</span></h2>
                            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center px-6">
                                <div className="space-y-4 text-xl">
                                    <p>
                                        AnimeWorld is your ultimate destination for all things anime. We provide a comprehensive platform for anime
                                        enthusiasts to explore, discover, and engage with their favorite series, movies, characters, and creators.
                                    </p>
                                    <p>
                                        Our mission is to create a vibrant community where fans can connect, share their passion, and stay up-to-date
                                        with the latest trends in the anime industry.
                                    </p>
                                </div>
                                <div className="flex justify-center">
                                    <img
                                        alt="Anime Collage"
                                        className="rounded-xl hover:scale-105 transition-all duration-700"
                                        width={600}
                                        src={about}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>



                    <section className="w-full py-12 md:py-24 lg:py-32">
                        <div className="container px-4 md:px-6 mx-auto">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">Explore Our Content</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[
                                    { title: "Anime Lists", icon: List, description: "Browse curated lists of top anime series across various genres." },
                                    { title: "Anime Movies", icon: Film, description: "Discover a wide range of anime films, from classics to recent releases." },
                                    { title: "Singers", icon: Mic, description: "Learn about the talented artists behind your favorite anime songs." },
                                    { title: "Voice Actors", icon: Users, description: "Explore profiles of voice actors who bring anime characters to life." },
                                ].map((item, index) => (
                                    <div key={index} className="rounded-lg shadow-md overflow-hidden border border-gray-800 hover:scale-105 translate-all duration-200">
                                        <div className="p-6">
                                            <div className="flex items-center mb-4">
                                                <item.icon size={24} color="#1d4ed8" className="mr-3"/>
                                                <h3 className="text-2xl font-semibold tracking-wider">{item.title}</h3>
                                            </div>
                                            <p className="text-lg tracking-wide">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>


                </>
            }
        </>
    )
}

export default Root;