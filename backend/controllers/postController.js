import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";


const createPost = async (req, res) => {
    try {
        const { userId, title, description, image } = req.body;

        if (!title || !description) {
            return res.json({ success: false, message: "Missing Details" });
        }

        const newPost = new postModel({
            userId, 
            title,
            description,
            image
        })

        const savedPost = await newPost.save();

        await userModel.findByIdAndUpdate(userId, { $push: { posts: savedPost._id } });

        res.json({ success: true, message: "Post Created Successfully", post: savedPost });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


const getAllPosts = async (req, res) => {
    try {
        const posts = await postModel.find({}).populate('userId', 'name email') .sort({ date: -1 }); 
        res.json({ success: true, posts });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params; 

        if (!userId) {
            console.log("Error: User ID is undefined!");
            return res.json({ success: false, message: "User ID missing in URL" });
        }

        const posts = await postModel.find({ userId: userId }).sort({ date: -1 });
    
        res.json({ success: true, posts });

    } catch (error) {
        console.log("Error:", error);
        res.json({ success: false, message: error.message });
    }
}

const getPostById = async (req, res) => {
    try {
        const { id } = req.params; 
        
        const post = await postModel.findById(id).populate('userId', 'name');
        
        if(!post){
             return res.json({ success: false, message: "Post not found" });
        }

        res.json({ success: true, post });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { createPost, getAllPosts, getUserPosts, getPostById };