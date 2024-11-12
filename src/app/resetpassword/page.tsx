"use client"

import React, { useRef , useState , useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export function ResetPasswordPage() {
  const router = useRouter()
  const ref = useRef<HTMLInputElement>(null);
  const [ token , setToken ] = useState("")

  const onSubmit = async () => {
    try {
      const password = ref.current?.value;
      const response = await axios.post('/api/users/resetpassword', { password , token });
      router.push("/login")
      return response;
      
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken)
  } , [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-2">
      <h1 className="text-2xl">Enter new Password</h1>
      <input type="password" ref={ref} className=" border border-black rounded-full p-2" />
      <button
        onClick={onSubmit}
        className="py-2 px-5 text-center border border-gray-300 rounded-full focus:outline-none bg-blue-500"
      >
        Submit
      </button>
    </div>
  );
}

export default ResetPasswordPage;
