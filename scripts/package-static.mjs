import fs from "node:fs/promises";
import path from "node:path";

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
<html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>SpeakSprint</title>
<script>location.replace(${JSON.stringify(target)} + location.search + location.hash);</script>
</head><body><p>Đang mở SpeakSprint… <a href="${target}">Mở trang học</a></p><noscript>Bật JavaScript để học và lưu tiến độ.</noscript></body></html>
`;
}
// Keep only the repository-root entry point; pages live in out/.
await fs.writeFile(path.join(root, "index.html"), redirect("out/index.html"));
// Static hosting (including GitHub Pages) must serve the _next directory.
await fs.writeFile(path.join(root, ".nojekyll"), "");
await fs.writeFile(path.join(out, ".nojekyll"), "");
console.log(
  "Static site ready in out/. Repository-root index.html redirects to it.",
);
