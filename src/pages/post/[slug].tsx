import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '@/styles/Home.module.css'
import { Post } from '../types'

const { BLOG_URL, CONTENT_API_KEY } = process.env


async function getPost(slug: string): Promise<Post> {
    const url: string = `${BLOG_URL}/ghost/api/v3/content/posts/slug/${slug}/?key=${CONTENT_API_KEY}&fields=title,html,slug`;
    const result = await fetch(url).then((res) => res.json())

    const posts: Post[] = result.posts
    return posts[0]
}

async function getAllPosts(): Promise<Post[]> {
    const url: string = `${BLOG_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}&fields=title,slug`;
    const res = await fetch(url).then((res) => res.json())

    const posts: Post[] = res.posts
    return posts
}

//Ghost CMS request
export const getStaticProps = async ( context: {params: {slug: string}} ) => {
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
    const paths: Array<{ params: {slug: string}}> = posts.map(post => ({ params: { slug: post.slug } }));
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

                <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
            </div>
        </>
    )
}
