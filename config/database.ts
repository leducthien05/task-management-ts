//Thêm mogoose vào dự án
import mongoose from "mongoose";
//Kết nối database ra bên ngoài
export const connect = async (): Promise<void> =>{
    try {
        const uri: string = process.env.MONGO_URI || "not";
        if(!uri){
            throw new Error("MONGO_URI is missing in .env");
        }
        console.log(uri)
        await mongoose.connect(uri);
        console.log("connect Success");
    } catch (error) {
        console.log("Error")
    }
}