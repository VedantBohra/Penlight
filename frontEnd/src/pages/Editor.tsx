import TipTap from "../components/TipTap"
import { AppBar } from "../components/AppBar"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Loader } from "../components/Loader"
import { useState} from "react"

export const Editor = () => {
    const navigate = useNavigate()
    const [loader ,setLoader] = useState<Boolean>(false)

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
    const handleEditorContentSave = async (html : string , postTitle : string ,isPublished : Boolean) => {
            try{
                const token = sessionStorage.getItem("token")
                setLoader(true)
                const response = await axios.post(`${BACKEND_URL}/api/v1/blog/create` , 
                    {
                        title : postTitle,
                        content : html,
                        authorId : "91d82719-4780-4c16-ba93-e061273ec125",
                        isPublished : isPublished
                    
                    } ,
                    {
                        headers : {
                            Authorization : `Bearer ${token}`,
                            'Content-Type' : 'application/json'
                        }
                    }
                )
                
                setLoader(false)
                const newPostId = response.data.id
                navigate(`/blog/${newPostId}`)
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


    return <div className="flex flex-col gap-4 bg-purple-50">
        {loader && (
            <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        )}
        <AppBar/>
        <TipTap onEditorContentSave={handleEditorContentSave}/>
        {loader && <Loader/>}
    </div>
}