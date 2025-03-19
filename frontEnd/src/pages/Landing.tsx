import BlogImage from "../Images/Blog.jpg"
import {useNavigate} from "react-router-dom"
import {useState} from "react"
import {Loader} from "../components/Loader"

export const Landing = () => {
    const navigate = useNavigate()
    const [loading , setLoading] = useState(false)

    const handleClickSignup = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            navigate("/signup")
        } , 200)
    }

    const handleClickSignin = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            navigate("/signin")
        } , 200)
    }

    const handleClickKnowMore = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            navigate("/knowMore")
        }, 200)
    }

    return <div className="relative min-h-screen w-full font-roboto pt-7 bg-slate-300">
        {loading && (
            <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        )}
        <nav className="h-20 w-full flex justify-between">
            <div className="flex gap-2 items-center px-20">
            <span>
                <img className="pt-1 cursor-pointer" width="40" height="40" 
                src="https://img.icons8.com/quill/50/light-on.png" alt="light-on"
                onClick={() => {window.location.reload()}}/>
            </span>
                <span className="text-4xl font-semibold">Penlight</span>
            </div>

            <div className="flex gap-10 items-center px-20">
                <span className="text-lg cursor-pointer hover:text-blue-600"
                onClick={handleClickSignin}>Login
                </span>
                <button className="h-10 w-25 rounded-md bg-blue-600 text-white cursor-pointer hover:bg-blue-500
                active:translate-y-1 transition-transform"
                onClick={handleClickSignup}>Sign Up</button>
            </div>
        </nav>

        <div className="w-full h-[30rem] grid grid-cols-[60%_40%]">
            <div>
                <div className="flex flex-col px-20 pt-25 text-4xl font-bold">
                    <span>Welcome to Penlight</span> 
                    <span>- Illuminate Your Thoughts</span>
                </div>

                <div className="flex flex-col px-20 text-gray-600 pt-5">
                    <span>Share your stories, express your ideas, and connect with a community of writers and readers.</span>
                    <span>Whether you're journaling your experiences or crafting the next big article, </span>
                    <span>Penlight gives your words the spotlight they deserve.</span>
                </div>
                <div className="w-full flex px-20 gap-5">
                    <button className="h-15 w-40 bg-blue-600 text-white rounded-md mt-7 
                    cursor-pointer hover:bg-blue-900 active:translate-y-1 transition-transform"
                    onClick={handleClickSignup}>
                        Get Started
                    </button>

                    <button className="h-15 w-40 bg-blue-600 text-white rounded-full
                    mt-7 border border-white shadow-lg hover:bg-white hover:text-blue-600 cursor-pointer
                    active:translate-y-1 transition-transform"
                    onClick={handleClickKnowMore}>
                        Know More
                    </button>
                </div>
            </div>

            <div className="pt-10 px-8">
                <div className="h-full rounded-lg rounded-tl-[75px]  
                flex justify-center items-center overflow-hidden">
                    <img className="w-full h-full object-cover" src={BlogImage} alt="Blog_Image"/>
                </div>
            </div>
        </div>

        <div className="w-full h-[30rem] mt-[6rem] flex flex-col items-center pb-7">
            <div className="h-[12rem] w-[20rem] flex flex-col gap-2 justify-center items-center">
                <span className="text-blue-600 text-xl">What we serve</span>
                <span className="font-semibold text-4xl">Our Best Services</span>
                <div className="flex flex-col text-center">
                    <span className="text-gray-500">Write and post blogs anytime with a</span>
                    <span className="text-gray-500">simple, clean, and organized platform.</span>
                </div>
            </div>

            <div className="w-full min-h-0 flex-1 flex px-20 gap-6">
                <div className="h-5[rem] w-[30rem] flex flex-col justify-center items-center border border-gray-400 rounded-md">
                    <span className="text-3xl font-semibold">Write Blogs</span>
                    <div className="flex flex-col">
                        <span className="text-gray-500">Share your thoughts, ideas, and experiences</span>
                        <span className="text-gray-500 flex justify-center">with the world</span>
                    </div>
                </div>
                <div className="h-5[rem] w-[30rem] flex flex-col justify-center items-center border border-gray-400 rounded-md">
                    <span className="text-3xl font-semibold">Post Anytime</span>
                    <div className="flex flex-col">
                        <span className="text-gray-500">Publish your blogs whenever you want,</span>
                        <span className="text-gray-500 flex justify-center">with no restrictions</span>
                    </div>
                </div>
                <div className="h-5[rem] w-[30rem] flex flex-col justify-center items-center border border-gray-400 rounded-md">
                    <span className="text-3xl font-semibold">Stay Organized</span>
                    <div className="flex flex-col">
                        <span className="text-gray-500">Manage your posts effortlessly in one place</span>
                        <span className="text-gray-500 flex justify-center">with customizing options</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="h-[30rem] w-full bg-blue-600 mt-[5rem] flex flex-col items-center pt-5 px-20">
            <div className="w-full h-[7rem] px-20 border-b border-slate-400 pb-2 flex flex-col items-center">
                <span className="w-[20rem] text-white font-medium text-2xl">Signup to start your blogging journey today!</span>
            </div>

            <div className="min-h-0 w-full flex-1 flex  pt-15 items-stretch pb-15">
                <div className="w-[33%] flex flex-col gap-4 px-10">
                    <h1 className="text-xl text-white">About</h1>
                    <p className="text-gray-300 italic">"Penlight is a simple and intuitive blogging platform where users can write and share their thoughts effortlessly."</p>
                </div>
                <div className="w-[33%] flex flex-col gap-4 px-10">
                    <h1 className="text-xl text-white">Contact</h1>
                    <div className="flex gap-6">
                        <svg data-name="Layer 1" height="30" width="30" stroke="white" strokeWidth={2} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
                            <path d="M123.25 24.192c0-.018 0-.034-.005-.052s-.007-.063-.009-.094a1.734 1.734 
                            0 0 0-.083-.408c-.006-.018 0-.037-.011-.055s-.01-.015-.013-.023a1.734 1.734 
                            0 0 0-.227-.407c-.021-.028-.043-.053-.066-.08a1.755 1.755 
                            0 0 0-.31-.294c-.012-.009-.022-.02-.034-.028a1.744 1.744 
                            0 0 0-.414-.2c-.034-.012-.068-.022-.1-.032a1.733 1.733 
                            0 0 0-.474-.073H6.5a1.733 1.733 0 0 0-.474.073c-.035.01-.068.02-.1.032a1.744 1.744 
                            0 0 0-.414.2c-.012.008-.022.019-.034.028a1.755 1.755 0 0 0-.31.294c-.022.027-.045.052-.066.08a1.734 1.734 
                            0 0 0-.227.407c0 .008-.01.015-.013.023s-.005.037-.011.055a1.734 1.734 
                            0 0 0-.083.408c0 .032-.009.063-.009.094s-.005.034-.005.052v79.615c0 .023.006.045.007.068a1.737 1.737 
                            0 0 0 .019.188c.008.051.015.1.027.152a1.74 1.74 0 0 0 .056.179c.017.047.033.094.054.139a1.729 1.729 
                            0 0 0 .093.172c.024.04.048.081.075.119a1.743 1.743 
                            0 0 0 .125.152c.033.036.066.072.1.106.021.019.037.042.059.061s.036.017.052.03a1.736 1.736 
                            0 0 0 .452.263c.035.014.071.022.107.033a1.732 1.732 0 0 0 .488.085c.012 0 .023.006.035.006H121.501c.012 
                            0 .023-.006.034-.006a1.732 1.732 0 0 0 .489-.085c.035-.011.07-.019.1-.033a1.736 1.736 
                            0 0 0 .453-.263c.016-.013.036-.017.052-.03s.038-.042.059-.061c.036-.034.069-.069.1-.106a1.743 1.743 
                            0 0 0 .125-.152c.027-.038.051-.078.075-.119a1.729 1.729 0 0 0 .093-.172c.021-.045.037-.092.054-.139a1.74 1.74 
                            0 0 0 .056-.179c.012-.05.019-.1.027-.152a1.737 1.737 
                            0 0 0 .019-.188c0-.023.007-.045.007-.068zM45.8 60.316l17.058 14.677a1.751 1.751 
                            0 0 0 2.283 0L82.2 60.316l35.512 41.741H10.289zM8.25 99.052V28.007l34.9 30.026zm76.6-41.019 
                            34.9-30.026v71.045zm31.931-32.091L81.276 56.493c-.006.005-.014.008-.02.014l-.019.02L64 71.358 
                            46.763 56.527l-.019-.02-.02-.014-35.507-30.551z"/>
                        </svg>
                        <a href="mailto:vedantbohra@gmail.com" className="text-gray-300 hover:underline cursor-pointer pt-1">vedantbohra@gmail.com</a>
                    </div>
                </div>
                <div className="w-[33%] flex flex-col gap-2 px-10">
                    <h1 className="text-xl text-white">Socials</h1>
                    <div className="flex gap-6">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 50 50">
                                <path d="M12 23.403V23.39 10.389L11.88 10.3h-.01L9.14 8.28C7.47 7.04 5.09 7.1 3.61 8.56 2.62 9.54 2 
                                10.9 2 12.41v3.602L12 23.403zM38 23.39v.013l10-7.391V12.41c0-1.49-.6-2.85-1.58-3.83-1.46-1.457-3.765-1.628-5.424-.403L38.12 10.3 38 10.389V23.39zM14 
                                24.868l10.406 7.692c.353.261.836.261 1.189 0L36 24.868V11.867L25 20l-11-8.133V24.868zM38 25.889V41c0 .552.448 1 1 
                                1h6.5c1.381 0 2.5-1.119 2.5-2.5V18.497L38 25.889zM12 25.889L2 18.497V39.5C2 40.881 3.119 42 4.5 
                                42H11c.552 0 1-.448 1-1V25.889z"></path>
                            </svg>
                            <a href="mailto:vedantbohra@gmail.com" className="text-gray-300 hover:underline cursor-pointer pt-1">vedantbohra@gmail.com</a>
                    </div>

                    <div className="flex gap-6">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 30 30">
                                <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z
                                M10.954,22h-2.95 v-9.492h2.95V22z 
                                M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 
                                C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 
                                c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 
                                c2.987,0,3.539,1.966,3.539,4.522V22z"></path>
                            </svg>
                            <a href="https://www.linkedin.com/in/vedant-bohra/" target="_blank" rel="noopener" 
                            className="text-gray-300 hover:underline cursor-pointer pt-1">Linkedin Profile</a>
                    </div>

                    <div className="flex gap-6">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 50 50">
                                <path d="M17.791,46.836C18.502,46.53,19,45.823,19,45v-5.4c0-0.197,0.016-0.402,0.041-0.61C19.027,38.994,19.014,38.997,19,39 
                                c0,0-3,0-3.6,0c-1.5,0-2.8-0.6-3.4-1.8c-0.7-1.3-1-3.5-2.8-4.7C8.9,32.3,9.1,32,9.7,32c0.6,0.1,1.9,0.9,2.7,2c0.9,1.1,1.8,2,3.4,2 
                                c2.487,0,3.82-0.125,4.622-0.555C21.356,34.056,22.649,33,24,33v-0.025c-5.668-0.182-9.289-2.066-10.975-4.975 
                                c-3.665,0.042-6.856,0.405-8.677,0.707c-0.058-0.327-0.108-0.656-0.151-0.987c1.797-0.296,4.843-0.647,8.345-0.714 
                                c-0.112-0.276-0.209-0.559-0.291-0.849c-3.511-0.178-6.541-0.039-8.187,0.097c-0.02-0.332-0.047-0.663-0.051-0.999 
                                c1.649-0.135,4.597-0.27,8.018-0.111c-0.079-0.5-0.13-1.011-0.13-1.543c0-1.7,0.6-3.5,1.7-5c-0.5-1.7-1.2-5.3,0.2-6.6 
                                c2.7,0,4.6,1.3,5.5,2.1C21,13.4,22.9,13,25,13s4,0.4,5.6,1.1c0.9-0.8,2.8-2.1,5.5-2.1c1.5,1.4,0.7,5,0.2,6.6c1.1,1.5,1.7,3.2,1.6,5 
                                c0,0.484-0.045,0.951-0.11,1.409c3.499-0.172,6.527-0.034,8.204,0.102c-0.002,0.337-0.033,0.666-0.051,0.999 
                                c-1.671-0.138-4.775-0.28-8.359-0.089c-0.089,0.336-0.197,0.663-0.325,0.98c3.546,0.046,6.665,0.389,8.548,0.689 
                                c-0.043,0.332-0.093,0.661-0.151,0.987c-1.912-0.306-5.171-0.664-8.879-0.682C35.112,30.873,31.557,32.75,26,32.969V33 
                                c2.6,0,5,3.9,5,6.6V45c0,0.823,0.498,1.53,1.209,1.836C41.37,43.804,48,35.164,48,25C48,12.318,37.683,2,25,2S2,12.318,2,25
                                C2,35.164,8.63,43.804,17.791,46.836z"></path>
                            </svg>
                            <a href="https://github.com/VedantBohra" target="_blank" rel="noopener" 
                            className="text-gray-300 hover:underline cursor-pointer pt-1">Github Profile</a>
                    </div>
                </div>
            </div>

            <p className="text-white pb-3">© 2025 Penlight. Built with ❤️ by Vedant Bohra</p>
        </div>
        {loading && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <Loader />
            </div>
        )}
    </div>
}