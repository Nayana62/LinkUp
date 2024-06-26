import PostModel from "../Models/postModel.js";
import mongoose from "mongoose";
import UserModel from "../Models/userModel.js";

// Creat new Post
// export const createPost = async (req, res) => {
//   try {
//     const newPost = new PostModel(req.body);
//     await newPost.save();
//     res.status(200).json(newPost);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

export const createPost = async (req, res) => {
  const newPost = new PostModel(req.body);

  try {
    // Save the new post
    const savedPost = await newPost.save();

    // Get the user who created the post
    const user = await UserModel.findById(savedPost.userId);

    // Add the user's profile picture to the post response
    const postWithProfilePicture = {
      ...savedPost._doc,
      profilePicture: user.profilePicture,
      firstname: user.firstname,
      lastname: user.lastname,
    };

    res.status(200).json(postWithProfilePicture);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get a post
export const getPost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await PostModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update a post
export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { userId } = req.body;
    const post = await PostModel.findById(postId);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post Updated");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const { userId } = req.body;
    const post = await PostModel.findById(id);

    if (String(post.userId) === String(userId)) {
      await post.deleteOne();
      res.status(200).json("Post deleted successfully");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// like/dislike a post
export const likePost = async (req, res) => {
  try {
    const id = req.params.id;
    const { userId } = req.body;
    const post = await PostModel.findById(id);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Post liked");
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post Unliked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get Timeline POsts

// export const getTimelinePosts = async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const currentUserPosts = await PostModel.find({ userId: userId });
//     const followingPosts = await UserModel.aggregate([
//       {
//         $match: {
//           _id: new mongoose.Types.ObjectId(userId),
//         },
//       },
//       {
//         $lookup: {
//           from: "posts",
//           localField: "following",
//           foreignField: "userId",
//           as: "followingPosts",
//         },
//       },
//       {
//         $project: {
//           followingPosts: 1,
//           _id: 0,
//         },
//       },
//     ]);

//     res.status(200).json(
//       currentUserPosts
//         .concat(...followingPosts[0].followingPosts)
//         .sort((a, b) => {
//           return new Date(b.createdAt) - new Date(a.createdAt);
//         })
//     );
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

export const getTimelinePosts = async (req, res) => {
  try {
    const userId = req.params.id;
    const currentUserPosts = await PostModel.find({ userId: userId });
    const followingPosts = await UserModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);

    // Combine currentUserPosts and followingPosts
    let posts = currentUserPosts.concat(...followingPosts[0].followingPosts);

    // Fetch the latest profile picture for each post's user
    posts = await Promise.all(
      posts.map(async (post) => {
        const user = await UserModel.findById(post.userId);
        post.profilePicture = user.profilePicture;
        return post;
      })
    );

    // Sort posts by createdAt in descending order
    posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
};
