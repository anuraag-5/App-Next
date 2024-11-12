import connect from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/nodemailer";
import User from "@/models/userModal";
import { NextRequest, NextResponse } from "next/server";
connect()

export async function POST(req : NextRequest) {
    const reqBody = await req.json();
    const { email } = reqBody;
    
    try {
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({
                message : "User not found"
            } , {
                status : 400
            })
        }
        const response = await sendEmail({
            email , 
            emailType : "RESET" ,
            userId : user._id
        })

        return NextResponse.json({
            message : "User found" ,
            user ,
            response
        } , {
            status : 200
        })
    } catch (error: unknown) {
        if(error instanceof Error){
            return NextResponse.json({error : error.message} , {status : 400})
        }
    }
}