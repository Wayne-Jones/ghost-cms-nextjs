import { NextResponse } from "next/server";
import { Post } from "@/helper/types";
const { BLOG_URL, CONTENT_API_KEY } = process.env;

//Get All Posts
export async function GET() {
  if (BLOG_URL && CONTENT_API_KEY) {
    try {
      const url = `${BLOG_URL}/ghost/api/content/posts/?key=${CONTENT_API_KEY}&fields=title,slug`;
      const res = await fetch(url, { next: { revalidate: 10 } });
      if (!res.ok) {
        throw new Error("Unable to retreive from network");
      }
      const data: { posts: Post[] } = await res.json();
      const posts = data.posts;
      return NextResponse.json(posts, { status: 200 });
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      } else {
        // handle other errors
        console.error(error);
      }
    }
  } else {
    return NextResponse.json(
      { error: "Blog URL or Content API Key is missing" },
      { status: 500 }
    );
  }
}
