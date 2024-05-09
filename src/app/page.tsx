import { Metadata } from "next";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import { getAllPosts } from "../helper/util";

export const metadata: Metadata = {
  title: "Home",
};

async function getData() {
  const posts = await getAllPosts();
  return posts;
}

export default async function Home() {
  const posts = await getData();
  return (
    <>
      <div className={styles.container}>
        <h1>Blog</h1>
        <ul>
          {posts.map((post) => {
            return (
              <li className={styles.postitem} key={post.slug}>
                <Link href="/post/[slug]" as={`/post/${post.slug}`}>
                  {post.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
