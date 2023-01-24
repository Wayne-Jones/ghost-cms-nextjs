
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import { getAllPosts } from './util'
import { Post } from './types'

export const getStaticProps = async () => {
  const posts = await getAllPosts()
  return {
    props: { posts },
    revalidate: 10
  }
}

export default function Home(props: { posts: Post[] }) {
  const { posts } = props;
  return (
    <>
      <div className={styles.container}>
        <h1>Blog</h1>
        <ul>
          {posts.map((post) => {
            return <li className={styles.postitem} key={post.slug}>
              <Link href="/post/[slug]" as={`/post/${post.slug}`}>
                {post.title}
              </Link>
            </li>
          })}
        </ul>
      </div>
    </>
  )
}
