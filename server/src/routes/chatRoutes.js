import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  accessSingleChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} from "../controllers/chatControllers.js";

const router = express.Router();

router.route("/").post(protect, accessSingleChat);
router.route("/").get(protect, fetchChats);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/addtogroup").put(protect, addToGroup);
router.route("/removefromgroup").put(protect, removeFromGroup);

export default router;
