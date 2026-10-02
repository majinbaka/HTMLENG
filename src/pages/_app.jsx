import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

// Keep the proven storage/recording engine isolated from React rendering.
// All page links use document navigation, so listeners and media resources have
// one lifetime per page. Load only after hydration, before touching the DOM.
let runtimePromise;
function loadRuntime(prefix, pageType) {
  if (runtimePromise) return runtimePromise;
  const files =
    pageType === "lesson"
      ? ["weekly-review-data.js", "app.js"]
      : ["topics-data.js", "topics.js", "app.js"];
  runtimePromise = files.reduce(
    (promise, file) =>
      promise.then(
        () =>
          new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = `${prefix}assets/${file}`;
            script.onload = resolve;
            script.onerror = () =>
              reject(new Error(`Không tải được ${file}. Hãy tải lại trang.`));
            document.body.appendChild(script);
          }),
      ),
    Promise.resolve(),
  );
  return runtimePromise;
}

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const prefix = ["lesson", "topics"].includes(pageProps.pageType) ? "../" : "";
  useEffect(() => {
    if (!router.isReady || !pageProps.pageType) return;
    document.body.dataset.page = pageProps.pageType;
    loadRuntime(prefix, pageProps.pageType)
      .then(() => {
        document.body.dataset.runtimeReady = "true";
      })
      .catch((error) => {
        const toast = document.getElementById("toast");
        if (toast) {
          toast.textContent = error.message;
          toast.classList.add("show");
        }
      });
  }, [router.isReady, pageProps.pageType, prefix]);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href={`${prefix}assets/styles.css`} />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
