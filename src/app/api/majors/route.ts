import connectiondb from "@/lib/db/connectiondb";
import { Major } from "@/lib/schemas/route";

export async function GET() {
    try {
        await connectiondb()
        // const majors = await Major.find({});
        // console.log(majors);
        return Response.json({status:200,message:"success"});
    } catch (error) {
        return Response.json({status:500,error});
    }
}