import mongoose from "mongoose"

export const connectDB = async () =>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database already connect : ${connection.connection.host}`);
    }catch(err){
        console.error(`error : ${err.message}`);
        throw err}
}