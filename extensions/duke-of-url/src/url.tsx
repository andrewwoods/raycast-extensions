/*
 * URL functions
 * -------------
 */

export function makePageUrl(url: URL) {
  let newUrl = "";

  newUrl = url.protocol + "//" + url.host + url.pathname;

  return new URL(newUrl);
}

export function makeSiteUrl(url: URL) {
  let newUrl = "";

  newUrl = url.protocol + "//" + url.host;

  return new URL(newUrl);
}
