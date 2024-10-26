import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Film, Mic, Users, Book } from "lucide-react"

import anilist from "../assets/images/homepage/animelist1-min.png"
import mangalist from "../assets/images/homepage/animelist2-min.png"
import charalist from "../assets/images/homepage/animelist3-min.png"
import voicelist from "../assets/images/homepage/animelist4-min.png"

import dognut from "../assets/images/homepage/dognut.png";
import studio from "../assets/images/homepage/studio.png";
import time from "../assets/images/homepage/time.png";
import tot from "../assets/images/homepage/tot.png";
import year from "../assets/images/homepage/year.png";
import { useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const Root = () => {
    const location = useLocation();
    const isRootPath = location.pathname === '/';

    useEffect(() => {
        window.scrollTo(0, 0);

        if (location.pathname === '/') {
            const trackVisitor = async () => {
                const visitorDoc = doc(db, 'visitors', 'count');

                const docSnap = await getDoc(visitorDoc);

                if (docSnap.exists()) {
                    // If the document exists, increment the count
                    const newCount = docSnap.data().count + 1;
                    await setDoc(visitorDoc, { count: newCount });
                } else {
                    // If the document doesn't exist, create it with a count of 1
                    await setDoc(visitorDoc, { count: 1 });
                }
            };

            trackVisitor();
        }
    }, [location])

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

                            </div>
                        </div>
                    </section>

                    {/* About Section */}
                    <section className="container text-center mx-auto flex items-center justify-center py-12 md:py-24 lg:py-32 text-xl">
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



                    {/* Information Section */}
                    <section className="w-full py-12 md:py-24 lg:py-32">
                        <div className="container px-4 md:px-6 mx-auto">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12"><span className="text-alpha">Explore</span> Our Content</h2>
                            {
                                [
                                    {
                                        title: "Anime", icon: Film, link: '/anime', image: anilist,
                                        description: "Browse curated lists of top anime series across various genres."
                                    },
                                    {
                                        title: "Manga", icon: Book, link: '/manga', image: mangalist,
                                        description: "Discover a wide range of Manga, from classics to recent releases."
                                    },
                                    {
                                        title: "Characters", icon: Users, link: '/characters', image: charalist,
                                        description: "Learn about the characters and get more detailed information about them."
                                    },
                                    {
                                        title: "Voice Actors", icon: Mic, link: '/va', image: voicelist,
                                        description: "Explore profiles of voice actors who bring anime characters to life."
                                    },
                                ].map((el, ind) => (
                                    <div className={`my-12 flex gap-5 ${ind % 2 == 0 ? 'flex-col-reverse lg:flex-row' : 'flex-col-reverse lg:flex-row-reverse'}`}>
                                        <Link to={el.link} className="w-full lg:w-[50%]">
                                            <img src={el.image} className="h-[500px] object-cover graysale-[80%]" alt="" />
                                        </Link>
                                        <Link to={el.link} className="rounded-lg h-fit w-fit bg-black border border-alpha/50 sticky top-0">
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


                    {/* Statistics Section */}
                    <section className="p-12 md:p-24 lg:p-32 w-full">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
                            Read Amazing <span className="text-alpha/90">Statistics</span></h2>
                        <p className="text-lg text-center">
                            <NavLink to={"/register"} className="text-alpha text-xl font-semibold underline hover:scale-115 duration-200 transition-all">
                                Create an Account
                            </NavLink> to Unlock Your Anime Journey!
                            <br /> <br />
                            Sign up today to start tracking your anime adventures! By creating an account, you'll be able to bookmark every anime you watch, creating a personalized library that's all yours.
                            <br /> <br />
                            But that's not all—our system will give you detailed insights into your anime habits. See how many anime you've watched, track your total watch time, and discover which genres and types you love the most.
                            <br /> <br />
                            Stay organized, dive deeper into your anime world, and let us help you discover new favorites based on your watching patterns!
                        </p>

                        <div className="flex items-center flex-wrap justify-around mt-6">
                            {
                                [tot, time, year, studio, dognut].map((stat, index) => (
                                    <img
                                        key={index}
                                        src={stat}
                                        className={`w-[350px] m-2 object-cover transition-all duration-500 hover:scale-110 ${[tot, year, time].includes(stat) ? 'hidden lg:block' : ''}`}
                                        alt={stat}
                                    />
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