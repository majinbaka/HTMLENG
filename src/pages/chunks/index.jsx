import { useEffect, useMemo, useRef, useState } from "react";
import SiteLayout from "../../components/SiteLayout";
import it from "../../content/chunks/it.json";
import work from "../../content/chunks/work.json";
import software from "../../content/chunks/software.json";

const categories = ["IT", "Work", "Software", "Everyday"];
const categoryNames = {
  IT: "IT",
  Work: "Work",
  Software: "Software",
  Everyday: "Đời sống",
};
const frequencyNames = {
  5: "Rất thường gặp",
  4: "Thường gặp",
  3: "Khá thường gặp",
  2: "Theo tình huống",
  1: "Chuyên biệt",
};
const chunks = [...it, ...work, ...software].sort(
  (a, b) => b.frequency - a.frequency || a.id.localeCompare(b.id),
);
const normalize = (text) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[’‘]/g, "'");
const searchIndex = new Map(
  chunks.map((item) => [
    item.id,
    normalize(
      [item.chunk, item.explanation, item.topic, ...item.examples].join(" "),
    ),
  ]),
);
const initialView = {
  query: "",
  category: "all",
  status: "active",
  size: 25,
  page: 1,
};
const statuses = [
  ["active", "Đang học"],
  ["favorites", "Yêu thích"],
  ["archived", "Đã thuộc"],
  ["all", "Tất cả"],
];

function readView() {
  const params = new URLSearchParams(window.location.search);
  return {
    query: (params.get("q") || "").slice(0, 200),
    category: categories.includes(params.get("category"))
      ? params.get("category")
      : "all",
    status: statuses.some(([value]) => value === params.get("status"))
      ? params.get("status")
      : "active",
    size: [25, 50, 100].includes(Number(params.get("size")))
      ? Number(params.get("size"))
      : 25,
    page: Math.max(
      1,
      Math.min(2500, Math.floor(Number(params.get("page"))) || 1),
    ),
  };
}

function Example({ text, chunk }) {
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

export default function ChunkLibrary() {
  const [view, setView] = useState(initialView);
  const [progress, setProgress] = useState({ favorites: [], archived: [] });
  const [ready, setReady] = useState(false);
  const [locationReady, setLocationReady] = useState(false);
  const [notice, setNotice] = useState("");
  const resultsRef = useRef(null);

  useEffect(() => {
    const sync = () => {
      if (!window.SpeakSprintChunkProgress) return;
      setProgress(window.SpeakSprintChunkProgress.get());
      setReady(true);
    };
    const navigate = () => setView(readView());
    sync();
    navigate();
    setLocationReady(true);
    window.addEventListener("speaksprint:chunks-progress", sync);
    window.addEventListener("popstate", navigate);
    return () => {
      window.removeEventListener("speaksprint:chunks-progress", sync);
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
    return chunks.filter(
      (item) =>
        (view.category === "all" || item.category === view.category) &&
        (view.status !== "active" || !archived.has(item.id)) &&
        (view.status !== "favorites" || favorites.has(item.id)) &&
        (view.status !== "archived" || archived.has(item.id)) &&
        terms.every((term) => searchIndex.get(item.id).includes(term)),
    );
  }, [view.query, view.category, view.status, favorites, archived]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / view.size));
  const currentPage = Math.min(view.page, pageCount);
  const start = (currentPage - 1) * view.size;
  const visible = filtered.slice(start, start + view.size);
  const pageNumbers = [
    ...new Set([
      1,
      ...Array.from({ length: 5 }, (_, i) => currentPage - 2 + i),
      pageCount,
    ]),
  ]
    .filter((n) => n > 0 && n <= pageCount)
    .sort((a, b) => a - b);

  useEffect(() => {
    if (!locationReady || !ready) return;
    const params = new URLSearchParams();
    if (view.query) params.set("q", view.query);
    if (view.category !== "all") params.set("category", view.category);
    if (view.status !== "active") params.set("status", view.status);
    if (view.size !== 25) params.set("size", view.size);
    if (currentPage !== 1) params.set("page", currentPage);
    const query = params.toString();
    window.history.replaceState(
      window.history.state,
      "",
      `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`,
    );
  }, [view, currentPage, locationReady, ready]);

  function filter(patch) {
    setView((previous) => ({ ...previous, ...patch, page: 1 }));
  }
  function changePage(page) {
    setView((previous) => ({ ...previous, page }));
    resultsRef.current?.focus({ preventScroll: true });
    resultsRef.current?.scrollIntoView({ block: "start" });
  }
  function mark(item, kind) {
    const selected = (kind === "favorites" ? favorites : archived).has(item.id);
    if (window.SpeakSprintChunkProgress?.toggle(item.id, kind)) {
      setView((previous) => ({ ...previous, page: currentPage }));
      setNotice(
        kind === "favorites"
          ? `${selected ? "Đã bỏ yêu thích" : "Đã thêm yêu thích"}: ${item.chunk}`
          : `${selected ? "Đã đưa lại vào danh sách học" : "Đã lưu vào mục Đã thuộc"}: ${item.chunk}`,
      );
    } else
      setNotice(
        "Chưa lưu được đánh dấu. Hãy kiểm tra bộ nhớ trình duyệt rồi thử lại.",
      );
  }

  function pagination(position) {
    return (
      <nav className="library-pagination" aria-label={`Phân trang ${position}`}>
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => changePage(currentPage - 1)}
        >
          ← Trước
        </button>
        <div className="library-page-numbers">
          {pageNumbers.map((page, index) => (
            <span key={page}>
              {index > 0 && page - pageNumbers[index - 1] > 1 && (
                <span className="page-gap" aria-hidden="true">
                  …
                </span>
              )}
              <button
                type="button"
                aria-label={`Trang ${page}`}
                aria-current={page === currentPage ? "page" : undefined}
                onClick={() => changePage(page)}
              >
                {page}
              </button>
            </span>
          ))}
        </div>
        <span className="library-mobile-page">
          {currentPage} / {pageCount}
        </span>
        <button
          type="button"
          disabled={currentPage === pageCount}
          onClick={() => changePage(currentPage + 1)}
        >
          Sau →
        </button>
      </nav>
    );
  }

  return (
    <SiteLayout title="2.500 English chunks — SpeakSprint" pageType="chunks">
      <main id="main" className="library-main">
        <section className="library-hero">
          <div>
            <p className="kicker">ENGLISH, ONE CHUNK AT A TIME</p>
            <h1>
              Nhớ một cụm.
              <br />
              <em>Dùng cả câu.</em>
            </h1>
            <p>
              2.500 chunk cho công việc và đời sống. Hiểu nghĩa, đọc 3 ví dụ,
              rồi nói một câu của riêng bạn.
            </p>
          </div>
          <div className="library-hero-note">
            <strong>2.500</strong>
            <span>chunks · 7.500 ví dụ</span>
            <p>Thường dùng nhất → Chuyên biệt</p>
            <small>Công việc, IT, phần mềm và đời sống.</small>
          </div>
        </section>
        <div className="library-stats" aria-label="Bộ sưu tập của bạn">
          <div>
            <strong>{chunks.length - archived.size}</strong>
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
            Mỗi lần chọn 5 chunk.
            <br />
            Nói lại mà không nhìn ví dụ.
          </p>
        </div>
        <section
          className="library-workspace"
          aria-label="Tra cứu và luyện chunk"
        >
          <div className="library-toolbar">
            <label className="library-search" htmlFor="chunk-search">
              Tìm chunk, nghĩa hoặc ví dụ
              <input
                id="chunk-search"
                type="search"
                placeholder="Ví dụ: check, cuộc họp, cảm ơn…"
                maxLength={200}
                value={view.query}
                onChange={(event) => filter({ query: event.target.value })}
              />
            </label>
            <label htmlFor="chunk-category">
              Nhóm
              <select
                id="chunk-category"
                value={view.category}
                onChange={(event) => filter({ category: event.target.value })}
              >
                <option value="all">Tất cả nhóm</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {categoryNames[category]} ·{" "}
                    {chunks.filter((item) => item.category === category).length}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="chunk-page-size">
              Mỗi trang
              <select
                id="chunk-page-size"
                value={view.size}
                onChange={(event) =>
                  filter({ size: Number(event.target.value) })
                }
              >
                {[25, 50, 100].map((size) => (
                  <option key={size} value={size}>
                    {size} chunks
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div
            className="library-tabs"
            role="group"
            aria-label="Trạng thái chunk"
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
                    ? chunks.length
                    : status === "favorites"
                      ? favorites.size
                      : status === "archived"
                        ? archived.size
                        : chunks.length - archived.size}
                </span>
              </button>
            ))}
          </div>
          <p className="library-order-note">
            Sắp xếp mức thường dùng từ cao xuống thấp trên toàn bộ thư viện, kể
            cả khi lọc theo nhóm. Mức 1–5 là ước lượng biên soạn theo tình huống
            sử dụng, không phải tần suất đo từ kho ngữ liệu. Các chunk cùng mức
            được sắp theo mã cố định.
          </p>
          <div className="library-results-head" ref={resultsRef} tabIndex={-1}>
            <p id="chunk-results-count" role="status">
              {filtered.length
                ? `${start + 1}–${Math.min(start + view.size, filtered.length)} / ${filtered.length} chunks`
                : "Không có chunk phù hợp"}
              <span>
                Trang {currentPage} / {pageCount}
              </span>
            </p>
            <button
              type="button"
              className="library-clear"
              onClick={() => setView(initialView)}
            >
              Xóa bộ lọc
            </button>
          </div>
          <p className="library-notice" role="status" aria-live="polite">
            {notice ||
              (ready
                ? "Đánh dấu được tự động lưu trên trình duyệt này."
                : "Đang mở dữ liệu đã lưu…")}
          </p>
          {pagination("trên")}
          <div className="library-grid">
            {visible.map((item, index) => (
              <article
                className={`library-card${archived.has(item.id) ? " is-archived" : ""}`}
                key={item.id}
                data-chunk-id={item.id}
                data-category={item.category}
                data-frequency={item.frequency}
              >
                <div className="library-card-meta">
                  <span
                    className={`library-category category-${item.category.toLowerCase()}`}
                  >
                    {categoryNames[item.category]}
                  </span>
                  <span title={`Mức ${item.frequency}/5 — ước lượng`}>
                    {frequencyNames[item.frequency]}
                  </span>
                  <span className="library-number">
                    {String(start + index + 1).padStart(3, "0")}
                  </span>
                </div>
                <h2 lang="en">{item.chunk}</h2>
                <p className="library-explanation">{item.explanation}</p>
                <p className="library-topic">{item.topic}</p>
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
                    data-action="favorite"
                    aria-pressed={favorites.has(item.id)}
                    aria-label={`${favorites.has(item.id) ? "Bỏ yêu thích" : "Yêu thích"}: ${item.chunk}`}
                    onClick={() => mark(item, "favorites")}
                  >
                    <span aria-hidden="true">
                      {favorites.has(item.id) ? "★" : "☆"}
                    </span>{" "}
                    {favorites.has(item.id) ? "Đã yêu thích" : "Yêu thích"}
                  </button>
                  <button
                    type="button"
                    disabled={!ready}
                    data-action="archive"
                    aria-pressed={archived.has(item.id)}
                    aria-label={`${archived.has(item.id) ? "Học lại" : "Đã thuộc"}: ${item.chunk}`}
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
              <h2>
                {view.status === "favorites"
                  ? "Dành chỗ cho cách nói bạn thích."
                  : view.status === "archived"
                    ? "Những chunk đã thuộc sẽ ở đây."
                    : "Thử một từ khóa khác nhé."}
              </h2>
              <p>
                {view.status === "favorites"
                  ? "Bấm ☆ Yêu thích ở một chunk để lưu vào bộ sưu tập."
                  : view.status === "archived"
                    ? "Bấm ✓ Đã thuộc sau khi bạn có thể tự dùng chunk. Bạn luôn có thể chọn Học lại."
                    : "Đổi nhóm hoặc xóa bộ lọc để xem thêm chunk."}
              </p>
              <button type="button" onClick={() => setView(initialView)}>
                Xem các chunk đang học
              </button>
            </div>
          )}
          {pagination("dưới")}
        </section>
        <p className="storage-note">
          Favorite và Archive (Đã thuộc) lưu trên trình duyệt này, cùng bản Xuất
          / Nhập tiến độ. Đã thuộc là tự đánh giá; chọn Học lại bất cứ lúc nào.
          Các ví dụ là tình huống luyện ngôn ngữ.
        </p>
        <noscript>
          Bật JavaScript để tìm kiếm, chuyển trang và lưu yêu thích / đã thuộc.
        </noscript>
      </main>
    </SiteLayout>
  );
}

export function getStaticProps() {
  return { props: { pageType: "chunks" } };
}
