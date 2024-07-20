import Video from "../model/video-model.js";
import User from "../model/user-model.js";
import { errorHandler } from "../utils/error.js";
import { channel } from "diagnostics_channel";
import { title } from "process";

// **********************************
// create Video Functionality
// **********************************

export const addVideo = async (req, res, next) => {
  try {
    const newVideo = new Video({ userId: req.user.id, ...req.body });
    const savedVideo = await newVideo.save();

    res.status(200).json(savedVideo);
  } catch (error) {
    next(error);
  }
};

// **********************************
// update Video Functionality
// **********************************

export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return next(errorHandler(404, "Video Not Found"));
    }

    if (req.user.id !== video.userId) {
      return next(errorHandler(403, "You are not allowed to update Video"));
    }

    const updateVideo = await Video.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updateVideo);
  } catch (error) {
    next(error);
  }
};

// **********************************
// delete Video Functionality
// **********************************

export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return next(errorHandler(404, "Video Not Found"));
    }

    if (req.user.id !== video.userId) {
      return next(errorHandler(403, "You are not allowed to delete Video"));
    }

    await Video.findByIdAndDelete(req.params.id);

    res.status(200).json("Delete Video Successfully");
  } catch (error) {
    next(error);
  }
};

// **********************************
// get Video Functionality
// **********************************

export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);

    res.status(200).json(video);
  } catch (error) {
    next(error);
  }
};

// **********************************
// Increment views of  Video functionality
// **********************************

export const addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });

    res.status(200).json("The view has been increased");
  } catch (error) {
    next(error);
  }
};

// **********************************
// get Random Video Functionality
// **********************************

export const randomVideo = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);

    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

// **********************************
// get trend Video Functionality
// **********************************

export const trendVideo = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });

    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

// **********************************
// get Subscribed Channel Video Functionality
// **********************************

export const subVideo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUser;

    const list = await Promise.all(
      subscribedChannels.map((channelId) => {
        return Video.find({ userId: channelId });
      })
    );

    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {
    next(error);
  }
};

// **********************************
// get Subscribed Channel Videos Functionality
// **********************************

export const tagByVideo = async (req, res, next) => {
  const tags = req.query.tags.split(",");
  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(10);

    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

// **********************************
// get Videos by search Functionality
// **********************************

export const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(20);

    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};
