import md5 from "md5";

export function getGravatarUrl(email, size = 200) {
  const trimmedEmail = email?.trim().toLowerCase() || "";
  const hash = md5(trimmedEmail);
  return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=${size}`;
}
