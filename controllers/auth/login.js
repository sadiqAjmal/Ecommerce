import User from "../../models/user";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const Login=async (req, res) => {
  try {
    const { email, password } = req.body;
    let isValid=false;
    const user = await User.findOne({ email: email });
    if(user)
    {
      if(user.status==="pending")
      throw "Please verify your registration first";
    let isEmailValid = user.email === email;
    let isPasswordValid = await bcrypt.compare(password,user.password);
    if (isEmailValid && isPasswordValid)
      isValid=true;
    if(!isEmailValid)
    throw 'Email not registered';
   else if(!isPasswordValid)
  throw 'Invalid Password';                                                      
    else{
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET_KEY
    );
    
    res.send({token:token,name:user.name,role:user.role});
  }
  }
  else throw 'Email not registered';
}
  catch (error) {
    res.status(401).send({ error: error});
   }
}