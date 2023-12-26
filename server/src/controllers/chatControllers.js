import expressAsyncHandler from "express-async-handler";
import Chat from "../model/chatSchema.js";
import { User } from "../model/usersSchema.js";

//single one to one chat is created

const accessSingleChat = expressAsyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("No userId was provided in the request body");
    return res.status(400).send("No userId was provided in the request body");
  }

  var isChat = await Chat.find({
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, { path: "latestMessage.sender" });

  //checking if chat already exisits
  if (isChat.length > 0) {
    console.log("Chat already exists", isChat[0]);
    res.status(200).json(isChat[0]);
  } else {
    var newChat = {
      chatName: "simple chat",
      isGroupChat: false,
      users: [req.user._id, userId],
    };
  }

  try {
    const chatCreated = await Chat.create(newChat);
    const FullChat = await Chat.findOne({ _id: chatCreated._id }).populate(
      "users",
      "-password"
    );
    console.log("Chat id: " + chatCreated._id);
    console.log(chatCreated);
    res.status(201).send(FullChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

export default accessSingleChat;
