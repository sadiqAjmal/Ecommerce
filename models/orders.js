import mongoose from "mongoose"
const OrderSchema = new mongoose.Schema({
     userId:{
        type:String,
    ref:"Users",
    },    
    _id:{
        type:String,
    },
        orderNo:{
            type:String,
        },
        date:{
            type:String
        },
        products:{
            type:Array,
        }
        ,amount:{
            type: Number,
        }
}, { timestamps: true });
const Order = mongoose.model("Orders", OrderSchema);
export default Order;