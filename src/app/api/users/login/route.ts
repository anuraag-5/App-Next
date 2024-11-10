import  connect  from "@/dbConfig/dbConfig"
import User from "@/models/userModal"
import { NextRequest , NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connect()

export async function POST(req : NextRequest){
    try {
        const reqBody = await req.json();
        const { email , password} = reqBody;
        console.log(reqBody)

        const user  = await User.findOne({email})
        if(!user){
            return NextResponse.json({
                error : "User not exists" 
            },{status : 400})
        }

        const validPass = await bcryptjs.compare(password , user.password);
        if(!validPass){
            return NextResponse.json({error:"Invaid Password"}, {status:400})
        }

        //Create token data
        const tokenData = {
            id : user._id ,
            username : user.username ,
            email : user.email
        }
        //Create token
        const token = jwt.sign(tokenData , process.env.TOKEN_SECRET! , {expiresIn : "1d"})

        const response = NextResponse.json({
            message : "Signin Success" ,
            success : true 
        })

        response.cookies.set("token" , token , {
            httpOnly : true,
        })
        
        return response
    } catch (error:any) {
        return NextResponse.json({error : error.message} , {status : 500})
    }
}