import { BlogCard } from "../components/BlogCard"
import { AppBar } from "../components/AppBar"
import {useState , useEffect} from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Skeleton } from "../components/Skeleton"

export const Blogs = () => {

    interface Posts {
        title : string,
        content : string,
        createdAt : string,
        author : {
            name : string
        },
        id : string,
        published : Boolean
    }

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

    const [posts , setPosts] = useState<Posts[]>([])
    const [loading , setLoading] = useState(true)
    const navigate = useNavigate()

    const [noPostFound , setNoPostFound] = useState(false)

    useEffect(() => {
        const fetchDetails = async () => {
            try{
                const token = sessionStorage.getItem("token")
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk/post` , {
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                })
                
                setPosts(response.data.posts)
            }
            catch(error : unknown){
                if(axios.isAxiosError(error)){
                    const errorCode = error.response?.status ?? 500

                    if(errorCode === 404 && error.response?.data.errorMsg === "NO_POST_FOUND"){
                        setNoPostFound(true)
                    }
                    else{
                        navigate('/error' , {state : {errorCode}})
                    }
                }
                else{
                    const errorCode = 100
                    navigate('/error' , {state : {errorCode}})
                }
            }
            finally{
                setLoading(false)
            }
        }
        fetchDetails()
    },[])

    const handleDelete = (id : string) => {
        setPosts((prevPost) => prevPost.filter((post) => post.id !== id))
    }

    return(
       <div className="flex flex-col">
            <AppBar/>
            <div className="flex flex-col items-center gap-6 pt-5 bg-purple-50 h-screen">
            {loading && <Skeleton/>}
            {!loading && posts.length === 0 && noPostFound && 
            <div className="flex-1 w-full flex justify-center mt-60">
                <svg className="pb-3 text-gray-800 dark:text-white cursor-pointer active:translate-y-1 transition-transform" 
                onClick={() => {
                    navigate("/editor")
                    window.location.reload()
                }}
                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
                </svg>
                <span className="text-3xl font-medium">Create a New Blog</span>
            </div>}
            {!loading && posts.map((post , index) => {
                    console.log(post)
                    const dateAndTime = post.createdAt.split("T")
                    const reversedDate = dateAndTime[0] 
                    const publishedDate = reversedDate.split("-").reverse().join("-")
                    return  <BlogCard key={index} id={post.id} title={post.title} 
                            content={post.content} publishedDate={post.published ?`Published on : ${publishedDate}` : `Saved on : ${publishedDate}`}
                            onClick={() => navigate(`/blog/${post.id}`)} onDelete={handleDelete}/>
                }
            )}
            </div>
       </div>
    )
}