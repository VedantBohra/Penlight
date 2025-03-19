import { useLocation , useNavigate } from "react-router-dom"
import {useEffect , useState , useRef} from 'react'
import axios from 'axios'
import { Tooltip } from "react-tooltip"

export const AppBar = ()  => {
  
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
    const [dropDown , setDropDown] = useState(false)
    const [name , setName] = useState<string>(() => {
        return localStorage.getItem("userName") || " "
    })
    useEffect(() => {
        const fetchName = async () => {
        try{
            const token = sessionStorage.getItem("token")
            const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk/post` , {
                headers : {
                    Authorization : `Bearer ${token}`,
                    "Content-Type" : "application/json"
                }
            })
            const name = response.data.user.name 
            setName(name)
            localStorage.setItem("userName",name)
            fetchName()
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
    },[name])
    
    const navigate = useNavigate()
    const location = useLocation()
    const dropDownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
            setDropDown(false);
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }, [])

    const nameInitials = name.split(" ")
    const finaNameInitials = nameInitials
    .map(name => name.charAt(0).toUpperCase())
    .slice(0,2)
    .join("")

    const handleLogout = () => {
        sessionStorage.clear()
        navigate("/landing")
        window.location.reload()
    }

    return <div className="relative flex justify-between px-10 items-center font-roboto border-b border-gray-200 bg-blue-100 text-gray-700 shadow-md">
        
        <div className="flex gap-3">
            <span>
                <img className="pt-1 cursor-pointer" width="30" height="30" src="https://img.icons8.com/quill/50/light-on.png" alt="light-on"
                    onClick={() => { 
                        navigate('/landing')
                        window.location.reload()
                    }}
                />
            </span>
            <span className="text-3xl font-medium italic">Penlight</span>
        </div>

        <div className="flex gap-8">    
            {location.pathname !== "/home" && <div data-tooltip-id="home-tooltip" className="flex items-center">
                <svg className="cursor-pointer" onClick={() => navigate('/home')} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 24 24">
                    <path d="M 12 2.0996094 L 1 12 L 4 12 L 4 21 L 10 21 L 10 14 L 14 14 L 14 21 L 20 21 L 20 12 L 23 12 L 12 2.0996094 z"></path> 
                </svg>
                <Tooltip id="home-tooltip" place="bottom" content="Home"/>
            </div>}

            {location.pathname !== "/myblogs" && <div className="flex items-center">
                <span className="text-sm cursor-pointer" data-tooltip-id="showBlog-tooltip" onClick={() => navigate('/myblogs')}>See my Blogs</span>
                <Tooltip id="showBlog-tooltip" content="Check your blogs" place="bottom"/>
            </div>}

            {location.pathname !== "/editor" && <div data-tooltip-id="writeBlog-tooltip" className="flex items-center cursor-pointer" 
                onClick={() => {navigate('/editor')
            }}>
                <img className="h-9" src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-pen-and-paper-geek-culture-flaticons-lineal-color-flat-icons.png"
                alt="external-pen-and-paper-geek-culture-flaticons-lineal-color-flat-icons"/>
                <span className="text-sm text-slate-400">Write</span>
                <Tooltip id="writeBlog-tooltip" place="bottom" content="Create a new blog"/>    
            </div>}

            <div className="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden
                        bg-gray-100 rounded-full text-sm cursor-pointer"
                        onClick={() => {setDropDown(true)}}>
                <span className="font-medium text-gray-600">{finaNameInitials}</span>
            </div>

            {dropDown && (
            <div
            ref={dropDownRef} 
            className="absolute top-full right-0 mt-2 mr-1 w-48 bg-white border rounded-lg shadow-lg p-2 z-50 flex flex-col gap-3">
              <span className="text-2xl font-semibold px-1">{name}</span>

              <span className="text-md font-mediDm px-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                navigate('/home')
                window.location.reload()
              }}>Home</span>
              <span className="text-md font-medium px-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                navigate('/editor')
                window.location.reload()
              }}>Create new blog</span>

            <span className="text-md font-medium px-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                navigate('/myBlogs')
                window.location.reload()
              }}>See my Blogs</span>

              <button
                className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 cursor-pointer"
                onClick={handleLogout}
              >
                Log out
              </button>
            </div>
          )}

        </div>
    </div>
}