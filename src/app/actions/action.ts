import { Major } from "@/lib/schemas/route"

export const getMajors = async ()=>{
    try {
       const majors= await Major.find({})
        
       return {""}
    } catch (error) {
        
    }
}