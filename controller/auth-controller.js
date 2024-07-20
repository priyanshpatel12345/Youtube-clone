import User from "../model/user-model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// ***********************************
// SignUp Logic
// ***********************************

export const signUp = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({ ...req.body, password: hashPassword });

    await newUser.save();
    res.status(200).json("User has been created!");
  } catch (error) {
    next(error);
  }
};

// ***********************************
// SignInLogic
// ***********************************

export const signIn = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(errorHandler(404, "User Not Found"));
    }

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);

    if (!isCorrect) {
      return next(errorHandler(400, "Invalid Credential"));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, {
      expiresIn: "30d",
    });

    const { password, ...rest } = user._doc;

    res.cookie("access_token", token).status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
