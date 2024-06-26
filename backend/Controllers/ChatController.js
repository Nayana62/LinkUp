import ChatModel from "../Models/chatModel.js";

export const createChat = async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    // Check if a chat already exists between sender and receiver
    const existingChat = await ChatModel.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (existingChat) {
      // Chat already exists, you can choose to return a message or status code
      return res.status(400).json({ message: "Chat already exists" });
    }

    // Create a new chat if it doesn't exist
    const newChat = new ChatModel({
      members: [senderId, receiverId],
    });

    const result = await newChat.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const userChats = async (req, res) => {
  try {
    const chat = await ChatModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const findChat = async (req, res) => {
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};
