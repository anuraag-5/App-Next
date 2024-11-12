"use client";
import Link from "next/link"; // its a anchor tag in next.
import React from "react";
import { useRouter } from "next/navigation"; // to navigate to different pages. 
// ex:- after signup to navigate to home page.
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage(){
    const router = useRouter()
    const [user , setUser] = React.useState({
        email : "" ,
        password : "",
    })

    const [ buttonDisable , setButtonDisable ] = React.useState(true)
    const [ loading , setLoading] = React.useState(false)

    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login",user)
            console.log("SignUp Success", response.data);
            toast.success("Signup successful!");
            router.push("/profile");

        } catch (error: any) {
            console.log(error.message)
        }
        finally {
            setLoading(false)
        }
    }

    const onForgetPass = () => {
        router.push("/password")
    }
    React.useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0)
            setButtonDisable(false)
        else
            setButtonDisable(true)
    },[user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-1">
            {loading ? (
                React.createElement('lord-icon', {
                    src: "https://cdn.lordicon.com/jpgpblwn.json",
                    trigger: "loop",
                    style: { width: "50px", height: "50px" }
                })
            ):(
                <>
                    <h1>Login</h1>
    
                    <label htmlFor="email">Email</label>
                    <input
                        className="p-1 text-center border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                        type="email"
                        id="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        placeholder="Enter email"
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        className="p-1 text-center border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                        type="password"
                        id="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        placeholder="Enter password"
                    />

                    <button
                        onClick={onLogin}
                        disabled = {buttonDisable || loading}
                        className = {`py-2 px-5 text-center border border-gray-300 rounded-full mb-4 focus:outline-none bg-blue-500 ${
                            buttonDisable || loading ? "bg-gray-300 cursor-not-allowed" : "focus:border-gray-600"
                        }`}
                    >
                        Login
                    </button>
                    <button
                        onClick={onForgetPass}
                        className = {`py-2 px-5 text-center border border-gray-300 rounded-full mb-4 focus:outline-none bg-blue-500`}
                    >
                        Forget Password?
                    </button>
                    <Link href="/signup">Visit SignUp</Link>
                </>
            )}
        </div>
    );
}