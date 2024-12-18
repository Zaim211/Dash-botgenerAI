const mongoose = require('mongoose');

// Event Schema for Calendar
const eventSchema = new mongoose.Schema({
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin", 
        required: true,
      },
  event_date: { type: String, required: true }, // Store the date in YYYY-MM-DD format
  event_time: { type: String, required: true }, // Store the time as HH:mm
  objective: { type: String, required: true },
  comment: { type: String, required: false }
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
