import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import { getPost, getAllPosts } from '../../../helper/util'

async function getData(slug: string) {
    const posts = await getPost(slug);
    return posts;
  }

export async function generateStaticParams() {
    const posts = await getAllPosts();
   
    return posts.map((post) => ({
      slug: post.slug,
    }))
  }

export default async function PostSlug({ params }: { params: { slug: string } }) {
    const post = await getData(params.slug);
    return (
        <>
            <div className={styles.container}>
                <p className={styles.goback}>
                    <Link href='/'>
                        Go Back
                    </Link>
                </p>
                <h1>{post.title}</h1>
                {post.html && <div dangerouslySetInnerHTML={{ __html: post.html }}></div>}
            </div>
        </>
    )
}