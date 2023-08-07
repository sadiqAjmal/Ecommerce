import User from "../../models/user";
import { sendMail } from "../resetEmail";
import jwt from 'jsonwebtoken';

export const forgotPass = async ({ email }) => {
  if (email) {
    console.log(email);
    let data = await User.findOne({ email: email });
    if (data) {
      const token = jwt.sign(
        {
          _id: data._id,
          email: data.email,
          name: data.name,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '5m' } 
      );
      try
      {sendMail(email, `Click the following link to reset your password: http://localhost:3000/newpass/${token}`, 'Reset Password');
      }catch(err)
      {
        console.log(err);
      }
      return;
    }
  }
  throw 'User does not exist';
}
