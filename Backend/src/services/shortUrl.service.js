

import { generateNanoId } from "../utils/helper.js";
import { saveShortUrl } from "../dao/short_url.js";

export const createShortUrlWithUser = async (fullUrl, userId, customSlug = null) => {
  const slug = customSlug || generateNanoId();
  return await saveShortUrl(slug, fullUrl, userId);
};

export const createShortUrlWithoutUser = async (fullUrl) => {
  const slug = generateNanoId();
  return await saveShortUrl(slug, fullUrl, null);
};
