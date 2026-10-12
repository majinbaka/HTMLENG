import { useEffect, useRef, useState } from "react";
const categoryNames = {
  IT: "IT",
  Work: "Work",
  Software: "Software",
  Everyday: "Đời sống",
};

export function Example({ text, chunk }) {
  const position = text.toLowerCase().indexOf(chunk.toLowerCase());
  if (position < 0) return text;
  return (
    <>
      {text.slice(0, position)}
      <strong>{text.slice(position, position + chunk.length)}</strong>
      {text.slice(position + chunk.length)}
    </>
  );
}

export default function StudySession({
  items,
  favorites,
  archived,
  practice,
  ready,
  mark,
  close,
  unit = "chunk",
  progressApi = "SpeakSprintChunkProgress",
}) {
  const [offset, setOffset] = useState(0);
  const [index, setIndex] = useState(0);
  const [attempts, setAttempts] = useState(practice || {});
  const [saveError, setSaveError] = useState(false);
  const [revealed, setRevealed] = useState({});
  const group = items.slice(offset, offset + 5);
  const item = group[index];
  const titleRef = useRef(null);
  useEffect(() => {
    titleRef.current?.focus({ preventScroll: true });
  }, [offset, index]);
  return (
    <section className="library-study" aria-label={`Luyện 5 ${unit}`}>
      <div className="library-study-head">
        <div>
          <p className="kicker">NHỚ LẠI → NÓI → ĐỐI CHIẾU</p>
          <h2 ref={titleRef} tabIndex={-1}>
            {unit === "chunk" ? "Chunk" : "Collocation"} {index + 1} /{" "}
            {group.length}
          </h2>
        </div>
        <button type="button" onClick={close}>
          Về danh sách
        </button>
      </div>
      <div className="library-study-steps" aria-label="Tiến độ lượt học">
        {group.map((chunk, i) => (
          <button
            key={chunk.id}
            type="button"
            aria-label={`Luyện ${unit} ${i + 1}`}
            aria-current={index === i ? "step" : undefined}
            onClick={() => setIndex(i)}
          >
            {revealed[chunk.id] ? "✓" : i + 1}
          </button>
        ))}
      </div>
      <article
        className="library-card library-study-card"
        data-study-id={item.id}
      >
        <div className="library-card-meta">
          <span
            className={`library-category category-${item.category.toLowerCase()}`}
          >
            {categoryNames[item.category] || item.category}
          </span>
          <span>{item.topic}</span>
        </div>
        <p className="library-study-prompt">
          Bạn sẽ nói thế nào bằng tiếng Anh?
        </p>
        <p className="library-study-meaning">
          {item.explanation.split(/\. (?:Dùng|Chủ đề:)/)[0]}
        </p>
        <label htmlFor="chunk-attempt">
          Nói thành tiếng, rồi ghi lại câu bạn vừa nói
        </label>
        <textarea
          id="chunk-attempt"
          rows={3}
          lang="en"
          maxLength={1000}
          placeholder="Thử viết một câu của bạn…"
          value={attempts[item.id] || ""}
          onChange={(event) => {
            const answer = event.target.value;
            setAttempts((previous) => ({
              ...previous,
              [item.id]: answer,
            }));
            setSaveError(!window[progressApi]?.savePractice(item.id, answer));
          }}
        />
        <p className="library-notice" role="status">
          {saveError
            ? "Chưa lưu được câu luyện. Giữ trang này mở và thử nhập lại khi bộ nhớ khả dụng."
            : "Câu luyện được tự động lưu trên trình duyệt này."}
        </p>
        {!revealed[item.id] ? (
          <button
            type="button"
            className="primary"
            disabled={!attempts[item.id]?.trim()}
            onClick={() =>
              setRevealed((previous) => ({ ...previous, [item.id]: true }))
            }
          >
            Xem {unit} và 3 ví dụ
          </button>
        ) : (
          <div className="library-study-answer">
            <h3 lang="en">{item.chunk}</h3>
            {item.pattern && (
              <p className="library-topic" lang="en">
                {item.pattern}
              </p>
            )}
            <p>
              Đối chiếu cách nói, rồi nói lại một câu mới. Câu tự nhiên khác
              cũng có thể đúng.
            </p>
            <ol lang="en" aria-label={`3 ví dụ: ${item.chunk}`}>
              {item.examples.map((example, i) => (
                <li key={i}>
                  <Example text={example} chunk={item.chunk} />
                </li>
              ))}
            </ol>
            <div className="library-card-actions">
              <button
                type="button"
                disabled={!ready}
                aria-pressed={favorites.has(item.id)}
                onClick={() => mark(item, "favorites")}
              >
                {favorites.has(item.id) ? "★ Đã yêu thích" : "☆ Yêu thích"}
              </button>
              <button
                type="button"
                disabled={!ready}
                aria-pressed={archived.has(item.id)}
                onClick={() => mark(item, "archived")}
              >
                {archived.has(item.id) ? "↩ Học lại" : "✓ Đã thuộc"}
              </button>
            </div>
          </div>
        )}
      </article>
      <nav className="library-study-nav" aria-label="Chuyển chunk luyện tập">
        <button
          type="button"
          disabled={index === 0}
          onClick={() => setIndex(index - 1)}
        >
          ← Trước
        </button>
        {index < group.length - 1 ? (
          <button type="button" onClick={() => setIndex(index + 1)}>
            {unit === "chunk" ? "Chunk" : "Collocation"} tiếp →
          </button>
        ) : offset + group.length < items.length ? (
          <button
            type="button"
            onClick={() => {
              setOffset(offset + group.length);
              setIndex(0);
            }}
          >
            Học 5 tiếp →
          </button>
        ) : (
          <button type="button" onClick={close}>
            Kết thúc lượt học
          </button>
        )}
      </nav>
      <p className="storage-note">
        Câu luyện, Yêu thích và Đã thuộc được lưu cùng tiến độ. ✓ ở thanh trên
        chỉ nghĩa là đã xem ví dụ trong lượt này, không phải điểm chấm.
      </p>
    </section>
  );
}
