"use client"

import React, { useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export function ResetPasswordPage() {
  const router = useRouter()
  const ref : any = useRef(null);
  const [ token , setToken ] = React.useState("")

  const onSubmit = async () => {
    try {
      const password = ref.current.value;
      const response = await axios.post('/api/users/resetpassword', { password , token });
      router.push("/login")
      return response;
      
    } catch (error:any) {
      console.log(error.message);
    }
  };

  React.useEffect(() => {
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
