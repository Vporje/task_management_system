import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (request, response, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(request.body.password, salt);

    const newUser = new User({
      username: request.body.username,
      email: request.body.email,
      password: hash,
    });
    await newUser.save();
    response.status(201).json("New user is created!");
  } catch (error) {
    next(error);
  }
};

export const login = async (request, response, next) => {
  try {
    const user = await User.findOne({ username: request.body.username });
    if (!user) {
      return response.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      request.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return response.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT
    );
    //object destructuring is done, to only pass some data in response which is used in react applications
    const { _id, username } = user._doc;
    response
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "None", // Change to 'None' if making cross-origin requests
        secure: true, // Ensure this is set to true if you're using HTTPS
      })
      .status(200)
      .json({
        status: "success",
        data: {
          details: { _id, username },
        },
      });
  } catch (error) {
    next(error);
  }
};

export const logout = (request, response, next) => {
  try {
    response.clearCookie("access_token");
    response.status(200).send({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
  }
};
