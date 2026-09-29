---
name: english-chunk-designer
description: Design or revise SpeakSprint English lessons for Vietnamese A2–early B1 learners using five daily chunks, retrieval practice, controlled variation, and spaced reuse. Use for lesson content, chunk exercises, weekly reviews, or speaking practice; use english-tutor for site behavior and progress implementation.
---

# English Chunk Designer

Design small, practical lessons that turn passive knowledge into listening and speaking reflexes. The learner often translates from Vietnamese, retrieves words slowly, and becomes overwhelmed by large vocabulary lists. Optimize for retention, retrieval, and reuse rather than content volume. Do not promise a CEFR level from completing a fixed number of days.

## Work in this project

Keep the existing four-week themes and lesson URLs. Read `../english-tutor/references/curriculum.md` for the topic sequence; use `../english-tutor/SKILL.md` when changing the site. Revise requested lesson sections in place, preserving learner answers, recordings, completion dates, and streaks. Do not invent performance from repository files.

Each day has exactly **five target chunks**, as requested for this project. This means five items to practise, not necessarily five new expressions. Days 7, 14, 21, and 28 use five previously taught chunks with almost no new language. A chunk is a reusable phrase or sentence frame, not an isolated word. Label recycled items honestly.

Accept DAY, WEEK, THEME, PREVIOUS_CHUNKS, MASTERED_CHUNKS, STRUGGLING_CHUNKS, COMMON_ERRORS, PREVIOUS_SCORE, AVAILABLE_TIME, LEARNER_INTERESTS, and DIFFICULTY when provided. Inspect earlier lessons before choosing new chunks. If evidence is missing, assume A2, use the established work theme, and make conservative choices without inventing mastery.

## Learning loop and limits

Use INPUT → NOTICE → CHUNK → RECALL → VARIATION → SPEAK → REUSE → REVIEW.

- Aim for 30–40 minutes, one measurable communication objective, at most five new chunks, and at most five to eight important new words.
- Once prior lessons exist, aim for 60–70% familiar language across input and practice, with 30–40% new content. Reuse old language in new situations, not just lists. Treat these as design targets, not measured learner mastery.
- Include at most one small grammar pattern when the task needs it. Explain it briefly in Vietnamese; avoid a detached grammar lecture.
- Keep dialogue, examples, exercises, and speaking mostly in common spoken English. Use Vietnamese for meaning and concise correction. Avoid uncommon regional slang.
- For each target chunk supply its Vietnamese meaning, when to use it, a reusable pattern, one simple example, and one personalizable work example. Mark invented personal examples as models, not learner facts.

## Daily lesson output

1. **Today's Mission:** one observable goal with speaking duration and target chunk use.
2. **Warm-up Recall:** three to five short prompts about old language when available; attempt before models.
3. **Input:** a natural original dialogue, monologue, or story; 80–150 words at A2, 100–200 at A2+/B1. Embed target chunks naturally and recycle familiar ones. Do not stuff in extra vocabulary.
4. **Comprehension Check:** three to five questions covering gist, details, and intention, grounded in that day's input.
5. **Target Chunks:** exactly five contextualized chunks with the fields above.
6. **Controlled Variation:** two or three short transformations per chunk, changing details and then applying the frame to the learner's life.
7. **Rapid Recall Drill:** five to ten situation prompts mixing old and current chunks. Ask for a spoken start within about three seconds; keep models hidden until an attempt. Accept natural alternatives rather than exact-string grading.
8. **Speaking Challenge:** one task, three to five speaking points, no full written script first. In Week 1 use 30–60 seconds on Days 1–2, 60–90 on Days 3–4, 90–120 on Days 5–6, and two minutes on Day 7. Later weeks keep a manageable duration and adapt from evidence.
9. **Conversation Challenge:** play one realistic role, ask one question, and wait. Continue naturally for four to eight exchanges before feedback. On the static site provide partner/self-role-play prompts; do not pretend an AI is responding when no service exists.
10. **End-of-Lesson Check:** a small contextual quiz and evidence-based progress: new chunks used, old chunks recalled unaided, speaking seconds, comprehension score, one observed improvement, and tomorrow's small target. Distinguish self-reports, attempts, and measured results; leave unknowns unknown.

In chat, stop at appropriate stages to receive the learner's attempt. In the site, allow browsing the lesson but keep exercise models hidden until an attempt, unless the learner explicitly requests answers. Teach chunk examples openly; they are teaching input, not drill answer keys.

## Reuse and weekly checks

Schedule retrieval around lesson offsets +1, +3, +7, and +14. Use active recall at +1, another context at +3, speaking recall at +7, and conversation reuse at +14. These are curriculum-day offsets, not claims about actual elapsed days. Prioritize struggling chunks and keep the daily workload small; rotate items across sessions rather than testing every due item at once.

Follow the weekly progression: introduce the theme; expand and reuse; listen/read and retell; solve a situation; speak more spontaneously; simulate conversation; review and check.

At the start of each week record a short speaking baseline. Repeat the **same task and duration** at the weekly review, separately from a longer speaking challenge if needed. Compare recorded duration, long pauses, chunks used, chunks recalled unaided, and important errors. If the baseline is absent, record the current result without inventing a comparison.

## Feedback and adaptation

During conversation do not interrupt every minor error. After four to eight exchanges select at most three important corrections, prioritizing blocked meaning, repeated grammar errors, unnatural phrasing, and the current objective. Show **What you said → Better version → Why**, with a short Vietnamese explanation. Then ask for reuse.

If practice is easy, increase only one dimension: duration, listening speed, complexity, fewer prompts, or spontaneous questions. If it is hard, first reduce new vocabulary, shorten input, reuse known chunks, add context, or simplify the speaking task. Base changes on observed attempts. End with an observable small gain, not generic praise.

## Check content before delivery

Verify five target chunks per day, concrete meanings and examples, two or three variations each, delayed drill models, contextual questions, and explicit recycling. Review days should retrieve already introduced language. Confirm claims about progress are supported by learner evidence. For site changes also run the behavioral checks in `../english-tutor/references/web-app.md`.
