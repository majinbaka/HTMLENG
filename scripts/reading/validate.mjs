import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
export function readBank(root = process.cwd()) {
  const directory = path.join(root, "src/content/readings");
  return fs
    .readdirSync(directory)
    .filter((f) => f.endsWith(".json"))
    .sort()
    .flatMap((f) =>
      JSON.parse(fs.readFileSync(path.join(directory, f), "utf8")),
    );
}
export function validateLessons(lessons) {
  assert(
    Array.isArray(lessons) && lessons.length > 0 && lessons.length <= 300,
    "Expected 1–300 lessons",
  );
  const ids = new Set(),
    titles = new Set(),
    passages = new Set();
  for (const l of lessons) {
    assert(
      /^reading-\d{3}$/.test(l.id) &&
        +l.id.slice(8) >= 1 &&
        +l.id.slice(8) <= 300 &&
        !ids.has(l.id),
      `Invalid/duplicate ID ${l.id}`,
    );
    ids.add(l.id);
    assert(
      typeof l.title === "string" &&
        l.title.trim() &&
        !titles.has(l.title.toLowerCase()),
      `Duplicate/empty title ${l.id}`,
    );
    titles.add(l.title.toLowerCase());
    assert(["software", "workplace", "daily-life"].includes(l.topic));
    assert(["B1", "B1+", "B2"].includes(l.level));
    assert(typeof l.summary === "string" && l.summary.trim());
    assert(Number.isInteger(l.minutes) && l.minutes >= 15 && l.minutes <= 40);
    assert(
      Array.isArray(l.paragraphs) &&
        l.paragraphs.length >= 7 &&
        l.paragraphs.length <= 9,
    );
    l.paragraphs.forEach((p, i) => {
      assert.equal(p.label, String.fromCharCode(65 + i));
      assert(typeof p.text === "string" && p.text.trim());
    });
    const passage = l.paragraphs.map((p) => p.text).join(" "),
      words = passage.trim().split(/\s+/).length;
    assert(
      words >= 650 && words <= 900,
      `${l.id}: ${words} words, need 650–900`,
    );
    assert(!passages.has(passage), "Repeated passage");
    passages.add(passage);
    assert(Array.isArray(l.vocabulary) && l.vocabulary.length >= 5);
    l.vocabulary.forEach((v) => assert(v.term && v.meaning));
    assert(
      Array.isArray(l.questions) && l.questions.length === 10,
      `${l.id}: needs 10 questions`,
    );
    const types = new Set();
    l.questions.forEach((q, i) => {
      assert.equal(q.id, `q${i + 1}`);
      assert(
        [
          "multiple-choice",
          "true-false-not-given",
          "short-answer",
          "matching",
        ].includes(q.type),
      );
      types.add(q.type);
      assert(
        q.prompt &&
          typeof q.answer === "string" &&
          q.answer.trim() &&
          q.explanation &&
          q.evidence,
        `${l.id}/${q.id}: missing feedback`,
      );
      assert(
        passage.includes(q.evidence),
        `${l.id}/${q.id}: evidence not found in passage`,
      );
      if (q.type === "short-answer") {
        assert(q.answer.trim().split(/\s+/).length <= 3);
        assert(
          passage.toLowerCase().includes(q.answer.toLowerCase()),
          `${l.id}/${q.id}: answer absent`,
        );
      } else {
        assert(
          Array.isArray(q.options) &&
            q.options.includes(q.answer) &&
            new Set(q.options).size === q.options.length,
          `${l.id}/${q.id}: answer must equal one complete, unique option string`,
        );
      }
      if (q.type === "true-false-not-given")
        assert.deepEqual(
          q.options.map((v) => v.toLowerCase()),
          ["true", "false", "not given"],
        );
      if (q.type === "matching")
        assert(l.paragraphs.some((p) => p.label === q.answer));
    });
    assert.equal(types.size, 4, `${l.id}: use all four question types`);
  }
  return lessons.length;
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const lessons = process.argv[2]
    ? JSON.parse(fs.readFileSync(process.argv[2], "utf8")).lessons
    : readBank();
  console.log(`Validated ${validateLessons(lessons)} practical readings.`);
}
