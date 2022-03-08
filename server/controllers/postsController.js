const { findByIdAndUpdate } = require("../models/admin.js");
const { Post, Comment } = require("../models/post.js");

exports.posts_all = (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) return res.json(err);

    res.json(posts);
  });
};

exports.post_create = (req, res) => {
  const post = new Post({
    title: req.body.title,
    author: req.body.author,
    body: req.body.body,
    comments: [],
    number_of_comments: 0,
    likes: 0,
    publish: req.body.publish,
    published_on: new Date(),
  });

  post.save((err) => {
    if (err) res.json(err);

    res.json({ message: "Post created successfully!" });
  });
};

exports.post_get = (req, res) => {
  Post.findById(req.params.postid, (err, post) => {
    if (err) res.json(err);

    res.json(post);
  });
};

exports.post_update = (req, res) => {
  const post = {
    title: req.body.title,
    author: req.body.author,
    body: req.body.body,
    publish: req.body.publish,
  };

  Post.findByIdAndUpdate(req.params.postid, post, (err) => {
    if (err) res.json(err);

    res.json({ message: "Post updated successfully" });
  });
};

exports.post_like = (req, res) => {
  const likes = {
    $inc: {
      likes: 1,
    },
  };

  Post.findByIdAndUpdate(req.params.postid, likes, (err) => {
    if (err) res.json(err);

    res.json({ message: "Liked post successfully" });
  });
};

exports.post_likes_unlike = (req, res) => {
  const likes = {
    $inc: {
      likes: -1,
    },
  };

  Post.findByIdAndUpdate(req.params.postid, likes, (err) => {
    if (err) res.json(err);

    res.json({ message: "Unliked post successfully" });
  });
};

exports.post_delete = (req, res) => {
  Post.findByIdAndDelete(req.params.postid, (err) => {
    if (err) res.json(err);

    res.json({ message: "Post deleted successfully" });
  });
};

exports.post_comments_create = (req, res) => {
  const comment = new Comment({
    author: req.body.author,
    comment_body: req.body.comment,
    likes: 0,
    date: new Date(),
  });

  Post.findByIdAndUpdate(
    req.params.postid,
    {
      $push: {
        comments: comment,
      },
      $inc: {
        number_of_comments: 1,
      },
    },
    (err) => {
      if (err) res.json(err);

      res.json({ message: "Comment posted successfully" });
    }
  );
};

exports.post_comment_update = (req, res) => {
  const comment = {
    comment_body: req.body.comment,
  };

  Post.findOneAndUpdate(
    {
      "comments._id": req.params.commentid,
    },
    {
      $set: {
        "comments.$": comment,
      },
    },
    (err) => {
      if (err) res.json(err);

      res.json({ message: "Comment updated successfully" });
    }
  );
};

exports.post_comment_delete = (req, res) => {
  Post.findOneAndUpdate(
    { "comments._id": req.params.commentid },
    {
      $pull: {
        comments: { _id: req.params.commentid },
      },
      $inc: {
        number_of_comments: -1,
      },
    },
    (err) => {
      if (err) res.json(err);

      res.json({ message: "Comment deleted successfully" });
    }
  );
};

exports.post_comment_like = (req, res) => {
  Post.findOneAndUpdate(
    { "comments._id": req.params.commentid },
    {
      $inc: {
        "comments.$.likes": 1
      }
    },
    (err) => {
      if(err) res.json(err);

      res.json({ message: "Comment liked successfully"})
    }
  )
};

exports.post_comment_unlike = (req, res) => {
  Post.findOneAndUpdate(
    {"comments.id": req.params.commentid},
    {
      $inc: {
        "comments.$.likes": -1
      }
    },
    (err) => {
      if (err) res.json(err);

      res.json({ message: "Comment unliked successfully"})
    }
  )
}
