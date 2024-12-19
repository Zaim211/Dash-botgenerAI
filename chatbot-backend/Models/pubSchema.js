const mongoose = require("mongoose");

const pubSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin", 
    required: true,
  },
  title: { type: String, required: true },
  mainText: { type: String, required: true },  
  imageUrl: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Publicity", pubSchema);
