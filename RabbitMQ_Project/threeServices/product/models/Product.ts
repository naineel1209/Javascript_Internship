import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, {
    timestamps: true,
    toJSON: true,
    toObject: true,
    typeKey: 'type',
    id: true,
    _id: true,
    versionKey: false
});


export default model("Product", ProductSchema);

