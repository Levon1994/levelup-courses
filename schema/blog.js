const mongoose = require('mongoose')

const Blog = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String
  },
  views: {
    type: Number,
    default: 0
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  content: {
    type: Object
  },
  description: {
    type: String
  },
  image_url: {
    type: String
  }
})

module.exports = mongoose.model('Blog', Blog)
