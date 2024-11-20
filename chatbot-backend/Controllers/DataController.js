const Chat = require("../Models/ChatSchema");

class DataController {
  // Test the connection
  static async data(req, res) {
    try {
      const data = new Chat(req.body);

      await data.save();

      res.status(201).json(data);
    } catch (error) {
      console.error("Error saving chat data:", error);
      res.status(500).json({ message: "Error saving chat data", error });
    }
  }

  // Retrieve chat data
  static async getdata(req, res) {
    try {
      // Retrieve all chat documents from the database
      const chatData = await Chat.find();

      // Send the chat data back to the client
      res.status(200).json({ chatData });
    } catch (error) {
      console.error("Error retrieving chat data:", error);
      res.status(500).json({ message: "Error retrieving chat data", error });
    }
  }
  static async getdataById(req, res) {
    try {
      const { id } = req.params;
      const chat = await Chat.findById(id);

      if (!chat) {
        return res.status(404).json({ message: "Chat not found" });
      }

      res.status(200).json({ chat });
    } catch (error) {
      console.error("Error retrieving chat by ID:", error);
      res.status(500).json({ message: "Error retrieving chat by ID", error });
    }
  }
  static async updateDataById(req, res) {
    try {
      const { id } = req.params; // Get the ID from the URL params
      const updatedData = req.body; // Get the updated data from the request body

      // Find the chat by ID and update it
      const chat = await Chat.findByIdAndUpdate(id, updatedData, { new: true });

      if (!chat) {
        return res.status(404).json({ message: "Chat not found" });
      }

      res.status(200).json({ chat });
    } catch (error) {
      console.error("Error updating chat:", error);
      res.status(500).json({ message: "Error updating chat", error });
    }
  }
}

module.exports = DataController;
