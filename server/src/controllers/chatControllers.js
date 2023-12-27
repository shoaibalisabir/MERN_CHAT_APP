import expressAsyncHandler from "express-async-handler";
import Chat from "../model/chatSchema.js";
import { User } from "../model/usersSchema.js";
import Message from "../model/messageSchema.js";

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
    res
      .status(400)
      .send({ message: "Internal server error: " + error.message });
  }
});

//fetch all the chats of current user

const fetchChats = expressAsyncHandler(async (req, res) => {
  try {
    var myChats = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("latestMessage")
      .populate("messages");

    if (myChats.length === 0) {
      return res
        .status(404)
        .send({ message: "No chats found for the current user." });
    }

    res.status(200).send(myChats);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal server error: " + error.message });
  }
});

//create group chat

const createGroupChat = expressAsyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res
      .status(400)
      .send({ message: "Please fill all the fields first." });
  }

  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res
      .status(400)
      .send({ message: "There should be 2 users to create the group" });
  }

  users.push(req.user);

  var groupname = req.body.name;

  try {
    const groupChat = await Chat.create({
      chatName: groupname,
      isGroupChat: true,
      users: users,
      groupAdmin: req.user,
    });

    const FullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    console.log("Chat id: " + FullGroupChat._id);
    console.log(FullGroupChat);
    res.status(200).send(FullGroupChat);
  } catch (error) {
    res
      .status(400)
      .send({ message: "Internal server error: " + error.message });
  }
});

//rename group chat

const renameGroup = expressAsyncHandler(async (req, res) => {
  const { chatName, chatId } = req.body;

  if (!chatId) {
    return res.status(400).send({ message: "Please select the group first." });
  }

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    return res.status(404).send({ message: "Chat Not Found" });
  } else {
    res.status(200).json(updatedChat);
  }
});

//add person to group

const addToGroup = expressAsyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.groupId) {
    return res.status(400).send({ message: "Fill all the fields first." });
  }

  try {
    const addUsersToGroupChat = await Chat.findByIdAndUpdate(
      req.body.groupId,
      { $push: { users: req.body.users } },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!addUsersToGroupChat) {
      return res.status(404).send({ message: "Error" });
    } else {
      res.status(200).json(addUsersToGroupChat);
    }
  } catch (error) {
    res.status(400).send({ message: "Error: " + error.message });
  }
});

//remove person from group chat

const removeFromGroup = expressAsyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.groupId) {
    return res.status(400).send({ message: "Fill all the fields first." });
  }

  try {
    const removeUsersFromGroupChat = await Chat.findByIdAndUpdate(
      req.body.groupId,
      { $pull: { users: req.body.users } },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!removeUsersFromGroupChat) {
      return res.status(404).send({ message: "Error" });
    } else {
      res.status(200).json(removeUsersFromGroupChat);
    }
  } catch (error) {
    res.status(400).send({ message: "Error: " + error.message });
  }
});

export {
  accessSingleChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
};
