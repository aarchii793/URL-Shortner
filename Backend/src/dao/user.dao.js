



import User from "../config/models/user.model.js";
import UrlModel from "../config/models/shortUrlmodel.js";

export const findUserByEmail = async (email) => await User.findOne({ email }).select("+password");

export const findUserById = async (id) => await User.findById(id);

export const createUser = async (name, email, password) => {
  const user = new User({ name, email, password });
  await user.save();
  return user;
};

export const getAllUserUrlsDao = async (id) =>
  await UrlModel.find({ user: id });
