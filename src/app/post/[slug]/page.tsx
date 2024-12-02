import Link from "next/link";
import styles from "@/styles/Home.module.css";
import { getPost, getAllPosts } from "../../../helper/util";

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostSlug({
  params,
}: {
  params: { slug: string };
}) {
  const param = await params;
  const post = await getPost(param.slug);
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
