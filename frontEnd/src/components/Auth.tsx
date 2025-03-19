import {Link , useNavigate} from "react-router-dom"
import { InputLabel } from "./InputLabel"
import { SignupInput, SigninInput } from "@penlight/common-app"
import { useState , useEffect } from "react"
import axios from "axios"
import { Tooltip } from "react-tooltip"
import z from "zod"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

type Authtype = "signup" | "signin"

export const Auth = <T extends Authtype>({type , setLoading} : {type : T ; setLoading: (value : boolean) => void}) => {
    const [postInputs , setPostInputs] = useState<
        T extends "signup" ? SignupInput : SigninInput>(
        (type === "signup" ? {email : "" , password : "" , name : ""} :
        {email: "" , password : ""}) as T extends "signup"
        ? SignupInput 
        : SigninInput
    )

    const [emailTaken , setEmailTaken] = useState(false)
    const [shake , setShake] = useState(false)
    const [errMessage , setErrMessage] = useState(false)
    const [errEmailMessage , setErrEmailMessage] = useState(false)

    const [email , setEmail] = useState<string>("")

    const [name , setName] = useState<string>("")
    const [nameStatus , setNameStatus] = useState<"checking" | "taken" | "available" | "">("")

    const [userNotFoundDialog , setUserNotFoundDialog] = useState<Boolean>(false)

    const emailSchema = z.string().email()

    const passwordSchema = z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/\d/, "Must contain at least one digit")
    .regex(/[\W_]/, "Must contain at least one special character");

    const navigate = useNavigate()

    const sendRequest = async () => {
     
        try{
            setLoading(true)
            const validatedPostPassword = passwordSchema.safeParse(postInputs.password)
            const validatedPostEmail = emailSchema.safeParse(postInputs.email)

            let hasError = false

            if(!validatedPostPassword.success){
                setShake(true)
                setErrMessage(true)
                setTimeout(() => {setShake(false)} , 500)
                hasError = true
            }

            if(!validatedPostEmail.success){
                setErrEmailMessage(true)
                hasError = true
            }

            if(nameStatus === "taken"){
                hasError = true
            }

            if (hasError) return

            if(type === "signup"){
                try{
                    const response = await axios.get(`${BACKEND_URL}/api/v1/user/check-email` ,{
                        params : {email}
                    })

                  if(response.data.exists){
                    setEmailTaken(true)
                    return
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
            }

            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}` , postInputs)
            const jwt = response.data.jwt

            if(type === "signin") sessionStorage.setItem("token" , jwt)

            if(response.status === 200){
                setTimeout(() => {
                    setLoading(false)
                    navigate(type === "signup" ? "/signin" : "/home")
                }, 500)
            }
            setLoading(false)
        }
        catch(error : unknown){
            if(axios.isAxiosError(error)){
                const errorCode = error.response?.status ?? 500

                if(errorCode === 404){
                    setLoading(false)
                    setUserNotFoundDialog(true)
                    return
                } else{
                    setTimeout(() => {
                        setLoading(false)
                        navigate('/error' , {state : {errorCode}})
                    })
                }
            }
            else{
                const errorCode = 100
                setTimeout(() => {
                    setLoading(false)
                    navigate('/error' , {state : {errorCode}})
                })
            }
        }
        finally{
            setLoading(false)
        }
    }

    const tooltipId = type === "signup" ? "signup-tooltip" : "signin-tooltip"

    const shakeAnimation = {
        x : [0 , -5, 5, -5, 5, 0] ,
        transition : {duration: 0.3}
    }

    useEffect(() => {
        if(!name){
            setNameStatus("")
            return
        }

        setNameStatus("checking")

        const timer = setTimeout(async () => {
            try{
                const response = await axios.get(`${BACKEND_URL}/api/v1/user/check-username` , {
                    params : {name}
                })

                if(response.data.exists){
                    setNameStatus("taken")
                }
                else{
                    setNameStatus("available")
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
        }, 500)

        return () => clearTimeout(timer)
    } , [name])

    return <div className = "relative h-screen w-[25rem] font-roboto flex flex-col justify-center items-center gap-2">
        <h1 className="text-3xl font-extrabold">{type === "signup" ? "Create new account" : "Login to your account"}</h1>
        <h2 className="text-slate-400 font-light text-md">{type === "signup" ? "Already have an account?" : "Don't have an account?"} 
            <Link data-tooltip-id={tooltipId} to={type === "signup" ? "/signin" : "/signup"} className="underline cursor-pointer pl-2">
                {type === "signup" ? "Login" : "Sign up"}
                <Tooltip id={tooltipId} place="bottom" content={tooltipId === "signup-tooltip" ? "Click to login" : "Click to signup"}/>
            </Link>
        </h2>
        <InputLabel label="Email" placeholder="Enter your email" 
        className={`${errEmailMessage || emailTaken ? "border-red-500" : "border-white"}`}
        motionProps={errEmailMessage || emailTaken ? {animate : shakeAnimation} : {}}  
        onFocus={() =>  {
            setErrEmailMessage(false)
            setUserNotFoundDialog(false)
            setEmailTaken(false)
        }} 
        onChange={(e) =>{
            setPostInputs({
                ... postInputs,
                email : e.target.value
            })
            setEmail(e.target.value)
        }}/>
        {emailTaken && <p className="pt-1 text-red-500 text-sm">Email already in use</p>}
        {errEmailMessage && <p className="pt-1 text-red-500 text-sm">Invalid Email</p>}

        <InputLabel label="Password" type={"password"} placeholder="Enter you password" 
        className={shake ? "border-red-500" : "border-white" } motionProps={shake ? {animate : shakeAnimation} : {}} 
        onFocus={() => {
            setErrMessage(false)
            setUserNotFoundDialog(false)
        }}
        onChange={(e) => {
            setPostInputs({
                ... postInputs,
                password : e.target.value
            })
        }}/>

        {userNotFoundDialog && <p className="pt-2 text-red-500 tex-sm">Email and password does not match</p>}

       {errMessage && <p className="pt-1 text-red-500 text-sm">The password should contain at least one Uppercase , one lowercase and one special character</p>}

        {type === "signup" ? <InputLabel label="Username" className={nameStatus === "taken" ? "border-red-500" : "border-white" } 
        motionProps={nameStatus === "taken" ? {animate : shakeAnimation} : {}} placeholder="Enter a username"
        onChange={(e) => {
            setPostInputs({
                ... postInputs,
                name : e.target.value
            })
            setName(e.target.value)
        }}/> : null}

        {type === "signup" ? nameStatus === "checking" && <p className="text-sm text-gray-500 pt-1">Checking...</p> : null}
        {type === "signup" ? nameStatus === "taken" && <p className="text-sm text-red-500 pt-1">Username already taken</p> : null}
        {type === "signup" ? nameStatus === "available" && <p className="text-sm text-green-500 pt-1">Username is available</p> : null}

        <button onClick={sendRequest} type="button" className="text-white bg-gray-800 hover:bg-gray-900 
            focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full
            text-md px-5 py-2.5 me-2 mb-2 mt-2 h-[3rem] w-[9rem] cursor-pointer">
            {type === "signup" ? "Sign up" : "Sign in"}
        </button>

    </div>
}