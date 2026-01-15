

import shortUrlmodel from "../config/models/shortUrlmodel.js";
import { ConflictError } from "../utils/errorHandler.js";

export const getShortUrl = async (slug) =>
  await shortUrlmodel.findOneAndUpdate({ short_url: slug }, { $inc: { clicks: 1 } });

export const getCustomShortUrl = async (slug) =>
  await shortUrlmodel.findOne({ short_url: slug });

export const saveShortUrl = async (shortcode, longUrl, userId) => {
  try {
    const urlDoc = new shortUrlmodel({
      short_url: shortcode,
      full_url: longUrl,
      user: userId || undefined,
    });

    await urlDoc.save();
    return urlDoc;
  } catch (err) {
    if (err.code === 11000) throw new ConflictError("Slug already taken");
    throw err;
  }
};
