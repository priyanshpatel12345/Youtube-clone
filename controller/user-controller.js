import { errorHandler } from "../utils/error.js";
import User from "../model/user-model.js";

export const updateUser = async (req, res, next) => {
  if (req.params.id !== req.user.id) {
    return next(errorHandler(403, "You are not allowed to update Data"));
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
