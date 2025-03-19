import { Quote } from "../components/Quote"
import {Auth} from "../components/Auth"
import { useState } from "react"
import {Loader} from "../components/Loader"

export const Signin = () => {

    const [loader , setLoader] = useState(false)
    return(
            <div className="relative grid grid-cols-[100%] lg:grid-cols-[60%_40%]">
                {loader && (
                    <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
                )}
                <div className="flex justify-center items-center bg-purple-100">
                    <Auth type="signin" setLoading={setLoader}/>
                </div>

                <div className="hidden lg:block">
                    <Quote/>
                </div>

                {loader && <Loader/>}
            
            </div>
    )
}