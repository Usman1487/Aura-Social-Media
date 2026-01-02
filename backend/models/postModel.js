import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: false },
    date: { type: Number, default: Date.now } 
})

export default mongoose.model.post || mongoose.model("Post", postSchema);