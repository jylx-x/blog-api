var mongoose = require("mongoose");

var Schema = mongoose.Schema;

const CommentSchema = new Schema({
  author: String,
  comment_body: String,
  likes: Number,
  date: Date,
});

var PostSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  body: { type: String, required: true },
  comments: [CommentSchema],
  number_of_comments: Number,
  likes: Number,
  publish: Boolean,
  published_on: Date,
});

PostSchema.virtual("url").get(() => {
  return "/posts/" + this.id;
});

module.exports = {
  Post: mongoose.model("Post", PostSchema),
  Comment: mongoose.model("Comment", CommentSchema)
}
