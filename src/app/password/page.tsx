"use client";
import React, { useRef, useState } from "react";
import axios from "axios";

export default function EmailPage() { // Capitalized component name
  const ref = useRef<HTMLInputElement>(null);
  const [submitClicked, setSubmitClicked] = useState(false);

  const onSubmit = async () => {
    try {
      setSubmitClicked(true);
      const email = ref.current?.value;
      const response = await axios.post('/api/users/password', { email });
      return response;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-1">
      {submitClicked ? (
        <div className="text-2xl">Reset password link sent on email</div>
      ) : (
        <>
          <h1 className="text-3xl">Enter your registered email</h1>
          <input type="email" ref={ref} className="border border-black rounded-full p-2" />
          <button
            onClick={onSubmit}
            className="py-2 px-5 text-center border border-gray-300 rounded-full focus:outline-none bg-blue-500"
          >
            Submit
          </button>
        </>
      )}
    </div>
  );
}
