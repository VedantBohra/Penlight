import {useState , useEffect} from "react"
import axios from "axios"

export const Quote = () => {
    const [quote , setQuote] = useState("")
    const [author , setAuthor] = useState("")
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

    const fetchQuote = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/v1/user/quote`)
            setQuote(response.data.q)
            setAuthor(response.data.a) 
        }
        catch(err){
            setQuote("The scariest moment is always just before you start.")
            setAuthor("Stephen King")
        }
    }

    useEffect(() => {
        fetchQuote()
        const intervalId = setInterval(fetchQuote,5000)

        return () => clearInterval(intervalId)
    }, [])

    return <div className="bg-slate-200 h-screen flex justify-center flex-col items-center">
      <div className="h-auto max-w-md text-center">
            <p className="text-2xl font-bold Font-roboto italic">“{quote}”</p>
            <p className="pt-1 text-lg font-semibold italic text-gray-700">Author : {author}</p>
        </div>
    </div>
}