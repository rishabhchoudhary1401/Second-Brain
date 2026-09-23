import { Router } from "express" ;
import { ContentDB, TagsDB, UserDB, LinkDB } from "../db.js";
import { auth } from "../middlewares/auth.js";
import { Types } from "mongoose";
import { contentBodyType } from "../../../../packages/types/contentSchemas.js";
import { get_shared_brain_query } from "../../../../packages/types/get_shared_brain_query.js";

const userRouter = Router();

//get user profile info...
userRouter.get("/me", auth, async (req, res) => {
    const userId = req.userId;
    const user = await UserDB.findOne({_id : userId});
    if(!user) return res.status(400).json({message: "Something went wrong..."});
    const userProfile = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    }
    return res.status(200).json(userProfile);
});


interface contentToUpload {
    link : string,
    type: string,
    title: string,
    tags: Types.ObjectId[],
    userId: string
};

//creating a new brain...
userRouter.post("/create_brain", auth, async(req, res) => {
    const recievedBody = contentBodyType.safeParse(req.body);
    if(!recievedBody.success) return res.status(409).json({message: "Wrong brain formate..."});
    const contentBody = recievedBody.data;
    
    const contentToUpload: contentToUpload = {
        link: contentBody.link,
        type: contentBody.type,
        title: contentBody.title,
        tags: [],
        userId: req.userId!
    }
    for(const tag of contentBody.tags){
        const tagFromDB = await TagsDB.findOne({title: tag});
        if(!tagFromDB){
            //uload tag logic
            const tagUploded = await TagsDB.create({title: tag});
            contentToUpload.tags.push(tagUploded._id);
        }
        else{
            //get tagid and set it in obj to be used as a ref in contentDB
            contentToUpload.tags.push(tagFromDB._id);
        }
    }
    const uplodedBrain = await ContentDB.create(contentToUpload);
    return res.status(200).json({message:"brain created succesfully...", uplodedBrainId: uplodedBrain._id});
});
///editing existing brain content...    expects brainid in params
userRouter.put("/edit_content/:contentId", auth, async (req , res) => {
    const recievedBody = contentBodyType.safeParse(req.body);
    if(!recievedBody.success) return res.status(409).json({message: "Wrong brain formate..."});
    const contentBody = recievedBody.data;
    
    const contentId = req.params.contentId;
    if(!req.userId) return res.status(401).json({ message: "Unauthorized" });

    const contentToReplace: contentToUpload = {
        link: contentBody.link,
        type: contentBody.type,
        title: contentBody.title,
        tags: [],
        userId: req.userId!
    }
    for(const tag of contentBody.tags){
        const tagFromDB = await TagsDB.findOne({title: tag});
        if(!tagFromDB){
            //uload tag logic
            const tagUploded = await TagsDB.create({title: tag});
            contentToReplace.tags.push(tagUploded._id);
        }
        else{
            //get tagid and set it in obj to be used as a ref in contentDB
            contentToReplace.tags.push(tagFromDB._id);
        }
    }
    
    const replacedContent = await ContentDB.updateOne({ _id : contentId, userId: req.userId }, { $set: contentToReplace });
    if(!replacedContent) return res.status(500).json({message: "Unknown error..."});
    return res.status(200).json({message: "Succesfully updated...", updatedContent: replacedContent});

});

//deleting an existing brain...
userRouter.delete("/delete_brain/:brainId", auth, async (req, res) =>{
    const brainId = req.params.brainId;
    if (!req.userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const deletedBrain = await ContentDB.deleteOne({_id : brainId , userId: req.userId});
    if(deletedBrain.deletedCount>0) return res.status(200).json({message:"brain deleted succesfully..."});
    else return res.status(409).json({message:"brain not found to delete..."});
});

//get existing brain
userRouter.get("/get/brain/:brainId", auth, async (req , res) => {
    if (!req.userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const brain = await ContentDB.findOne({
        userId: req.userId,
        _id: req.params.brainId
    }).populate("tags");
    if(brain) return res.status(200).json(brain);
    else return res.status(404).json({message:"Invalid link..."});
});

userRouter.post("/start_sharing_brain", auth, async (req , res ) => {
    const uniqueHash = crypto.randomUUID();
    if (!req.userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const isAlreadyShared = await LinkDB.findOne({userId: req.userId});
    if(isAlreadyShared) return res.status(200).json({link : `http://localhost:${process.env.PORT}/api/v1/user/get_shared_brain?hash=${isAlreadyShared.hash}`});

    const linkInDB = await LinkDB.create({hash: uniqueHash, userId: req.userId});
    if(!linkInDB) return res.status(400).json({message:"Unknown error occured..."});
    else{
        const link = `http://localhost:${process.env.PORT}/api/v1/user/get_shared_brain?hash=${linkInDB.hash}`;
        return res.status(200).json({link: link});
    }
})


//get a shared brain
userRouter.get("/get_shared_brain", async (req , res) => {
    //if(!req.query.hash) return res.status(409).json({message: "Invalid link..."});
    const query = get_shared_brain_query.safeParse(req.query.hash);
    if(!query.success)return res.status(409).json({message: "Invalid Url..."});
    const brainHash = query.data;
    const link = await LinkDB.findOne({hash: brainHash});
    if(!link) return res.status(500).json({message:"Unknown error..."});
    const userId = link.userId;

    const brain = await ContentDB.find({userId: userId}).populate("tags").populate("userId", "firstName lastName");
    if(brain.length == 0) return res.status(200).json({message : "Brain has zero contents..."})
    
    return res.status(200).json(brain);
});

export default userRouter;