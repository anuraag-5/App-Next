import  connect  from "@/dbConfig/dbConfig"
import User from "@/models/userModal"
import { NextRequest , NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/helpers/nodemailer"

connect()

export async function POST(req : NextRequest) {
    try {
        const reqBody = await req.json();
        const { username , email , password} = reqBody;
        console.log(reqBody)

        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        //Hash Password
        const hashedPass = await bcryptjs.hash(password, 10);
        const newUser = new User({
            username ,
            email ,
            password : hashedPass
        })

        const savedUser = await newUser.save();
        try {
            await sendEmail({
                email,
                emailType: "VERIFY",
                userId: savedUser._id
            });
        } catch (emailError) {
            console.error("Error sending email:", emailError);
            return NextResponse.json({
                error: "User created, but verification email failed"
            }, { status: 500 });
        } finally{
            return NextResponse.json({
                message: "User created successfully",
                success: true,
                user: savedUser,
            }, { status: 201 });
        }

    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json({
            error: "An error occurred during signup"
        }, { status: 500 });
    }
    
}