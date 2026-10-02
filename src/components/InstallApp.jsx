import { useEffect, useRef, useState } from "react";

export default function InstallApp({ prefix }) {
  const prompt = useRef(null);
  const dialog = useRef(null);
  const [installed, setInstalled] = useState(false);
  const [busy, setBusy] = useState(false);
  const [ios, setIos] = useState(false);

  useEffect(() => {
    const standalone = window.matchMedia("(display-mode: standalone)");
    const sync = () =>
      setInstalled(standalone.matches || !!navigator.standalone);
    sync();
    setIos(
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1),
    );
    const available = (event) => {
      event.preventDefault();
      prompt.current = event;
    };
    const done = () => {
      prompt.current = null;
      setInstalled(true);
      dialog.current?.close();
    };
    window.addEventListener("beforeinstallprompt", available);
    window.addEventListener("appinstalled", done);
    standalone.addEventListener("change", sync);
    if (
      process.env.NODE_ENV === "production" &&
      window.isSecureContext &&
      "serviceWorker" in navigator
    ) {
      navigator.serviceWorker
        .register(new URL(`${prefix}sw.js`, window.location.href), {
          updateViaCache: "none",
        })
        .catch((error) =>
          console.warn("SpeakSprint offline chưa sẵn sàng:", error),
        );
    }
    return () => {
      window.removeEventListener("beforeinstallprompt", available);
      window.removeEventListener("appinstalled", done);
      standalone.removeEventListener("change", sync);
    };
  }, [prefix]);

  async function install() {
    if (!prompt.current) {
      dialog.current?.showModal();
      return;
    }
    const event = prompt.current;
    prompt.current = null;
    setBusy(true);
    try {
      await event.prompt();
      const choice = await event.userChoice;
      if (choice.outcome === "accepted") setInstalled(true);
    } catch {
      dialog.current?.showModal();
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {!installed && (
        <aside className="install-app" aria-label="Cài SpeakSprint">
          <span>Học nhanh từ màn hình chính</span>
          <button type="button" onClick={install} disabled={busy}>
            Cài ứng dụng
          </button>
        </aside>
      )}
      <dialog
        ref={dialog}
        className="install-dialog"
        aria-labelledby="install-title"
      >
        <h2 id="install-title">Cài SpeakSprint</h2>
        {ios ? (
          <p>
            Mở trang bằng Safari, chọn Chia sẻ → Thêm vào Màn hình chính → Thêm.
          </p>
        ) : (
          <p>
            Trong menu trình duyệt, chọn “Cài SpeakSprint”, “Cài ứng dụng” hoặc
            “Thêm vào màn hình chính”. Nếu chưa thấy, hãy thử mở bằng Chrome
            hoặc Edge.
          </p>
        )}
        <p>
          Sau khi tải xong lần đầu, bạn có thể mở bài học khi mất mạng. Tiến độ
          được lưu trên trình duyệt và thiết bị này.
        </p>
        <form method="dialog">
          <button>Đóng</button>
        </form>
      </dialog>
    </>
  );
}
