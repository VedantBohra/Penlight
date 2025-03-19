import {useState , useEffect} from "react"
import { AppBar } from "../components/AppBar"
import axios from "axios"
import { MainContent } from "../components/MainContent"
import { useNavigate } from "react-router-dom"
import { Skeleton } from "../components/Skeleton"

interface Post{
    id : string,
    title : string,
    content : string,
    published : boolean,
    createdAt : string,
    authorId : string,
    author : {
        name : string
    }
}

export const Home = () => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate()
    const [posts , setPosts] = useState<Post[]>([])
    const [loading , setLoading] = useState(true)
    const [error , setError] = useState<string | null>(null)
   
    useEffect(() => {
        const fetchPosts = async() => {
        try{    
                const token = sessionStorage.getItem("token")
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/home/posts` , {
                    headers : {
                        Authorization : `Bearer ${token}`,
                        "Content-Type" : "application/json"                        
                    }
                })
                const posts = response.data.posts
                setPosts(posts)         
            }    
        catch(error : unknown){
            if(axios.isAxiosError(error)){
                const errorCode = error.response?.status ?? 500
                navigate('/error' , {state : {errorCode}})
            }
            else{
                const errorCode = 100
                navigate('/error' , {state : {errorCode}})
            }
            setError("Failed to load posts please try again later")
        }
        finally{
            setLoading(false)
        }
    }
        fetchPosts()
    },[])

    return <div>
       
            <AppBar/>
            <div className="flex justify-center text-4xl font-serif italic pt-4 pb-2 bg-blue-50">
                <p>Today's Top Reads</p>
            </div>
            <div className="flex flex-col justify-center items-center gap-6 pt-5 bg-blue-50">
            {loading && <Skeleton/>}
            {error && <h1 className="text-red-500">Error</h1>}
            {!loading && !error && posts.length === 0 && <h1>No posts found</h1>}
            {!loading && !error &&  
                    (posts.map((post,index) => (
                        <MainContent
                        key={index}
                        title={post.title} 
                        content={post.content}
                        authorName={post.author.name} 
                        createdAt={post.createdAt}
                        onClick={() => {navigate(`/blog/${post.id}`)}}
                        />
                    ))
                  )
                }
            </div>            
    </div>
}