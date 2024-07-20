import Video from "../model/video-model.js";
import Comment from "../model/Comment-model.js";
import { errorHandler } from "../utils/error.js";

// **********************************
// create Comment Functionality
// **********************************

export const createComment = async (req, res, next) => {
  const newComment = new Comment({ userId: req.user.id, ...req.body });

  try {
    const savedComment = await newComment.save();

    res.status(200).json(savedComment);
  } catch (error) {
    next(error);
  }
};

// **********************************
// delete Video Functionality
// **********************************

export const deleteComment = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    const comment = await Comment.findById(req.params.id);

    if (req.user.id === video.userId || req.user.id === comment.userId) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("Comment Delete SuccessFully!");
    } else {
      return next(errorHandler(403, "You are not Allowed to Delete Comment"));
    }
  } catch (error) {
    next(error);
  }
};

// **********************************
// get all Videos Functionality
// **********************************

export const getAllComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};
