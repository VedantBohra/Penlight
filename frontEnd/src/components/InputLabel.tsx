import { ChangeEvent } from "react"
import {motion} from "framer-motion"

type InputLabelProps = {
    label : string,
    placeholder : string,
    onChange : (e : ChangeEvent<HTMLInputElement>) => void,
    type? : string,
    className? : string
    motionProps? : any
    onFocus? : () => void;
}

export const InputLabel = ({label , placeholder , className= "",onChange ,type , motionProps , onFocus} : InputLabelProps) => {
    return <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <motion.input {...motionProps} type={type || "text"} onChange={onChange} onFocus={onFocus} className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm 
            rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none ${className}`} placeholder={placeholder} required />
        </div>
}   