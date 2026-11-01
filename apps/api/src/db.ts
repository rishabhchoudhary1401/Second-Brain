import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjId = Schema.ObjectId;

let connectionPromise: Promise<typeof mongoose> | null = null;

export function connectDB() {
    if (mongoose.connection.readyState === 1) return Promise.resolve(mongoose);
    if (!process.env.DB_URL) return Promise.reject(new Error("DB_URL missing"));

    if (!connectionPromise) {
        connectionPromise = mongoose.connect(process.env.DB_URL).catch((error) => {
            connectionPromise = null;
            throw error;
        });
    }

    return connectionPromise;
}

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
    tags: [{type: ObjId, ref: "TagsDB"}],
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
