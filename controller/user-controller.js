import { errorHandler } from "../utils/error.js";
import User from "../model/user-model.js";

// ***********************************
// Update User functionality
// ***********************************

export const updateUser = async (req, res, next) => {
  if (req.params.id !== req.user.id) {
    return next(errorHandler(403, "You are not allowed to update User"));
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// ***********************************
// Delete User functionality
// ***********************************

export const deleteUser = async (req, res, next) => {
  if (req.params.id !== req.user.id) {
    return next(errorHandler(403, "You are not allowed to Delete User"));
  }
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json("User Account Delete Successfully!");
  } catch (error) {
    next(error);
  }
};

// ***********************************
// get User functionality
// ***********************************

export const getUser = async (req, res, next) => {
  try {
    const getUserData = await User.findById(req.params.id);
    res.status(200).json(getUserData);
  } catch (error) {
    next(error);
  }
};

// ***********************************
//  Subscribe Channel functionality
// ***********************************

export const subscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUser: req.params.id },
    });

    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });

    res.status(200).json("Subscribe Successfully!!");
  } catch (error) {
    next(error);
  }
};

// ***********************************
//  unSubscribe Channel functionality
// ***********************************

export const unsubscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUser: req.params.id },
    });

    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });

    res.status(200).json("Unsubscribe Successfully!!");
  } catch (error) {
    next(error);
  }
};
