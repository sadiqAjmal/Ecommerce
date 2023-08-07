import mongoose from "mongoose"
const ProductSchema = new mongoose.Schema({
        _id:{type:String},
        name:{
            type:String
        },
        image:{
            type:String
        },
        price:{
            type:Number
        },
        size:{
            type:String
        },
        quantity:{
            type: Number,
        },
        color:{
            type:String,
        },
        description:{
            type:String,
        }
}, { timestamps: true });
ProductSchema.index({ name: 'text' });
const Products = mongoose.model("Products", ProductSchema);
export default Products;