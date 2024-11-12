import { getTokenFromData } from "@/helpers/getDataFromToken";
import { NextResponse , NextRequest } from "next/server";
import User from "@/models/userModal";
import connect from "@/dbConfig/dbConfig";

connect()
export async function GET(req : NextRequest){
    try {
        const userId = await getTokenFromData(req)
        const user = await User.findOne({_id : userId}).select("-password")

        return NextResponse.json({
            message : "Success" ,
            data : user
        })


    } catch (error: unknown) {
        if(error instanceof Error){
            return NextResponse.json({error : error.message} , {status : 400})
        }
    }
}