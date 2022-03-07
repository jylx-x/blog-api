var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  body: { type: String, required: true },
  comments: [
    {
      author: String,
      comment_body: String,
      likes: Number,
      date: Date,
    },
  ],
  number_of_comments: Number,
  likes: Number,
  publish: Boolean,
  published_on: Date,
});

PostSchema.virtual("url").get(() => {
  return "/posts/" + this.id;
});

module.exports = mongoose.model('Post', PostSchema)