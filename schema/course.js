const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const itemsSchema = mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: String, required: true },
  url: { type: String, required: true }
});

const VideoCoursesItems = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  videoCoursesId: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  duration: { type: String, required: true },
  items: [itemsSchema]
});

const demoItemSchema = mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: String, required: true },
  url: { type: String, required: true }
});

const VideoCourses = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  createdby: { type: String, required: true },
  lessons: [VideoCoursesItems],
  demoItems: [demoItemSchema],
  whatYouWillLearn: [String],
  requirements: [String],
  description: String,
  image_url: String
});

VideoCourses.plugin(mongoosePaginate);

module.exports = mongoose.model('VideoCourses', VideoCourses);
