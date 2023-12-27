import express from "express";
import asyncHandler from "express-async-handler";
import * as dotenv from "dotenv";
import { User } from "../model/usersSchema.js";
import protect from "../middleware/authMiddleware.js";

dotenv.config();
const router = express.Router();

router.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    console.log("Search:", req.query);

    const keyword = req.query.search
      ? {
          $or: [
            { firstName: { $regex: req.query.search, $options: "i" } },
            { lastName: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
    console.log("keyword Regex Object Formed:", keyword.$or);

    const users = await User.find(keyword)
      .find({ _id: { $ne: req.user._id } })
      .select("-password");

    res.status(200).send(users);
  })
);

export default router;
