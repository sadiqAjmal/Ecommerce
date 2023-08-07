import User from "../../models/user";
import bcrypt from "bcrypt";
import { sendMail } from "../resetEmail";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
export const signup = async (user) => {
  if (user.email && user.password && user.fullName) {
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      throw "Email already exists";
    }
    try {
        const token = jwt.sign(
            {
              _id: user._id,
              email: user.email,
              name: user.name,
            },
           process.env.JWT_SECRET_KEY
          );
      await sendMail(
        user.email,
        `You have registered for ECommerce/nClick the following link to verify: http://localhost:3000/verify-user/${token} /n **ignore this mail if you did not signup**`,
        "Verify Email"
      );
    } catch (err) {
      throw "Please Enter a valid email";
    }
    const hashedPass = await bcrypt.hash(user.password, 10);
    const data = new User({
        _id:nanoid(),
      ...user,
      password: hashedPass,
      name: user.fullName,
      role: "user",
      status: "pending",
    });
    await data.save();
    return;
  }
  throw "Not Enough Info";
};
