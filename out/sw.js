/* Replaced with a content-versioned cache and asset list by package-static.mjs. */
const VERSION = "9b8905c0dbccf1cb";
const ASSETS = ["404.html","_next/data/458psbLBveVwhGH_xJnZn/chunks.json","_next/data/458psbLBveVwhGH_xJnZn/collocations.json","_next/data/458psbLBveVwhGH_xJnZn/index.json","_next/data/458psbLBveVwhGH_xJnZn/lessons/day-01.json","_next/data/458psbLBveVwhGH_xJnZn/lessons/day-02.json","_next/data/458psbLBveVwhGH_xJnZn/lessons/day-03.json","_next/data/458psbLBveVwhGH_xJnZn/lessons/day-04.json","_next/data/458psbLBveVwhGH_xJnZn/lessons/day-05.json","_next/data/458psbLBveVwhGH_xJnZn/lessons/day-06.json","_next/data/458psbLBveVwhGH_xJnZn/lessons/day-07.json","_next/data/458psbLBveVwhGH_xJnZn/lessons/day-08.json","_next/data/458psbLBveVwhGH_xJnZn/lessons/day-09.json","_next/data/458psbLBveVwhGH_xJnZn/lessons/day-10.json","_next/data/458psbLBveVwhGH_xJnZn/lessons/day-11.json","_next/data/458psbLBveVwhGH_xJnZn/lessons/day-12.json","_next/data/458psbLBveVwhGH_xJnZn/lessons/day-13.json","_next/data/458psbLBveVwhGH_xJnZn/lessons/day-14.json","_next/data/458psbLBveVwhGH_xJnZn/lessons/day-15.json","_next/data/458psbLBveVwhGH_xJnZn/lessons/day-16.json","_next/data/458psbLBveVwhGH_xJnZn/lessons/day-17.json","_next/data/458psbLBveVwhGH_xJnZn/lessons/day-18.json","_next/data/458psbLBveVwhGH_xJnZn/lessons/day-19.json","_next/data/458psbLBveVwhGH_xJnZn/lessons/day-20.json","_next/data/458psbLBveVwhGH_xJnZn/lessons/day-21.json","_next/data/458psbLBveVwhGH_xJnZn/lessons/day-22.json","_next/data/458psbLBveVwhGH_xJnZn/lessons/day-23.json","_next/data/458psbLBveVwhGH_xJnZn/lessons/day-24.json","_next/data/458psbLBveVwhGH_xJnZn/lessons/day-25.json","_next/data/458psbLBveVwhGH_xJnZn/lessons/day-26.json","_next/data/458psbLBveVwhGH_xJnZn/lessons/day-27.json","_next/data/458psbLBveVwhGH_xJnZn/lessons/day-28.json","_next/data/458psbLBveVwhGH_xJnZn/topics.json","_next/static/458psbLBveVwhGH_xJnZn/_buildManifest.js","_next/static/458psbLBveVwhGH_xJnZn/_ssgManifest.js","_next/static/chunks/framework-264c8ed151bec045.js","_next/static/chunks/main-c47a009303f86ed7.js","_next/static/chunks/pages/_app-790da431d5bd9b6a.js","_next/static/chunks/pages/_error-502ed5e138b0f7a8.js","_next/static/chunks/pages/chunks-69ce58cc197fe38f.js","_next/static/chunks/pages/collocations-aa1b24b9eba4694d.js","_next/static/chunks/pages/index-ce2dada7f1f476a3.js","_next/static/chunks/pages/lessons/[day]-3a5a618c2525c969.js","_next/static/chunks/pages/topics-b78623a166b7f0c1.js","_next/static/chunks/polyfills-42372ed130431b0a.js","_next/static/chunks/webpack-73525daf04adfb97.js","assets/app.js","assets/styles.css","assets/topics-data.js","assets/topics.js","assets/weekly-review-data.js","assets/workplace-data.js","chunks/index.html","collocations/index.html","icons/icon-180.png","icons/icon-192.png","icons/icon-32.png","icons/icon-512.png","icons/icon-maskable-512.png","icons/icon.svg","index.html","lessons/day-01.html","lessons/day-02.html","lessons/day-03.html","lessons/day-04.html","lessons/day-05.html","lessons/day-06.html","lessons/day-07.html","lessons/day-08.html","lessons/day-09.html","lessons/day-10.html","lessons/day-11.html","lessons/day-12.html","lessons/day-13.html","lessons/day-14.html","lessons/day-15.html","lessons/day-16.html","lessons/day-17.html","lessons/day-18.html","lessons/day-19.html","lessons/day-20.html","lessons/day-21.html","lessons/day-22.html","lessons/day-23.html","lessons/day-24.html","lessons/day-25.html","lessons/day-26.html","lessons/day-27.html","lessons/day-28.html","manifest.webmanifest","topics/index.html"];
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
