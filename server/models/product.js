import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema({
    name: {type: String, required: true},
    image_uri: {type: String, requored: true},
    description: {type: String },
    price: { type: String, required: true },
    ar_uri: {type: String, required: false},
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
});

const Product = mongoose.model('Product', productSchema)

export default Product;  //export the model