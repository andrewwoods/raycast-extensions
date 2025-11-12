/*
 * URL functions
 * -------------
 */

export function makePageUrl(url: URL) {
  return new URL(url.protocol + "//" + url.host + url.pathname);
}

export function makeSiteUrl(url: URL) {
  return new URL(url.protocol + "//" + url.host);
}
