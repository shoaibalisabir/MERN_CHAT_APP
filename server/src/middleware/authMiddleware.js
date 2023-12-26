import { User } from "../model/usersSchema.js";
import asyncHandler from "express-async-handler";
import Jwt from "jsonwebtoken";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = Jwt.verify(token, process.env.JWTPRIVATEKEY);

      req.user = await User.findById(decoded._id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token missing or invalid");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, token missing");
  }
});

export default protect;
