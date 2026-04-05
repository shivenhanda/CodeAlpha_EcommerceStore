import mongoose from "mongoose";
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/EcommerceStore").then(()=>{
            console.log("DB Connected Successfully")
        })
    } catch (error) {
        console.log(error)
    }
}
connectDB();

const NewUserSchema = new mongoose.Schema({
    user: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const NewUser = mongoose.model("NewUser", NewUserSchema);

export default NewUser;
