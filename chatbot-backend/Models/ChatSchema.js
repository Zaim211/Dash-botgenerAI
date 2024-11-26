const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    addedBy: {
      name: { type: String, required: true }, // Ensure `name` is marked as required
    },
    addedAt: { type: Date, default: Date.now },
  });
  

const chatSchema = new mongoose.Schema(
  {
    request_name: {
      type: String,
      // required: true,
    },
    request_email: {
      type: String,
      // required: true,
      match: /.+\@.+\..+/, // Basic email format validation
    },
    request_add_email: {
      type: String,
      // required: true,
      match: /.+\@.+\..+/,
    },
    request_phone: {
      type: String,
      // required: true,
    },
    new_start: { type: String, default: "" },
    type: { type: String, default: "all" },
    contact: { type: String, default: "" },
    salaries: { type: String, default: "" },
    pose_question: { type: String, default: "" },
    not_talk: { type: String, default: "" },
    remmberme: { type: String, default: "" },
    student: { type: String, default: "" },
    choose_course: { type: String, default: "" },
    course_details: { type: String, default: "" },
    duration: { type: String, default: "" },
    scholarships: { type: String, default: "" },
    choose_program: { type: String, default: "" },
    company: { type: String, default: "" },
    employee_training: { type: String, default: "" },
    research_projects: { type: String, default: "" },
    project_details: { type: String, default: "" },
    parent: { type: String, default: "" },
    program_interest: { type: String, default: "" },
    program_details: { type: String, default: "" },
    scholarship: { type: String, default: "" },
    salarie_details: { type: String, default: "" },
    choose_course_salarie: { type: String, default: "" },
    etude_superieures: { type: String, default: "" },
    choose_course_salaries: { type: String, default: "" },
    lycéee: { type: String, default: "" },
    Nivaux_etude: { type: String, default: "" },
    lycée: { type: String, default: "" },
    etude_superieur: { type: String, default: "" },
    college: { type: String, default: "" },
    découvrir: { type: String, default: "" },
    details: { type: String, default: "" },
    training_details: { type: String, default: "" },
    verification_phone: { type: String, default: "" },
    verification_email: { type: String, default: "" },
    commentaires: [commentSchema],
    commercial: { type: mongoose.Schema.Types.ObjectId, ref: 'Commercial' }, 
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
