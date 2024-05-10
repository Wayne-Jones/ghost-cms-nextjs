import Link from "next/link";
import styles from "@/styles/Home.module.css";
import { getPost, getAllPosts } from "../../../helper/util";
import { Post } from "@/helper/types";
const { LOCAL_URL } = process.env;

async function getData(slug: string) {
  const res = await fetch(`${LOCAL_URL}/api/post/${slug}`, {
    next: { revalidate: 10 },
  });
  const post: Post = await res.json();
  return post;
}

export async function generateStaticParams() {
  const res = await fetch(`${LOCAL_URL}/api/post`, {
    next: { revalidate: 10 },
  });
  const posts: Post[] = await res.json();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostSlug({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getData(params.slug);
  return (
    <>
      <div className={styles.container}>
        <p className={styles.goback}>
          <Link href="/">Go Back</Link>
        </p>
        <h1>{post.title}</h1>
        {post.html && (
          <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
        )}
      </div>
    </>
  );
}
