import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";

const root = process.cwd();
const out = path.join(root, "out");
// Preserve the established .html URLs inside the exported site.
await fs.mkdir(path.join(out, "topics"), { recursive: true });
await fs.rename(
  path.join(out, "topics.html"),
  path.join(out, "topics/index.html"),
);

async function htmlFiles(directory) {
  const result = [];
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...(await htmlFiles(file)));
    else if (entry.name.endsWith(".html")) result.push(file);
  }
  return result;
}
for (const file of await htmlFiles(out)) {
  const prefix =
    path.relative(path.dirname(file), out).split(path.sep).join("/") || ".";
  const html = await fs.readFile(file, "utf8");
  // Next's assets must resolve from any repository mount, including /repo/out/.
  await fs.writeFile(
    file,
    html.replace(/(["'])\.\/_next\//g, `$1${prefix}/_next/`),
  );
}

function redirect(target) {
  return `<!doctype html>
<html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>SpeakSprint</title><link rel="icon" href="out/icons/icon.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="out/icons/icon-180.png"><link rel="manifest" href="out/manifest.webmanifest"><meta name="theme-color" content="#153f3a">
<script>location.replace(${JSON.stringify(target)} + location.search + location.hash);</script>
</head><body><p>Đang mở SpeakSprint… <a href="${target}">Mở trang học</a></p><noscript>Bật JavaScript để học và lưu tiến độ.</noscript></body></html>
`;
}
// Keep only the repository-root entry point; pages live in out/.
await fs.writeFile(path.join(root, "index.html"), redirect("out/index.html"));
// Static hosting (including GitHub Pages) must serve the _next directory.
await fs.writeFile(path.join(root, ".nojekyll"), "");
await fs.writeFile(path.join(out, ".nojekyll"), "");

// Precache the complete static build so every lesson can open offline, including
// Next hydration chunks. Hash contents so any source/content change updates it.
async function collectAssets(directory) {
  const result = [];
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...(await collectAssets(file)));
    else if (entry.name !== "sw.js" && entry.name !== ".nojekyll")
      result.push(file);
  }
  return result;
}
const files = (await collectAssets(out)).sort();
const hash = createHash("sha256");
const assets = [];
for (const file of files) {
  const relative = path.relative(out, file).split(path.sep).join("/");
  assets.push(relative);
  hash.update(relative).update(await fs.readFile(file));
}
const worker = await fs.readFile(path.join(root, "public/sw.js"), "utf8");
hash.update(worker);
await fs.writeFile(
  path.join(out, "sw.js"),
  worker
    .replace('"__VERSION__"', JSON.stringify(hash.digest("hex").slice(0, 16)))
    .replace("__ASSETS__", JSON.stringify(assets)),
);
console.log(
  "Static site ready in out/. Repository-root index.html redirects to it.",
);
