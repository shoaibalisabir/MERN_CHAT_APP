import express from "express";
import * as dotenv from "dotenv";
import { User } from "../models/user";
import Joi from "joi";
import bcrypt from "bcrypt";
console.log("1");

const router = express.Router();

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    } else {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).send({ message: "Invalid email or password" });
      } else {
        const validatePassword = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!validatePassword) {
          return res.status(401).send({ message: "Invalid password" });
        } else {
          const token = user.generateAuthToken();
          res
            .status(200)
            .send({ data: token, message: "Logged in successfully" });
        }
      }
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
});

export default router;
