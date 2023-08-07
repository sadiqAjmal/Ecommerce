import mongoose from "mongoose"
const UserSchema = new mongoose.Schema({
  _id:{type:String},
  email:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true,
  },
  name: {
    type: String,
    required: true,
  },
  mobile:{
    type:String,
  },
  role:{
    type:String,
  },
  status:{
    type:String
  }
});
const User = mongoose.model("Users", UserSchema);
export default User;