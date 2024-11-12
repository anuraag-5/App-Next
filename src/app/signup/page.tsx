"use client";
import Link from "next/link";
import React , { useState , useEffect} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    });
    const [buttonDisable, setButtonDisable] = useState(true);
    const [loading, setLoading] = useState(false);

    // Enable button when all fields have values
    useEffect(() => {
        setButtonDisable(!(user.email && user.password && user.username));
    }, [user]);

    const onSignUp = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("SignUp Success", response.data);
            toast.success("Signup successful!");
            router.push("/login");
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
              console.log(error.message);
            } else {
              console.error("Unexpected error:", error);
            }
          } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-1">
            {loading ? (
                React.createElement('lord-icon', {
                    src: "https://cdn.lordicon.com/jpgpblwn.json",
                    trigger: "loop",
                    style: { width: "50px", height: "50px" }
                })
            ) : (
                <>
                    <h1>Signup</h1>
                    
                    <label htmlFor="username">Username</label>
                    <input
                        className="p-1 text-center border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                        type="text"
                        id="username"
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        placeholder="Enter username"
                    />

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
                        onClick={onSignUp}
                        disabled={buttonDisable || loading}
                        className={`p-2 text-center border border-gray-300 rounded-lg mb-4 focus:outline-none ${
                            buttonDisable || loading ? "bg-gray-300 cursor-not-allowed" : "focus:border-gray-600"
                        }`}
                    >
                        Signup
                    </button>

                    <Link href="/login">Visit Login</Link>
                </>
            )}
        </div>
    );
}
