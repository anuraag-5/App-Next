"use client";
import React from "react";
import axios from "axios";

export default function emailPage() {
  const ref : any = React.useRef(null);
  const [ submitClicked , setSubmitClicked ] = React.useState(false)
  const onSubmit  = async () => {
    try {
        setSubmitClicked(true)
        const email = ref.current.value;
        const response = await axios.post('/api/users/password', { email });
        return response;
        
      } catch (error:any) {
        console.log(error.message);
      }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-1">
    {submitClicked ? (
        <div className=" text-2xl">Reset password link sent on email</div>
      ) : (
    <>
      <h1 className="text-3xl">Enter your registered email</h1>
      <input type="email" ref={ref} className=" border border-black rounded-full p-2" />
      <button
        onClick={onSubmit}
        className="py-2 px-5 text-center border border-gray-300 rounded-full focus:outline-none bg-blue-500"
      >
        Submit
      </button>
    </>)
    }
    </div>
  );
}