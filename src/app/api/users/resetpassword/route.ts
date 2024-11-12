import connect from "@/dbConfig/dbConfig";
import { NextRequest , NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import User from "@/models/userModal";
connect()

export async function POST(request : NextRequest){
    try {
        const reqBody = await request.json()
        const { password , token } = reqBody;
        const newHashedPassword = await bcryptjs.hash(password,10);

        const user = await User.findOne({
            forgetPasswordToken : token ,
            forgetPasswordTokenExpiry : { $gt : Date.now() }
        })

        if(!user){
            return NextResponse.json({
                error : "Token expired" ,
                success : false
            } , { status : 400 })
        }

        user.password = newHashedPassword
        user.forgetPasswordToken = undefined
        user.forgetPasswordTokenExpiry = undefined
        await user.save()

        return NextResponse.json(
            { message: "Password reset success", success: true },
            { status: 200 }
        );

    } catch (error: unknown) {
        if(error instanceof Error){
            return NextResponse.json({error : error.message} , {status : 400})
        }
    }
}