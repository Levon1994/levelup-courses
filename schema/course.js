const mongoose = require('mongoose')

const Courses = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String
  },
  aboutCourse: {
    type: String
  },
  description: {
    type: String
  },
  topics: {
    type: Array
  },
  effort: {
    type: String
  },
  startDate: {
    type: Date
  },
  duration: {
    type: Number
  },
  lessons_count: {
    type: Number
  },
  price: {
    type: Number
  },
  image_url: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('Courses', Courses);
