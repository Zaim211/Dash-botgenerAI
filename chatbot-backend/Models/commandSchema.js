const mongoose = require("mongoose");

const commandSchema = new mongoose.Schema(
  {
    command_type: {
      type: String,
      enum: ["devis", "contract"],
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Command", commandSchema);
