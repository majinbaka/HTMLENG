import { useEffect, useMemo, useState } from "react";
import SiteLayout from "../../components/SiteLayout";

const topics = {
  all: "Tất cả",
  software: "Software engineering",
  workplace: "Công việc",
  "daily-life": "Cuộc sống",
};
const types = {
  "multiple-choice": "Choose one answer",
  "true-false-not-given": "True / False / Not Given",
  "short-answer": "Short answer",
  matching: "Matching",
};
const normalize = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[.,!?;:]/g, "")
    .replace(/\s+/g, " ");
const correct = (question, value) =>
  normalize(question.answer) === normalize(value);
const words = (lesson) =>
  lesson.paragraphs.reduce(
    (sum, paragraph) => sum + paragraph.text.trim().split(/\s+/).length,
    0,
  );

export default function Reading({ readings }) {
  const [topic, setTopic] = useState("all");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(readings[0]?.id);
  const [progress, setProgress] = useState({});
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    const sync = () => {
      if (!window.SpeakSprintReadingProgress) return;
      setProgress(window.SpeakSprintReadingProgress.get());
      setReady(true);
    };
    const navigate = () => {
      const id = new URLSearchParams(window.location.search).get("lesson");
      if (readings.some((lesson) => lesson.id === id)) setSelectedId(id);
    };
    sync();
    navigate();
    window.addEventListener("speaksprint:reading-progress", sync);
    window.addEventListener("popstate", navigate);
    return () => {
      window.removeEventListener("speaksprint:reading-progress", sync);
      window.removeEventListener("popstate", navigate);
    };
  }, [readings]);
  const lesson = readings.find((item) => item.id === selectedId) || readings[0];
  const filtered = useMemo(
    () =>
      readings.filter(
        (item) =>
          (topic === "all" || item.topic === topic) &&
          normalize(`${item.title} ${item.summary}`).includes(normalize(query)),
      ),
    [readings, topic, query],
  );
  const state = progress[lesson?.id] || {};
  const answers = state.answers || {};
  const answered =
    lesson?.questions.filter((question) => answers[question.id]?.trim())
      .length || 0;
  const completed = readings.filter(
    (item) => progress[item.id]?.submitted,
  ).length;
  const score =
    lesson?.questions.filter((question) =>
      correct(question, answers[question.id]),
    ).length || 0;
  function select(id) {
    setSelectedId(id);
    setNotice("");
    const params = new URLSearchParams(window.location.search);
    params.set("lesson", id);
    window.history.replaceState(
      window.history.state,
      "",
      `${window.location.pathname}?${params}`,
    );
  }
  function save(patch) {
    if (window.SpeakSprintReadingProgress?.update(lesson.id, patch))
      return true;
    setNotice("Chưa lưu được. Kiểm tra bộ nhớ trình duyệt rồi thử lại.");
    return false;
  }
  function submit(event) {
    event.preventDefault();
    if (answered !== lesson.questions.length) {
      setNotice("Hãy trả lời tất cả câu hỏi trước khi nộp bài.");
      return;
    }
    if (
      save({ answers, submitted: true, completedAt: new Date().toISOString() })
    )
      setNotice(
        "Đã lưu bài làm. Đọc giải thích và tìm lại bằng chứng trong bài.",
      );
  }
  if (!lesson)
    return (
      <SiteLayout title="Reading — SpeakSprint" pageType="reading">
        <main id="main">
          <h1>Reading thực dụng</h1>
          <p>Thư viện đang được chuẩn bị.</p>
        </main>
      </SiteLayout>
    );
  return (
    <SiteLayout title="Reading thực dụng — SpeakSprint" pageType="reading">
      <main id="main" className="library-main reading-main">
        <section className="library-hero reading-hero">
          <div>
            <p className="kicker">PRACTICAL READING · B1 → B2</p>
            <h1>
              Read the context.
              <br />
              <em>Understand the world.</em>
            </h1>
            <p>
              Luyện đọc dài với tình huống kỹ thuật, công việc và đời sống. Trả
              lời bằng tiếng Anh, rồi đối chiếu lý do và bằng chứng.
            </p>
          </div>
          <div className="library-hero-note">
            <strong>{readings.length}</strong>
            <span>bài hiện có · mục tiêu 300</span>
            <p>{completed} bài đã nộp</p>
            <small>Đọc theo nhịp của bạn. Mọi bài đều mở.</small>
          </div>
        </section>
        <div className="reading-overview">
          <p>
            <strong>
              {completed} / {readings.length}
            </strong>{" "}
            bài đã luyện
          </p>
          <p>
            Dạng bài lấy cảm hứng từ IELTS · Nội dung tự biên soạn cho tiếng Anh
            thực dụng
          </p>
        </div>
        <section className="reading-bank" aria-label="Chọn bài đọc">
          <div className="reading-bank-top">
            <h2>Chọn tình huống bạn muốn hiểu</h2>
            <label htmlFor="reading-search">
              Tìm bài
              <input
                id="reading-search"
                type="search"
                placeholder="deployment, cuộc họp…"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
          </div>
          <div
            className="reading-filters"
            role="group"
            aria-label="Chủ đề bài đọc"
          >
            {Object.entries(topics).map(([key, label]) => (
              <button
                type="button"
                key={key}
                aria-pressed={topic === key}
                onClick={() => setTopic(key)}
              >
                {label}
                <span>
                  {
                    readings.filter(
                      (item) => key === "all" || item.topic === key,
                    ).length
                  }
                </span>
              </button>
            ))}
          </div>
          <label className="reading-picker" htmlFor="reading-picker">
            Bài trong chủ đề · {filtered.length} kết quả
            <select
              id="reading-picker"
              value={
                filtered.some((item) => item.id === lesson.id) ? lesson.id : ""
              }
              onChange={(event) => select(event.target.value)}
            >
              <option value="" disabled>
                Chọn một bài đọc
              </option>
              {filtered.map((item) => (
                <option key={item.id} value={item.id}>
                  {progress[item.id]?.submitted ? "✓ " : ""}
                  {item.title} · {item.level} · {words(item)} từ
                </option>
              ))}
            </select>
          </label>
          {!filtered.length && (
            <p role="status">
              Chưa có bài phù hợp. Thử từ khóa hoặc chủ đề khác.
            </p>
          )}
        </section>
        <section className="reading-heading" aria-labelledby="reading-title">
          <p className="kicker coral">
            {topics[lesson.topic]} · {lesson.level}
          </p>
          <h2 id="reading-title" lang="en">
            {lesson.title}
          </h2>
          <p>{lesson.summary}</p>
          <div className="reading-meta">
            <span>{words(lesson)} từ</span>
            <span>{lesson.minutes} phút</span>
            <span>{lesson.questions.length} câu hỏi</span>
            <span>
              {state.submitted
                ? "✓ Đã nộp · có thể ôn lại"
                : answered
                  ? "Đang làm · tự động lưu"
                  : "Sẵn sàng"}
            </span>
          </div>
        </section>
        <div className="reading-workspace" key={lesson.id}>
          <article className="reading-passage" aria-label="Bài đọc tiếng Anh">
            <div className="reading-section-title">
              <span className="number">01 / READ</span>
              <p>Đọc lướt để hiểu ý chính, rồi tìm chi tiết.</p>
            </div>
            <div lang="en">
              {lesson.paragraphs.map((paragraph) => (
                <div
                  className="reading-paragraph"
                  key={paragraph.label}
                  id={`paragraph-${paragraph.label}`}
                >
                  <span className="reading-paragraph-label">
                    {paragraph.label}
                  </span>
                  <p>{paragraph.text}</p>
                </div>
              ))}
            </div>
            <details className="reading-vocabulary">
              <summary>Từ vựng hỗ trợ · {lesson.vocabulary.length} cụm</summary>
              <dl>
                {lesson.vocabulary.map((item) => (
                  <div key={item.term}>
                    <dt lang="en">{item.term}</dt>
                    <dd>{item.meaning}</dd>
                  </div>
                ))}
              </dl>
            </details>
          </article>
          <form
            className="reading-questions"
            onSubmit={submit}
            aria-label="Câu hỏi đọc hiểu"
          >
            <div className="reading-section-title">
              <span className="number">02 / UNDERSTAND</span>
              <p>
                {state.submitted
                  ? `Kết quả: ${score} / ${lesson.questions.length} câu đúng`
                  : `${answered} / ${lesson.questions.length} câu đã trả lời`}
              </p>
            </div>
            <p className="reading-instructions">
              Chỉ dùng thông tin trong bài. Với Not Given, bài không cung cấp đủ
              thông tin để kết luận. Short answer: sao chép từ phù hợp theo giới
              hạn đề bài.
            </p>
            {lesson.questions.map((question, index) => {
              const options = question.options;
              const isCorrect = correct(question, answers[question.id]);
              return (
                <fieldset
                  className={`reading-question${state.submitted ? (isCorrect ? " is-correct" : " is-incorrect") : ""}`}
                  key={question.id}
                  data-question-id={question.id}
                >
                  <legend>
                    <span>
                      {String(index + 1).padStart(2, "0")} ·{" "}
                      {types[question.type]}
                    </span>
                    <strong lang="en">{question.prompt}</strong>
                  </legend>
                  {options?.length ? (
                    options.map((option) => (
                      <label className="reading-option" key={option}>
                        <input
                          type="radio"
                          name={question.id}
                          value={option}
                          checked={answers[question.id] === option}
                          disabled={!ready || state.submitted}
                          onChange={() =>
                            save({
                              answers: { ...answers, [question.id]: option },
                              submitted: false,
                            })
                          }
                        />
                        <span lang="en">{option}</span>
                      </label>
                    ))
                  ) : (
                    <label className="reading-short-answer">
                      Câu trả lời
                      <input
                        type="text"
                        maxLength={150}
                        value={answers[question.id] || ""}
                        disabled={!ready || state.submitted}
                        onChange={(event) =>
                          save({
                            answers: {
                              ...answers,
                              [question.id]: event.target.value,
                            },
                            submitted: false,
                          })
                        }
                        autoComplete="off"
                      />
                    </label>
                  )}
                  {state.submitted && (
                    <div className="reading-feedback" data-feedback>
                      <p>
                        <strong>
                          {isCorrect ? "✓ Đúng" : "↗ Cần xem lại"}
                        </strong>{" "}
                        · Đáp án: <span lang="en">{question.answer}</span>
                      </p>
                      <p>{question.explanation}</p>
                      <blockquote lang="en">{question.evidence}</blockquote>
                    </div>
                  )}
                </fieldset>
              );
            })}
            <p className="reading-notice" role="status" aria-live="polite">
              {notice ||
                (ready
                  ? "Bài làm được lưu trong trình duyệt, cùng bản Xuất / Nhập tiến độ."
                  : "Đang mở tiến độ đã lưu…")}
            </p>
            <div className="reading-submit">
              {state.submitted ? (
                <button
                  type="button"
                  disabled={!ready}
                  onClick={() => {
                    if (
                      window.confirm(
                        "Làm lại bài này? Câu trả lời và kết quả hiện tại của bài sẽ được đặt lại.",
                      )
                    ) {
                      save({
                        answers: {},
                        submitted: false,
                        completedAt: undefined,
                      });
                      setNotice("");
                    }
                  }}
                >
                  Làm lại bài này
                </button>
              ) : (
                <button
                  className="primary"
                  type="submit"
                  disabled={!ready || answered !== lesson.questions.length}
                >
                  Nộp bài & xem giải thích →
                </button>
              )}
            </div>
          </form>
        </div>
        <p className="storage-note">
          Tiến độ được lưu trên trình duyệt và địa chỉ này. Xuất tiến độ để sao
          lưu hoặc chuyển thiết bị. Nhãn B1/B2 là mức luyện gợi ý; đây là bài
          thực hành tự biên soạn.
        </p>
      </main>
    </SiteLayout>
  );
}

export async function getStaticProps() {
  const fs = await import("node:fs/promises");
  const path = await import("node:path");
  const directory = path.join(process.cwd(), "src/content/readings");
  const files = (await fs.readdir(directory))
    .filter((file) => file.endsWith(".json"))
    .sort();
  const readings = (
    await Promise.all(
      files.map(async (file) =>
        JSON.parse(await fs.readFile(path.join(directory, file), "utf8")),
      ),
    )
  )
    .flat()
    .sort((a, b) => a.id.localeCompare(b.id));
  return { props: { readings, pageType: "reading" } };
}
