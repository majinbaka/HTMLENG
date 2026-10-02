import SiteLayout from "../components/SiteLayout";
export default function Dashboard() {
  return (
    <SiteLayout title="SpeakSprint — English for Work" pageType="dashboard">
      <main id="main">
        {"\n"}
        <section className="hero">
          <div>
            <p className="kicker">{"A2 → B1 · DAILY WORK ENGLISH"}</p>
            <h1>
              {"Small steps."}
              <br />
              <em>{"Real English."}</em>
            </h1>
            <p>
              {
                "30 phút/ngày × 6 ngày/tuần. Đọc hoặc nghe → nhớ lại → tự kể → suy nghĩ → kiểm tra và kể lại."
              }
            </p>
            <a
              className="primary"
              id="continue-link"
              href="lessons/day-01.html"
            >
              {"Bắt đầu Day 1 →"}
            </a>
            <small id="availability-message"></small>
          </div>
          <div className="art">
            <i>{"HELLO"}</i>
            <i>{"WORK"}</i>
            <i>{"READY?"}</i>
          </div>
        </section>
        {"\n"}
        <section className="topic-dashboard" aria-labelledby="topic-title">
          <div className="section-head">
            <div>
              <p className="kicker coral">{"DEEP-DIVE TOPICS"}</p>
              <h2 id="topic-title">{"Chủ đề chuyên sâu"}</h2>
            </div>
            <p>
              {
                "Ôn dài hạn theo công việc của bạn: phỏng vấn kỹ thuật và chủ đề Làm việc với daily meeting, dự án, báo cáo, phân công và quản lý. Mỗi chủ đề có tiến độ và lịch ôn riêng."
              }
            </p>
          </div>
          <div id="topic-dashboard"></div>
        </section>
        {"\n"}
        <section className="panel routine-overview">
          <span className="number">{"30 PHÚT · 6 BUỔI / TUẦN"}</span>
          <h2>{"Học để nhớ và dùng được"}</h2>
          <p>{"Input 10′ → Recall 5′ → Retell 5′ → Think 5′ → Review 5′."}</p>
          <p>
            {
              "Chọn 6 ngày học, 1 ngày nghỉ. Trước buổi học mới, dành thêm 3–5 phút kể lại bài hôm trước không nhìn tài liệu. Sau 7 ngày lịch, kể lại cùng chủ đề và so sánh số ý, số chunk còn tự dùng được."
            }
          </p>
          <p>
            {
              "Các bài ôn tuần là thư viện luyện thêm; không cần làm 90 câu trong một buổi 30 phút."
            }
          </p>
          <div id="spaced-reviews"></div>
          <div id="retention-summary"></div>
        </section>
        <section className="stats">
          <article>
            <span>{"Ngày hiện tại"}</span>
            <strong id="current-day">{"01"}</strong>
            <small id="current-total"></small>
          </article>
          <article>
            <span>{"Chuỗi hiện tại"}</span>
            <strong id="current-streak">{"0"}</strong>
            <small>{" ngày"}</small>
          </article>
          <article>
            <span>{"Chuỗi dài nhất"}</span>
            <strong id="longest-streak">{"0"}</strong>
            <small>{" ngày"}</small>
          </article>
          <article>
            <span>{"Đã hoàn thành"}</span>
            <strong id="completed-count">{"0"}</strong>
            <small id="completed-total"></small>
            <div className="bar">
              <i id="progress-fill"></i>
            </div>
          </article>
        </section>
        {"\n"}
        <section
          className="skill-dashboard"
          aria-labelledby="skill-dashboard-title"
        >
          {"\n"}
          <div className="section-head">
            <div>
              <p className="kicker coral">{"SKILL DASHBOARD"}</p>
              <h2 id="skill-dashboard-title">{"Bản đồ kỹ năng"}</h2>
            </div>
            <p>
              {
                "Điểm và kỹ năng được tính từ các bài cùng checkpoint bạn đã hoàn thành."
              }
            </p>
          </div>
          {"\n"}
          <div className="skill-grid">
            {"\n"}
            <article className="score-card">
              <span className="score-label">{"TỔNG ĐIỂM"}</span>
              <strong id="learning-points">{"0"}</strong>
              <small>{"XP tích lũy"}</small>
              <div className="level-track">
                <i id="level-fill"></i>
              </div>
              <p id="level-message"></p>
            </article>
            {"\n"}
            <article className="skill-chart">
              <div
                id="skill-bars"
                className="skill-bars"
                aria-label="Biểu đồ mức độ kỹ năng"
              ></div>
            </article>
            {"\n"}
            <article className="focus-card">
              <span className="score-label">{"KỸ NĂNG CẦN PHẤN ĐẤU"}</span>
              <h3 id="focus-skill">{"Nền tảng công việc"}</h3>
              <p id="focus-message"></p>
              <div className="focus-target">
                <span>{"Mục tiêu kế tiếp"}</span>
                <strong id="focus-target"></strong>
              </div>
              <a id="focus-link" className="primary" href="lessons/day-01.html">
                {"Luyện ngay →"}
              </a>
            </article>
            {"\n"}
          </div>
          {"\n"}
        </section>
        {"\n"}
        <section
          className="weekly-dashboard"
          aria-labelledby="weekly-review-title"
        >
          <div className="section-head">
            <div>
              <p className="kicker coral">{"WEEKLY REVIEW"}</p>
              <h2 id="weekly-review-title">{"Ôn trọn vẹn mỗi tuần"}</h2>
            </div>
            <p>
              {
                "Bài 7, 14, 21 và 28 tổng kết từng nhóm chủ đề; số bài không phải ngày lịch. Luyện nhớ lại, điền từ, biến đổi câu và nói; chia nhỏ bài luyện theo thời gian của bạn."
              }
            </p>
          </div>
          <div id="weekly-review-list" className="weekly-grid"></div>
        </section>
        {"\n"}
        <section>
          <div className="section-head">
            <div>
              <p className="kicker coral">{"YOUR PROGRESS"}</p>
              <h2>{"Tiến độ học"}</h2>
            </div>
            <p>
              {
                "Theo dõi lộ trình theo ngày hoặc tuần. Toàn bộ 28 bài đều mở, kể cả khi chưa hoàn thành bài trước."
              }
            </p>
          </div>
          {"\n"}
          <div className="route-toolbar" aria-label="Bộ lọc lộ trình">
            <label>
              {"Trạng thái"}
              <select id="status-filter">
                <option value="all">{"Tất cả"}</option>
                <option value="completed">{"Đã hoàn thành"}</option>
                <option value="available">{"Sẵn sàng"}</option>
              </select>
            </label>
            <label>
              {"Tuần"}
              <select id="week-filter">
                <option value="all">{"Tất cả các tuần"}</option>
              </select>
            </label>
            <label>
              {"Hiển thị"}
              <select id="page-size">
                <option value="14">{"2 tuần · 14 ngày"}</option>
                <option value="21">{"3 tuần · 21 ngày"}</option>
              </select>
            </label>
            <span id="route-summary" role="status"></span>
          </div>
          {"\n"}
          <div id="progress-list" className="progress-list"></div>
          <nav className="pagination" aria-label="Phân trang lộ trình">
            <button id="previous-page" type="button">
              {"← Trước"}
            </button>
            <span id="page-info"></span>
            <button id="next-page" type="button">
              {"Sau →"}
            </button>
          </nav>
        </section>
        {"\n"}
        <p className="storage-note">
          {
            "Tiến độ nằm trong trình duyệt này. Hãy luôn dùng cùng một địa chỉ local server; trình duyệt, thiết bị hoặc cổng khác có vùng lưu riêng."
          }
        </p>
      </main>
    </SiteLayout>
  );
}
export function getStaticProps() {
  return { props: { pageType: "dashboard" } };
}
