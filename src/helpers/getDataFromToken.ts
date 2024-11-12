import { NextRequest } from "next/server";
import  jwt , { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
    id: string;
}
export const  getTokenFromData  = (req : NextRequest) => {
    try {
        const encodedToken = req.cookies.get("token")?.value || "";
        const decodedToken = jwt.verify(encodedToken,process.env.TOKEN_SECRET!) as DecodedToken

        return decodedToken.id;

    } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unknown error occurred");
    }
    
}