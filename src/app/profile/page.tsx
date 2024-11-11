"use client"
import { useRouter } from "next/navigation"
import axios from "axios"
import React from "react"
import Link from "next/link"

export default function ProfilePage(){
    const router = useRouter()
    const [ loading , setLoading ] = React.useState(false)
    const [ data , setData] = React.useState("Nothing")

    const logout = async () => {
        try {
            setLoading(true)
            await axios.get("/api/users/logout")
            console.log("Logout Successfull")
            router.push("/login")
        } catch (error:any) {
            console.log(error.message)
        } finally{
            setLoading(false)
        }
    }
    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me")
        console.log(res.data)

        setData(res.data.data._id)
    }
    return (
        <div className=" flex flex-col justify-center items-center min-h-screen py-2">
            {
                loading ? (
                    React.createElement("lord-icon" ,
                        {
                            src: "https://cdn.lordicon.com/jpgpblwn.json",
                            trigger: "loop",
                            style: { width: "50px", height: "50px" }
                        }
                )
                ) : (
                    <>
                     <h1> Profile </h1>
                     <hr />
                     <p>Profile Page</p>
                     <h2>
                        {data === "Nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}
                     </h2>
                     <button onClick={logout} 
                     className=" bg-blue-500 mt-2 p-2 rounded-full hover:bg-blue-700 text-white font-bold">Logout
                     </button>
                     <button onClick={getUserDetails} 
                     className=" bg-blue-500 mt-2 p-2 rounded-full hover:bg-blue-700 text-white font-bold">Get User
                     </button>
                    </>
                )
            }
        </div>
    )
}