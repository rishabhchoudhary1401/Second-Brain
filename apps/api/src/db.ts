import mongoose from "mongoose";
import type { required } from "zod/mini";
const Schema = mongoose.Schema;
const ObjId = Schema.ObjectId;

const userDB = new Schema({
    email: {type: String, unique: true},
    password : String,
    firstName: String,
    lastName: String
});
const contentsDB = new Schema({
    link: String,
    type: String,
    title: String,
    tags: [{type: ObjId, ref: "TagDB"}],
    userId: {type: ObjId, ref: "UserDB", required:true}
});

const tagsDB = new Schema({
    title: String
});
const linkDB = new Schema({
    hash: { type: String, unique: true, required: true },
    userId: { type: ObjId, ref: "UserDB", required: true }
});



const LinkDB = mongoose.model("LinkDB", linkDB);
const UserDB = mongoose.model("UserDB", userDB);
const ContentDB = mongoose.model("ContentDB", contentsDB )
const TagsDB = mongoose.model("TagsDB", tagsDB)
export { UserDB, ContentDB, TagsDB, LinkDB };