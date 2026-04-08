import mongoose from "mongoose";
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/EcommerceStore").then(() => {
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

const WishListSchema = new mongoose.Schema({
    user: {
        type: String,
        unique: true,
        required: true
    },
    wishlist: [{
        type: Number,
        default: []
    }]
})
const CartListSchema = new mongoose.Schema({
    user: {
        type: String,
        unique: true,
        required: true
    },
    cartlist: [{
        type: Number,
        default:[]
    }]
})
const NewUser = mongoose.model("NewUser", NewUserSchema);
const WishListData = mongoose.model("WishList", WishListSchema);
const CartListData = mongoose.model("CartList", CartListSchema);

export { NewUser, WishListData, CartListData };
