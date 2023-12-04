const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: String,
  instructor: String,
  description: String,
  status: String,
  duration: String,
  schedule: String,
  thumbnail: {
    type: String,
    contentType: String
  },
  location: {
    type: String,
    default: "online"
  },
  prerequisites: {
    type: Array
  },
  syllabus: {
    type: Array
  },
  Student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;