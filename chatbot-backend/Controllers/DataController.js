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
      const chatData = await Chat.find().populate('commercial').populate('manager');

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
      const { id } = req.params; 
      if (!id) {
        return res.status(400).json({ message: "ID is required" });
      }
      const updatedData = req.body; 

     
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
 
  static async addComment(req, res) {
    const { id } = req.params; // Lead ID
    const { text, name } = req.body;
    console.log("Adding comment to lead:", id, "Comment:", text, "User:", name);
    if (!name) {
      return res.status(400).json({ message: "Name is required for the comment" });
    }
  
  
    try {
      // Trouver le lead par ID
      const lead = await Chat.findById(id);
      if (!lead) {
        return res.status(404).json({ message: "Lead not found" });
      }
  
      // Vérifier ou initialiser les commentaires
      if (!lead.commentaires) {
        lead.commentaires = [];
      }
  
      // Ajouter un nouveau commentaire
      const newComment = {
        text,
        addedBy: { name }, 
        addedAt: new Date(),
      };
      lead.commentaires.push(newComment);
  
      // Sauvegarder le lead avec le nouveau commentaire
      await lead.save();
  
      return res
        .status(200)
        .json({ message: "Comment added successfully", commentaires: lead.commentaires });
    } catch (error) {
      console.error("Error adding comment:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  

  static async deleteDataById(req, res) {
    try {
      const { id } = req.params;
      const updatedData = req.body;

      const chat = await Chat.findByIdAndDelete(id, updatedData, { new: true });

      if (!chat) {
        return res.status(404).json({ message: "Chat not found" });
      }

      res.status(200).json({ message: "Chat deleted successfully", chat });
    } catch (error) {
      console.error("Error deleting chat:", error);
      res.status(500).json({ message: "Error deleting chat", error });
    }
  }

  static async searchData(req, res) {
    try {
      const { query, columnKey } = req.query;
      let filter = {};
    
      // Log to see the request params
      console.log("Received query:", query, "columnKey:", columnKey);
  
      if (!query || !columnKey) {
        return res.status(400).json({ error: "Query and columnKey are required" });
      }
      if (columnKey === "createdAt") {
        // Convert the query to a Date object
        const dateQuery = new Date(query);
        if (!isNaN(dateQuery.getTime())) {
          // Search for documents created on that date (ignoring time)
          filter = {
            [columnKey]: {
              $gte: new Date(dateQuery.setHours(0, 0, 0, 0)), // Start of the day
              $lt: new Date(dateQuery.setHours(23, 59, 59, 999)), // End of the day
            },
          };
        } else {
          return res.status(400).json({ message: "Invalid date format." });
        }
      } else if (columnKey === "request_name") {
        filter = {
          $or: [
            { request_name: { $regex: query, $options: "i" } },
            { request_email: { $regex: query, $options: "i" } },
            { request_add_email: { $regex: query, $options: "i" } },
          ],
        };
      } else {
        // For other column keys, just search by the columnKey
        filter = { [columnKey]: { $regex: query, $options: "i" } };
      }
  
      // // Construct dynamic filter
      // const filter = { [columnKey]: { $regex: query, $options: "i" } };
  
      const results = await Chat.find(filter);
  
      res.status(200).json(results);
    } catch (error) {
      console.error("Error in search:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async updateStatusLead(req, res) {
    const { id } = req.params; // Get the lead's ID from the URL
  const { statusLead } = req.body; // Get the new statusLead from the request body

  // Validate the new status value
  const validStatuses = ['nouveau', 'prospect', 'client']; // Define the valid statuses
  if (!validStatuses.includes(statusLead)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  try {
    // Find the lead by ID and update the 'type' field
    const updatedLead = await Chat.findByIdAndUpdate(
      id,
      { type: statusLead }, // Update the 'type' field
      { new: true } // Return the updated document
    );

    // If the lead is not found, return an error
    if (!updatedLead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    // Return the updated lead as a response
    res.status(200).json(updatedLead);
  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

static deleteComment = async (req, res) => {
  const { id, commentId } = req.params;
  console.log('Deleting comment:', commentId, 'from chat:', id);

  try {
    // Find the chat document by its ID
    const chat = await Chat.findById(id);
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    // Find the index of the comment by its commentId
    const commentIndex = chat.commentaires.findIndex(
      (comment) => comment._id.toString() === commentId
    );

    console.log('Comment index:', commentIndex);

    if (commentIndex === -1) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Remove the comment from the `commentaires` array
    chat.commentaires.splice(commentIndex, 1);

    // Save the updated chat document
    await chat.save();

    return res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

}

module.exports = DataController;
