import express from 'express';
import jwt from 'jsonwebtoken'
import { Login } from '../controllers/auth/login';
import { signup } from '../controllers/auth/signup';
import { forgotPass } from '../controllers/auth/forgotPass';
import bcrypt from 'bcrypt'
import User from '../models/user';
const router = express.Router();
router.post('/login', async (req, res) => {
  try{
    await Login(req,res);
  }
  catch(err){ 
    console.log("Error in login", err);
  }
});
router.post('/signup',async(req,res)=>{
  try{
    await signup(req.body);
    res.send('User Inserted Successfully');
  }catch(error)
  {
    console.log(error);
    res.status(401).send({error:error});
  }
})
router.post('/forgot-password',async(req,res)=>{
  try{
    await forgotPass(req.body);
    res.send('We have sent you an email');
  }catch(error)
  {
    console.log(error);
    res.status(401).send({ error: error});
  }
})
router.post('/newpass/verify-token',async (req, res) => {
  try {
    let token = req.headers.authorization;
      const decodedToken = jwt.verify(token, "ecommerce_jwt_secret_key_zxc");
      const user=await User.findOne({email:decodedToken.email});
      console.log(decodedToken);
      if (user) {
      res.send("Token Verified");
      } else {
      throw new Error("Your Token Has Expired");
      }
    }
    catch (err) {
    res.status(404).send({error:err.message});
  }
});
router.post('/newpass/resetPassword',async (req, res) => {
  try {
    const newPass=req.body.newPass;
    let token = req.headers.authorization;
    token=token.split(' ')[1];
      const decodedToken = jwt.verify(token, "ecommerce_jwt_secret_key_zxc");
      let hashedPass= await bcrypt.hash(newPass,10);
      const user=User.findOneAndUpdate({email:decodedToken.email},{password:hashedPass}).exec();
      if(!user)
      throw "User not found";
      res.send("Password Updated Successfullly");
    }
    catch (err) {
      console.log(err);
    res.status(404).send({error:err.message});
  }
});

router.post('/verify-user',async(req,res)=>{
  try{
    let token = req.headers.authorization;
    const decodedToken = jwt.verify(token, "ecommerce_jwt_secret_key_zxc");
    const user=await User.findOneAndUpdate({email:decodedToken.email},{status:"verified"});
    console.log(decodedToken);
    if (user) {
    res.send("Token Verified");
    } else {
    throw new Error("Your Token Has Expired");
    }
  }
  catch(err){
    res.status(400).send({error:err});
  }
})
export default router;