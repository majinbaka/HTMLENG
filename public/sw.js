/* Replaced with a content-versioned cache and asset list by package-static.mjs. */
const VERSION = "__VERSION__";
const ASSETS = __ASSETS__;
const BASE = new URL("./", self.location.href);
// Isolate installations served from different repository mounts on one origin.
const PREFIX = `speaksprint:${BASE.pathname}:`;
const CACHE = PREFIX + VERSION;
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache =>
    cache.addAll(ASSETS.map(asset => new Request(new URL(asset, BASE), { cache: "reload" })))
  ));
});
// Activate only after the learner explicitly requests the downloaded update.
self.addEventListener("message", event => {
  if (event.data?.type === "SKIP_WAITING") event.waitUntil(self.skipWaiting());
});
self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    for (const name of await caches.keys()) {
      if (name.startsWith(PREFIX) && name !== CACHE) await caches.delete(name);
    }
    await self.clients.claim();
  })());
});
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);
  if (event.request.method !== "GET" || url.origin !== BASE.origin || !url.pathname.startsWith(BASE.pathname)) return;
  if (url.pathname === BASE.pathname) url.pathname += "index.html";
  url.search = "";
  // Only serve files belonging to this complete build; never mix build chunks.
  const asset = decodeURIComponent(url.pathname.slice(BASE.pathname.length));
  if (!ASSETS.includes(asset)) return;
  const cacheURL = new URL(asset, BASE);
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    return (await cache.match(cacheURL.href)) || fetch(event.request);
  })());
});
