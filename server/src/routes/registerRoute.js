import express from "express";
import * as dotenv from "dotenv";
import { User, validate } from "../models/user";
import bcrypt from "bcrypt";

dotenv.config();
console.log("2");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    } else {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(409)
          .send({ message: "User with the given email already exists" });
      } else {
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new User({ ...req.body, password: hashPassword }).save();
        res.status(201).send({ message: "User created successfully" });
      }
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

export default router;
