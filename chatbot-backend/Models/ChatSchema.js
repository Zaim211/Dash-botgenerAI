const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    request_name: {
        type: String,
        required: true,
    },
    request_email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/, // Basic email format validation
    },
    request_phone: {
        type: String,
        required: true,
    },
    new_start: { type: String, default: '' },
    // talk_before: { type: String, default: '' },
    contact: { type: String, default: '' },
    salaries: { type: String, default: '' },
    pose_question: { type: String, default: '' },
    not_talk: { type: String, default: '' },
    remmberme: { type: String, default: '' },
    student: { type: String, default: '' },
    choose_course: { type: String, default: '' },
    course_details: { type: String, default: '' },
    duration: { type: String, default: '' },
    // financial_aid: { type: String, default: '' },
    scholarships: { type: String, default: '' },
    // job_seeker: { type: String, default: '' },
    choose_program: { type: String, default: '' },
    // job_course_details: { type: String, default: '' },
    // job_support: { type: String, default: '' },
    company: { type: String, default: '' },
    employee_training: { type: String, default: '' },
    // training_details: { type: String, default: '' },
    // training_format: { type: String, default: '' },
    research_projects: { type: String, default: '' },
    project_details: { type: String, default: '' },
    parent: { type: String, default: '' },
    program_interest: { type: String, default: '' },
    program_details: { type: String, default: '' },
    // support_services: { type: String, default: '' },
    scholarship: { type: String, default: '' },
    // excellence_details: { type: String, default: '' },
    // foreign_students_details: { type: String, default: '' },
    // need_based_details: { type: String, default: '' },
    // research_grant_details: { type: String, default: '' },
    // athletic_scholarship_details: { type: String, default: '' },
    // professional_studies_details: { type: String, default: '' },
}, { timestamps: true });

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
