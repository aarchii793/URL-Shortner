

import wrapAsync from "../utils/tryCatchWrapper.js";
import { getAllUserUrlsDao } from "../dao/user.dao.js";

export const getAllUserUrls = wrapAsync(async (req, res) => {
  const urls = await getAllUserUrlsDao(req.user._id);
  res.status(200).json({ urls });
  console.log(urls);
  
});
