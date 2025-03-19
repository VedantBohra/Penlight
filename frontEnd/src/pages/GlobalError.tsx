import {useLocation} from "react-router-dom"

export const GlobalError = () => {
    const location = useLocation()
    
    const errorCode = String(location.state?.errorCode)|| "404"
    const errorInitial = errorCode.split("")
    console.log(errorCode)

    let message = ""

    if(errorInitial[0] === "3"){
        message = "Redirection issue! Please check the URL."
    }
    else if(errorInitial[0] === "4" && errorCode != "404"){
        message = "Client error! Please check your request."
    }
    else if(errorCode === "404"){
        message = "Sorry, we can't find that page. You'll find lots to explore on the home page."
    }
    else if(errorInitial[0] === "5"){
        message = "Server error! Try again later."
    }
    else{
        message = "Unknown error occured."
    }

    return <div>
        <section className="bg-white">
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl
            text-blue-600">{errorCode === "100" ? null : errorCode}</h1>
            {errorCode === "404" ? <p className="mb-4 text-3xl tracking-tight font-bold
            text-gray-900 md:text-4xl">Something's missing.</p> : null}
            <p className="mb-4 text-lg font-light text-gray-500">
                {message}</p>
            <button className="inline-flex text-white bg-blue-600
            hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
            font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4">Back to Homepage</button>
        </div>   
    </div>
</section>
    </div>
}