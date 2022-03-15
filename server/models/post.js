const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  author: String,
  comment_body: String,
  likes: Number,
  date: Date,
});

const PostSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  body: { type: String, required: true },
  comments: [CommentSchema],
  number_of_comments: Number,
  likes: Number,
  featured: Boolean,
  publish: Boolean,
  published_on: Date,
  banner: String,
  github_link: String
});

module.exports = {
  Post: mongoose.model("Post", PostSchema),
  Comment: mongoose.model("Comment", CommentSchema)
}
