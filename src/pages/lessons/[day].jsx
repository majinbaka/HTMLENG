import fs from "node:fs/promises";
import path from "node:path";
import Lesson from "../../components/Lesson";

export default Lesson;
const contentDirectory = path.join(process.cwd(), "src/content/lessons");
export async function getStaticPaths() {
  const files = await fs.readdir(contentDirectory);
  return {
    paths: files
      .filter((file) => /^day-\d{2}\.json$/.test(file))
      .map((file) => ({ params: { day: file.replace(".json", "") } })),
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  const lesson = JSON.parse(
    await fs.readFile(
      path.join(contentDirectory, `${params.day}.json`),
      "utf8",
    ),
  );
  return { props: { lesson, pageType: "lesson" } };
}
