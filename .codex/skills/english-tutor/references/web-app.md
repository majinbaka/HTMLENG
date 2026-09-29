# SpeakSprint repository invariants

Maintain the existing clean, responsive, accessible site using its current plain HTML, CSS, and JavaScript architecture unless the learner explicitly requests another stack. It must continue to work through `start-server.sh` and must not acquire a database or account dependency by accident.

## Required structure

The repository already uses this structure; edit it in place:

```text
index.html
assets/
  styles.css
  app.js
lessons/
  day-01.html
  day-02.html
  ...
  day-28.html
```

`index.html` is the dashboard. Each `lessons/day-NN.html` is a real standalone lesson page with a stable URL, title, day number, estimated duration, learning goal, activities, completion state, and navigation back to the dashboard.

`assets/app.js` owns progression and persistence. Lesson pages declare their day number through their existing page attributes; do not maintain separate conflicting unlock logic on each page. Preserve the current HTML patterns when adding or revising lesson content.

## Dashboard

Show at minimum:

- current available day and a prominent Continue button;
- current streak and longest streak;
- completed count out of 28 and a progress bar;
- four week groups with every lesson listed;
- clear visual states for completed, available, in progress, and locked lessons;
- completed lessons as active review links;
- locked lessons as non-navigable controls with an explanation of when they unlock.

Do not hide old lessons after completion. Label review visits so they cannot accidentally alter the historical completion date or streak.

## Sequential and daily locking

The initial state unlocks Day 1 only.

A learner may open a day when either:

- it is already completed, in which case it opens in review mode; or
- it equals the next sequential day and no new day has already been completed on the learner's current local calendar date.

Thus the learner can complete at most one new curriculum day per local calendar day. Replaying completed days is always allowed and does not increase the streak or unlock another lesson. A future direct URL must show a locked message and link back to `index.html`; it must not reveal lesson content.

Completing Day N unlocks Day N+1 only when the local date has changed after that completion. The dashboard should say when the next lesson becomes available. Day 28 completion ends the curriculum without inventing Day 29.

Use local calendar dates in `YYYY-MM-DD` form. A streak is based on distinct dates on which a new lesson was completed:

- completion today after completion yesterday increments the current streak;
- another completion on the same date is impossible and replay never changes the streak;
- after one or more missed local dates, the next new completion resets the current streak to 1;
- longest streak is the maximum observed current streak;
- changing the device clock is outside the guarantee of a purely local static app; do not add invasive anti-cheat behavior.

## Completion checkpoints

Do not use a single unchecked "Complete" button. A day becomes complete only after the learner:

1. submits the comprehension activity;
2. records completion of the shadowing/speaking challenge and provides a short typed response where practical;
3. submits the mini-quiz.

Save partial work so the learner can resume. Answers and feedback stay associated with the day. Provide hints before solutions; do not expose answer keys in page source as obvious rendered text. Client-side hiding is a learning aid, not secure assessment.

## Persistence schema

Use one versioned `localStorage` record, for example key `englishTutorProgressV1`, with the conceptual fields below. Exact code shape may vary, but preserve their meaning.

```json
{
  "version": 1,
  "completedDays": {"1": "2026-09-24"},
  "dayState": {
    "1": {
      "status": "completed",
      "answers": {},
      "checkpoints": {
        "comprehension": true,
        "speaking": true,
        "quiz": true
      },
      "resumeSection": null
    }
  },
  "currentStreak": 1,
  "longestStreak": 1,
  "lastNewDayCompletedDate": "2026-09-24",
  "updatedAt": "2026-09-24T12:00:00.000Z"
}
```

Validate parsed data and recover safely from missing or malformed storage. Never silently erase valid progress. Provide explicit Export progress and Import progress controls using JSON, plus a clearly confirmed Reset progress action. Recalculate derived values such as completed count and next sequential day instead of trusting duplicated cached fields.

Because `localStorage` is tied to the browser and origin, explain that progress can differ between `file://`, different local-server ports, browsers, or devices. Prefer running the site from the same local server URL each time.

## Lesson page content

Each day should support about 30–40 minutes and include:

- a brief retrieval warm-up when prior lessons exist;
- a short original reading or a verified listening/video resource;
- five useful chunks in context;
- comprehension questions;
- a short shadowing script;
- a speaking challenge with a typed response field;
- a mini-quiz;
- contextual hints and feedback after submission.

The expanded lessons also contain two variations per chunk, five or six rapid recall prompts, spaced warm-up recall, partner conversation prompts, and a self-reported daily summary. Chunk cards show meanings, usage, patterns, and examples. Recall models require a nonempty attempt before display; accept alternative natural responses rather than grading them by exact text. These extra practice fields use `data-save` and the shared persistence handler.

Lesson content revision 2 uses `v2-comp*` and `v2-quiz*` answer keys so old responses cannot accidentally answer new questions. Keep previous answers and history. For an unfinished legacy lesson, archive its previous checkpoints before requiring the revised comprehension and quiz; keep its speaking checkpoint. Completed days retain their completion dates and review access. `assessmentV2` records submitted scores; chunk-use checks and speaking measurements are explicitly self-reported. Missing measurements must remain unknown, not zero.

Use the current week's curriculum topic. Keep most language understandable at A2 while adding a small B1 stretch. When external material is used, provide a resilient text-based fallback so the lesson is still usable offline or if the link disappears.

## Quality checks

Before delivery:

- verify that `index.html` and all generated day links resolve;
- verify Day 1 is available on fresh state and future direct URLs remain locked;
- verify partial answers survive reload;
- verify completion requires every checkpoint;
- verify exactly the next day is gated until a different local date;
- verify completed days reopen in review mode without affecting streak;
- verify import rejects malformed or incompatible data without destroying current progress;
- inspect the dashboard and at least one lesson at mobile and desktop widths when browser tooling is available.
