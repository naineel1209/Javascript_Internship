import { Schema, model } from "mongoose";

const OrderSchema = new Schema({
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
    user: String,
    total_price: Number,
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


export default model("Order", OrderSchema);

