import Head from "next/head";

export default function SiteLayout({ title, pageType, children }) {
  const dashboard = pageType === "dashboard";
  const home = dashboard ? "index.html" : "../index.html";
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {pageType !== "lesson" && (
        <a className="skip" href="#main">
          Đến nội dung
        </a>
      )}
      <header>
        <a className="brand" href={home}>
          <b>S:</b> SpeakSprint
        </a>
        {pageType === "lesson" ? (
          <a className="btn" href={home}>
            ← Dashboard
          </a>
        ) : (
          <nav aria-label="Điều hướng">
            {pageType !== "chunks" && (
              <a
                className="btn"
                href={`${dashboard ? "" : "../"}chunks/index.html`}
              >
                2.500 chunks
              </a>
            )}
            {!dashboard && (
              <a className="btn" href={home}>
                Dashboard
              </a>
            )}
            <button id="export-progress">Xuất tiến độ</button>
            <label>
              Nhập tiến độ
              <input id="import-progress" type="file" accept=".json" />
            </label>
            <button id="reset-progress">Đặt lại</button>
          </nav>
        )}
      </header>
      {children}
      <div id="toast" role="status" aria-live="polite" />
    </>
  );
}
