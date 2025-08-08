import { v4 as uuidv4 } from "uuid";
import userModel from "../models/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const INSERT_USER = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(req.body.password, salt);
    const userName =
      req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1);

    const user = {
      id: uuidv4(),
      name: userName,
      email: req.body.email,
      password: passwordHash,
      money_balance: req.body.money_balance,
    };

    const addUser = new userModel(user);
    const addedUser = await addUser.save();

    res.status(201).json({
      message: "This user was created",
      user: addedUser,
    });
  } catch (err) {
    console.log(err);
    const DUPLICATE_ERROR_CODE = 11000;
    if (err.code === DUPLICATE_ERROR_CODE) {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const LOGIN_USER = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({
        message: "Incorrect email or password",
      });
    }

    const isPasswordMatch = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Incorrect email or password",
      });
    }

    const token = jwt.sign(
      { userEmail: user.email, userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    return res.status(200).json({
      message: "User logged in successfully",
      jwt: token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
