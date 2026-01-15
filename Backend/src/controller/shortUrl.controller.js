

  import wrapAsync from "../utils/tryCatchWrapper.js";
import { createShortUrlWithUser, createShortUrlWithoutUser } from "../services/shortUrl.service.js";
import { getShortUrl } from "../dao/short_url.js";

export const createShortUrl = wrapAsync(async (req, res) => {
  const { full_url, custom_slug } = req.body;
  const userId = req.user?._id;

  if (!full_url) return res.status(400).json({ error: "Full URL is required" });

  const doc = userId
    ? await createShortUrlWithUser(full_url, userId, custom_slug)
    : await createShortUrlWithoutUser(full_url);

  res.status(201).json({ short_url: `${process.env.APP_URL}/${doc.short_url}` });
});

export const redirectFromShortUrl = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const urlDoc = await getShortUrl(id);
  if (!urlDoc) return res.status(404).json({ message: "URL not found" });

  res.redirect(urlDoc.full_url);
});
