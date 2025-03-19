import { AppBar } from "../components/AppBar"
import TipTap from "../components/TipTap"
import {useParams , useNavigate} from "react-router-dom"
import {useState , useEffect} from "react"
import axios from "axios"
import { Loader } from "../components/Loader"

export const UpdateBlog = () => {
    const params = useParams()
    const postId = params.id 
    const navigate = useNavigate()
    const [loader , setLoader] = useState(false)

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL 
    const [postTitle , setPostTitle] = useState<string>("")
    const [content , setContent] = useState<string>("")
    const [published , setPublished] = useState<Boolean>(false)

    useEffect(() => {
        const fetchPost = async() => {
            try{
                const token = sessionStorage.getItem("token")
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/post/${postId}` , 
                    {
                        headers : {
                            Authorization : `${token}`,
                            "Content-Type" : "application/json"
                        }
                    }
                )
                setPostTitle(response.data.post.title)
                setContent(response.data.post.content)
                setPublished(response.data.post.published)
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
            }
        }
        fetchPost()
    },[])

    return <div className="relative flex flex-col gap-4 bg-purple-50">
        {loader && (
            <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        )}
        <AppBar/>
        <TipTap content={content} postTitle={postTitle} postEditPublished={published} setLoading={setLoader}/>
        {loader && <Loader/>}
    </div>
}