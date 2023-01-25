import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '@/styles/Home.module.css'
import { Post } from '../../helper/types'
import { getPost, getAllPosts } from '../../helper/util'

//Ghost CMS request
export const getStaticProps = async (context: { params: { slug: string } }) => {
    const post: Post = await getPost(context.params.slug)
    return {
        props: { post },
        revalidate: 10 // at most 1 request to the ghost CMS in the backend
    }
}

export const getStaticPaths = async () => {
    // paths -> slugs which are allowed
    // fallback -> 
    const posts: Post[] = await getAllPosts();
    const paths: Array<{ params: { slug: string } }> = posts.map(post => ({ params: { slug: post.slug } }));
    return {
        paths: paths,
        fallback: true
    }
}

export default function PostSlug(props: { post: Post }) {
    //console.log(props)
    const router = useRouter()

    const { post } = props

    if (router.isFallback) {
        return <h3>...loading</h3>
    }

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
