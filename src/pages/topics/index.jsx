import SiteLayout from "../../components/SiteLayout";
export default function Topics() {
  return (
    <SiteLayout title="Chủ đề chuyên sâu — SpeakSprint" pageType="topics">
      <main id="main" className="topic-main">
        <p>Đang tải chủ đề…</p>
        <noscript>Bật JavaScript để học và lưu tiến độ chủ đề.</noscript>
      </main>
      <p className="storage-note">
        Tiến độ được lưu trong trình duyệt này. Xuất JSON để sao lưu hoặc chuyển
        thiết bị.
      </p>
    </SiteLayout>
  );
}
export function getStaticProps() {
  return { props: { pageType: "topics" } };
}
