import GhostContentAPI from "@tryghost/content-api";
const { BLOG_URL, CONTENT_API_KEY } = process.env;

const api = new GhostContentAPI({
  url: BLOG_URL!,
  key: CONTENT_API_KEY!,
  version: "v5.0",
});

export async function getPostsByTag(tag: string) {
  "use cache";

  return await api.posts.browse({
    filter: `tag:${tag}`,
    include: ["tags", "authors"],
    limit: "all",
  });
}

export async function getPost(slug: string) {
  "use cache";
  return await api.posts.read(
    { slug: slug },
    { include: ["tags", "authors"], formats: ["html", "plaintext"] }
  );
}

export async function getAllPosts() {
  "use cache";
  // curl -H "Accept-Version: v6.0" "https://demo.ghost.io/ghost/api/content/posts/?key=22444f78447824223cefc48062"
  return await api.posts.browse({ limit: "all", include: ["tags", "authors"] });
}
