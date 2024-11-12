"use client"

import axios from "axios";
import Link from "next/link";
import React , {useState , useEffect} from "react";

export default function VerifyEmailPage(){
    const [ token , setToken ] = useState('')
    const [ verified , setVerified ] = useState(false)
    const [ error , setError ] = useState(false)

    const verifyUserEmail = async () => {
        try {
            const response = await axios.post("/api/users/verifyemail" , {token})
            setVerified(true)
            return response
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
              console.log(error.message);
            } else {
              console.error("Unexpected error:", error);
            }
            setError(true)
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")
    } , [])

    useEffect(() => {
        if(token.length > 0){
            verifyUserEmail()
        }     
    },[token])

    return (
        <div className=" flex flex-col justify-center items-center min-h-screen py-2">
            <h1 className=" text-4xl">Verify email</h1>
            <h2 className=" p-2 text-black bg-orange-500">{
                token ? `${token}` : "no token"
                
                }</h2>

                {
                    verified && (
                        <div>
                            <h2 className=" text-2xl">Email verified</h2>
                            <Link href={"/login"} className=" text-blue-500">
                            Login
                            </Link>
                        </div>
                    )
                }
                {
                    error && (
                        <div>
                            <h2 className=" text-2xl bg-red-500 text-black">Error</h2>
                        </div>
                    )
                }
        </div>
    );
}