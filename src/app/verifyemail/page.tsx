"use client"

import axios from "axios";
import Link from "next/link";
import React from "react";

export default function verifyEmailPage(){
    const [ token , setToken ] = React.useState('')
    const [ verified , setVerified ] = React.useState(false)
    const [ error , setError ] = React.useState(false)

    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail" , {token})
            setVerified(true)
        } catch (error:any) {
            setError(true)
            console.log(error.message)
        }
    }

    React.useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")
    } , [])

    React.useEffect(() => {
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