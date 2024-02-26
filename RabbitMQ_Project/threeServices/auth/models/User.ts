import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
}, {
    timestamps: true,
    toJSON: true,
    toObject: true,
    typeKey: 'type',
    id: true,
    _id: true,
    versionKey: false
});


export default model("User", UserSchema);

