import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

export default function config(phase) {
  const development = phase === PHASE_DEVELOPMENT_SERVER;
  return {
    ...(development
      ? {
          async rewrites() {
            return [
              { source: "/index.html", destination: "/" },
              { source: "/lessons/:day.html", destination: "/lessons/:day" },
              { source: "/topics/index.html", destination: "/topics" },
            ];
          },
        }
      : { output: "export", assetPrefix: "." }),
    trailingSlash: false,
    skipTrailingSlashRedirect: true,
    agentRules: false,
    images: { unoptimized: true },
    reactStrictMode: false,
  };
}
