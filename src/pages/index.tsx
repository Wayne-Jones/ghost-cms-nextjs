import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import { Post } from './types'

const {BLOG_URL, CONTENT_API_KEY} = process.env

async function getPosts(): Promise<Post[]>{
  // curl "https://demo.ghost.io/ghost/api/v3/content/posts/?key=22444f78447824223cefc48062"
  const url: string =`${BLOG_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}&fields=title,slug`
  const res = await fetch(url).then((res) => res.json())
  
  const posts: Post[] = res.posts
  return posts
}

export const getStaticProps = async ({ params }) => {
  const posts = await getPosts()
  return {
    props: {posts},
    revalidate: 10
  }
}

export default function Home(props: {posts: Post[]}) {
  const { posts } = props;
  return (
    <>
      <div className={styles.container}>
        <h1>Blog</h1>
        <ul>
          {posts.map((post) =>{
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
