import { useNavigate } from "react-router-dom"
import {useState} from "react"
import axios from "axios"
import { Tooltip } from "react-tooltip"

interface BlogCardProps {
    id : string,
    title : string,
    content : string,
    publishedDate : string,
    onClick? : () => void
    onDelete : (id :string) => void
}


export const BlogCard = ({id ,title , content ,publishedDate , onClick , onDelete} : BlogCardProps) => {

    const words = content.split(" ")
    const previewContent = words.slice(0,75).join(" ")
    const navigate = useNavigate()
    const [showDialog , setShowDialog] = useState<Boolean>(false)
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

    const onConfirm = async () => {
        try{
            const token = sessionStorage.getItem("token")
            const response = await axios.delete(`${BACKEND_URL}/api/v1/blog/delete/${id}` , {
                headers : {
                    Authorization : `Bearer ${token}`,
                    "Content-Type" : "application/json"
                }
            })

            if(response.status === 200){
                onDelete(id)
            }
            else{
                console.error("Error in deleting")
            }
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
        finally{
            setShowDialog(false)
        }
    }

    return <div className="flex w-full justify-center">
                <div className="font-roboto min-w-lg max-w-3xl rounded-lg shadow-[0px_4px_10px_rgba(0,0,0,0.1)] px-6  bg-white">
                    <div className="flex items-center pt-3 justify-between">
                        <span className="font-light text-gray-600">{publishedDate}</span>
                        <div className="flex gap-4">
                            <svg data-tooltip-id="edit-tooltip" className="cursor-pointer" onClick={() => navigate(`/update/${id}`)} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30">
                                <path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 
                                C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 
                                23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 
                                26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"></path>                                   
                            </svg>
                            <Tooltip id="edit-tooltip" place="top" content="Click to edit blog"/>

                            <svg data-tooltip-id="delete-tooltip" className="cursor-pointer" onClick={() => setShowDialog(true)} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30">
                                <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5
                                A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 
                                26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
                            </svg>
                            <Tooltip id="delete-tooltip" place="top" content="Click to delete blog"/>
                        </div>
                    </div>

                    <div className="font-extrabold text-2xl pt-1 flex cursor-pointer" onClick={onClick}>
                        {title}
                    </div>

                    <div className="font-serif text-base flex text-justify cursor-pointer" onClick={onClick}>
                        {previewContent + "..."}
                    </div>

                    <div className="border-b border-gray-200 text-xs pt-4 flex">
                        {`${Math.ceil(words.length/100)} ${Math.ceil(words.length/100) === 1 ? "min" : "mins"} read`}
                    </div>

                    {showDialog && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div
      className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"
      onClick={() => setShowDialog(false)}
    ></div>

    <div className="relative z-10 bg-white p-6 rounded shadow-lg">
      <h2 className="text-lg font-bold mb-4">Do you want to delete this blog?</h2>
      <div className="flex justify-end gap-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded cursor-pointer"
          onClick={() => setShowDialog(false)}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer"
          onClick={onConfirm}
        >
          OK
        </button>
      </div>
    </div>
  </div>
)}
        </div>
    </div>
}