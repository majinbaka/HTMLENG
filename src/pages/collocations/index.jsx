import { useEffect, useMemo, useState } from "react";
import SiteLayout from "../../components/SiteLayout";
import StudySession, { Example } from "../../components/LibraryStudy";
import items from "../../content/collocations/core.json";

const topics = [...new Set(items.map((item) => item.topic))];
const statuses = [
  ["active", "Đang học"],
  ["favorites", "Yêu thích"],
  ["archived", "Đã thuộc"],
  ["all", "Tất cả"],
];
const initialView = {
  query: "",
  level: "all",
  topic: "all",
  status: "active",
  page: 1,
};
const normalize = (text) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d");
const searchIndex = new Map(
  items.map((item) => [
    item.id,
    normalize(
      [
        item.chunk,
        item.explanation,
        item.topic,
        item.pattern,
        ...item.examples,
      ].join(" "),
    ),
  ]),
);
function readView() {
  const params = new URLSearchParams(window.location.search);
  return {
    query: (params.get("q") || "").slice(0, 200),
    level: ["B2", "C1"].includes(params.get("level"))
      ? params.get("level")
      : "all",
    topic: topics.includes(params.get("topic")) ? params.get("topic") : "all",
    status: statuses.some(([status]) => status === params.get("status"))
      ? params.get("status")
      : "active",
    page: Math.max(1, Math.min(3, Math.floor(Number(params.get("page"))) || 1)),
  };
}

export default function Collocations() {
  const [view, setView] = useState(initialView);
  const [progress, setProgress] = useState({ favorites: [], archived: [] });
  const [ready, setReady] = useState(false);
  const [locationReady, setLocationReady] = useState(false);
  const [notice, setNotice] = useState("");
  const [studyItems, setStudyItems] = useState(null);
  useEffect(() => {
    const sync = () => {
      if (!window.SpeakSprintCollocationProgress) return;
      setProgress(window.SpeakSprintCollocationProgress.get());
      setReady(true);
    };
    const navigate = () => {
      setView(readView());
      setStudyItems(null);
    };
    sync();
    navigate();
    setLocationReady(true);
    window.addEventListener("speaksprint:collocations-progress", sync);
    window.addEventListener("popstate", navigate);
    return () => {
      window.removeEventListener("speaksprint:collocations-progress", sync);
      window.removeEventListener("popstate", navigate);
    };
  }, []);
  const favorites = useMemo(
    () => new Set(progress.favorites),
    [progress.favorites],
  );
  const archived = useMemo(
    () => new Set(progress.archived),
    [progress.archived],
  );
  const filtered = useMemo(() => {
    const terms = normalize(view.query.trim()).split(/\s+/).filter(Boolean);
    return items.filter(
      (item) =>
        (view.level === "all" || view.level === item.category) &&
        (view.topic === "all" || view.topic === item.topic) &&
        (view.status !== "active" || !archived.has(item.id)) &&
        (view.status !== "favorites" || favorites.has(item.id)) &&
        (view.status !== "archived" || archived.has(item.id)) &&
        terms.every((term) => searchIndex.get(item.id).includes(term)),
    );
  }, [view, favorites, archived]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / 25));
  const page = Math.min(view.page, pageCount);
  const start = (page - 1) * 25;
  const visible = filtered.slice(start, start + 25);
  useEffect(() => {
    if (!locationReady) return;
    const params = new URLSearchParams();
    if (view.query) params.set("q", view.query);
    for (const key of ["level", "topic", "status"]) {
      if (view[key] !== initialView[key]) params.set(key, view[key]);
    }
    if (page !== 1) params.set("page", page);
    window.history.replaceState(
      window.history.state,
      "",
      `${window.location.pathname}${params.size ? `?${params}` : ""}${window.location.hash}`,
    );
  }, [view, page, locationReady]);
  function filter(patch) {
    setStudyItems(null);
    setView((previous) => ({ ...previous, ...patch, page: 1 }));
  }
  function mark(item, kind) {
    if (window.SpeakSprintCollocationProgress?.toggle(item.id, kind)) {
      setNotice(`Đã lưu đánh dấu: ${item.chunk}`);
    } else
      setNotice(
        "Chưa lưu được đánh dấu. Hãy kiểm tra bộ nhớ trình duyệt rồi thử lại.",
      );
  }
  function pagination() {
    return (
      <nav className="library-pagination" aria-label="Phân trang collocations">
        <button
          type="button"
          disabled={page === 1}
          onClick={() => setView({ ...view, page: page - 1 })}
        >
          ← Trước
        </button>
        <span>
          Trang {page} / {pageCount}
        </span>
        <button
          type="button"
          disabled={page === pageCount}
          onClick={() => setView({ ...view, page: page + 1 })}
        >
          Sau →
        </button>
      </nav>
    );
  }
  return (
    <SiteLayout
      title="Collocations B2 & C1 — SpeakSprint"
      pageType="collocations"
    >
      <main id="main" className="library-main">
        <section className="library-hero">
          <div>
            <p className="kicker">COLLOCATIONS · B2 & C1</p>
            <h1>
              Từ đi cùng từ.
              <br />
              <em>Nói tự nhiên hơn.</em>
            </h1>
            <p>
              Collocation là những từ thường đi cùng nhau:{" "}
              <span lang="en">strong evidence, meet a deadline</span>. Học
              nghĩa, cách kết hợp và dùng trong câu của bạn.
            </p>
          </div>
          <div className="library-hero-note">
            <strong>{items.length}</strong>
            <span>cụm khởi đầu · 180 ví dụ</span>
            <p>30 B2 · 30 C1</p>
            <small>Công việc, lập luận, công nghệ và đời sống.</small>
          </div>
        </section>
        <details className="panel">
          <summary>Cần biết bao nhiêu collocations để đạt B2 hoặc C1?</summary>
          <p>
            CEFR không quy định số collocations bắt buộc. Mục tiêu biên soạn
            tham khảo cho lộ trình này: B2 khoảng 500–1.000 cụm dùng chủ động;
            C1 mở rộng lên khoảng 1.500–2.500 cụm tổng cộng, gồm cả nền tảng B2.
            Đây là đề xuất học tập, không phải số liệu chuẩn hóa hay điều kiện
            đạt trình độ.
          </p>
          <p>
            Thư viện hiện có 60 cụm khởi đầu. Nhãn B2/C1 là mức luyện do biên
            soạn gợi ý, không phải phân loại chính thức của từng cụm. C1 còn cần
            diễn đạt chính xác, linh hoạt và phù hợp sắc thái; chỉ thuộc danh
            sách chưa đủ.
          </p>
          <p>
            <a
              href="https://www.coe.int/en/web/common-european-framework-reference-languages/table-3-cefr-3.3-common-reference-levels-qualitative-aspects-of-spoken-language-use"
              target="_blank"
              rel="noreferrer"
            >
              Tham khảo mô tả năng lực B2/C1 của Council of Europe ↗
            </a>
          </p>
        </details>
        <div className="library-stats" aria-label="Bộ sưu tập của bạn">
          <div>
            <strong>{items.length - archived.size}</strong>
            <span>đang học</span>
          </div>
          <div>
            <strong>{favorites.size}</strong>
            <span>yêu thích</span>
          </div>
          <div>
            <strong>{archived.size}</strong>
            <span>đã thuộc</span>
          </div>
          <p>
            5 cụm mỗi lượt.
            <br />
            Nhớ nghĩa → nói → đối chiếu.
          </p>
        </div>
        <section
          className="library-workspace"
          aria-label="Tra cứu và luyện collocations"
        >
          <div className="library-toolbar">
            <label className="library-search" htmlFor="collocation-search">
              Tìm cụm, nghĩa hoặc ví dụ
              <input
                id="collocation-search"
                type="search"
                maxLength={200}
                placeholder="Ví dụ: evidence, trách nhiệm…"
                value={view.query}
                onChange={(event) => filter({ query: event.target.value })}
              />
            </label>
            <label htmlFor="collocation-level">
              Mức luyện
              <select
                id="collocation-level"
                value={view.level}
                onChange={(event) => filter({ level: event.target.value })}
              >
                <option value="all">B2 và C1</option>
                <option value="B2">B2 · 30 cụm</option>
                <option value="C1">C1 · 30 cụm</option>
              </select>
            </label>
            <label htmlFor="collocation-topic">
              Chủ đề
              <select
                id="collocation-topic"
                value={view.topic}
                onChange={(event) => filter({ topic: event.target.value })}
              >
                <option value="all">Tất cả chủ đề</option>
                {topics.map((topic) => (
                  <option key={topic}>{topic}</option>
                ))}
              </select>
            </label>
          </div>
          <div
            className="library-tabs"
            role="group"
            aria-label="Trạng thái collocations"
          >
            {statuses.map(([status, label]) => (
              <button
                type="button"
                key={status}
                aria-pressed={view.status === status}
                onClick={() => filter({ status })}
              >
                {label}
                <span>
                  {status === "all"
                    ? items.length
                    : status === "favorites"
                      ? favorites.size
                      : status === "archived"
                        ? archived.size
                        : items.length - archived.size}
                </span>
              </button>
            ))}
          </div>
          <div className="library-results-head">
            <p role="status">
              {filtered.length
                ? `${start + 1}–${Math.min(start + 25, filtered.length)} / ${filtered.length} collocations`
                : "Không có collocation phù hợp"}
            </p>
            <button
              type="button"
              className="library-clear"
              onClick={() => {
                setView(initialView);
                setStudyItems(null);
              }}
            >
              Xóa bộ lọc
            </button>
          </div>
          <p className="library-notice" role="status" aria-live="polite">
            {notice ||
              (ready
                ? "Đánh dấu và câu luyện được lưu cùng bản Xuất / Nhập tiến độ."
                : "Đang mở dữ liệu đã lưu…")}
          </p>
          {studyItems ? (
            <StudySession
              key={studyItems[0].id}
              unit="collocation"
              progressApi="SpeakSprintCollocationProgress"
              items={studyItems}
              favorites={favorites}
              archived={archived}
              practice={progress.practice}
              ready={ready}
              mark={mark}
              close={() => setStudyItems(null)}
            />
          ) : (
            <>
              <div className="library-mode-bar">
                <p>Luyện từ bộ lọc hiện tại, bắt đầu ở trang này.</p>
                <button
                  type="button"
                  className="primary"
                  disabled={!ready || !visible.length}
                  onClick={() => setStudyItems(filtered.slice(start))}
                >
                  Luyện 5 collocations →
                </button>
              </div>
              {pagination()}
              <div className="library-grid">
                {visible.map((item) => (
                  <article
                    key={item.id}
                    data-collocation-id={item.id}
                    className={`library-card${archived.has(item.id) ? " is-archived" : ""}`}
                  >
                    <div className="library-card-meta">
                      <span className="library-category">{item.category}</span>
                      <span>{item.topic}</span>
                    </div>
                    <h2 lang="en">{item.chunk}</h2>
                    <p className="library-explanation">{item.explanation}</p>
                    <p className="library-topic" lang="en">
                      {item.pattern}
                    </p>
                    <ol lang="en" aria-label={`3 ví dụ: ${item.chunk}`}>
                      {item.examples.map((example) => (
                        <li key={example}>
                          <Example text={example} chunk={item.chunk} />
                        </li>
                      ))}
                    </ol>
                    <div className="library-card-actions">
                      <button
                        type="button"
                        disabled={!ready}
                        data-action="favorite"
                        aria-pressed={favorites.has(item.id)}
                        onClick={() => mark(item, "favorites")}
                      >
                        {favorites.has(item.id)
                          ? "★ Đã yêu thích"
                          : "☆ Yêu thích"}
                      </button>
                      <button
                        type="button"
                        disabled={!ready}
                        data-action="archive"
                        aria-pressed={archived.has(item.id)}
                        onClick={() => mark(item, "archived")}
                      >
                        {archived.has(item.id) ? "↩ Học lại" : "✓ Đã thuộc"}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
              {!visible.length && (
                <div className="library-empty">
                  <h2>Chưa có cụm trong mục này.</h2>
                  <p>
                    Thử từ khóa khác, đổi bộ lọc hoặc đánh dấu cụm từ danh sách
                    Đang học.
                  </p>
                  <button type="button" onClick={() => setView(initialView)}>
                    Xem các cụm đang học
                  </button>
                </div>
              )}
              {pagination()}
            </>
          )}
        </section>
        <p className="storage-note">
          Đã thuộc là tự đánh giá. Chọn Học lại bất cứ lúc nào. Luyện 5 cụm, đổi
          tình huống và ôn lại sau 1, 3, 7, 14 ngày; trang này chưa tự lên lịch
          ôn. Các ví dụ là tình huống mẫu, không phải thông tin về bạn.
        </p>
        <noscript>Bật JavaScript để lọc, luyện và lưu tiến độ.</noscript>
      </main>
    </SiteLayout>
  );
}
export function getStaticProps() {
  return { props: { pageType: "collocations" } };
}
