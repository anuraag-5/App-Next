import { NextResponse } from "next/server";

export async function GET(){
    try {
        const response = NextResponse.json({
            message : "Logout success" , 
            success : true
        })
        response.cookies.set("token" , "" , {
            httpOnly : true , 
            expires : new Date(0)
        })

        return response;
    } catch (error:any) {
        return NextResponse.json({
            message : "Error occured"
        },{ status: 500 })
    }
}