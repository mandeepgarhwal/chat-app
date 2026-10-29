import mongoose from "mongoose"


export async function connectDB(){
    try {
        const mongoUri = process.env.MONGO_URI;

        if(!mongoUri){
            throw new Error("Mongo URI is required")
        }

        const conn = await mongoose.connect(mongoUri)

        console.log("Database is connected", conn.connection.host)
        
    } catch (error) {
        console.log("mongo DB error", error)
        process.exit(1)
    }
}