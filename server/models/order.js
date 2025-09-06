import mongoose, {Schema} from "mongoose";

const ItemSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
        },
   quantity: { type: Number, required: true }, 
});


const OrderShema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    deliverydate: { type: Date, required: true },
    address: {type: String},
    items: { type: [ItemSchema], required: true },
    status: { type: String, 
        enum: ["Order Placed", 
            "Shipping", 
            "delivered", 
            "cancelled"],
            default: "Order Placed",
            required: true,
        },
        createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

const Order = mongoose.model("Order", OrderShema);

export default Order;  //export the model