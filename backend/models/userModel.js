import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true },
    password: {type:String, required:true},
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post" 
    }]
})

export default mongoose.model.user || mongoose.model("User", userSchema);