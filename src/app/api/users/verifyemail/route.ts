import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModal";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;
        console.log("Token received:", token);

        // Check for user with valid token and expiry time
        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return NextResponse.json(
                { error: "Invalid or expired token" },
                { status: 400 }
            );
        }

        // Update verification status
        user.isVerified = true;
        user.verifyToken = undefined;  // or set to null
        user.verifyTokenExpiry = undefined;  // or set to null
        await user.save();

        return NextResponse.json(
            { message: "Email successfully verified", success: true },
            { status: 200 }
        );
    } catch (error) {
        console.error("Verification error:", error);
        return NextResponse.json(
            { error: "Server error occurred during verification" },
            { status: 500 }
        );
    }
}
