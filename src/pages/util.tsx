import { Post } from "./types";
const { BLOG_URL, CONTENT_API_KEY } = process.env

export async function getPost(slug: string): Promise<Post> {
    let post: Post = {title: '', slug: ''};
    if (BLOG_URL && CONTENT_API_KEY) {
        const url = `${BLOG_URL}/ghost/api/v3/content/posts/slug/${slug}/?key=${CONTENT_API_KEY}&fields=title,html,slug`;
        const res: {posts: Post[]} | void = await fetch(url)
        .then<{ posts: Post[] }>((response: Response) => {
            if (response.ok) {
                return response.json()
            }
            else {
                const message = `An error occured: ${response.status}`
                throw new Error(message)
            }
        }).catch((error: Error) => {
            throw new Error(error.message)
        });

        const posts: Post[] = res.posts
        post = posts[0]
    }
    return post;
}

export async function getAllPosts(): Promise<Post[]> {
    // curl "https://demo.ghost.io/ghost/api/v3/content/posts/?key=22444f78447824223cefc48062"

    let posts: Post[] = [];
    if (BLOG_URL && CONTENT_API_KEY) {
        const url = `${BLOG_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}&fields=title,slug`
        const res: { posts: Post[] } | void = await fetch(url)
            .then<{ posts: Post[] }>((response: Response) => {
                if (response.ok) {
                    return response.json()
                }
                else {
                    const message = `An error occured: ${response.status}`
                    throw new Error(message)
                }

            }).catch((error: Error) => {
                throw new Error(error.message)
            });
        if (res) {
            posts = res.posts
        }
    }
    return posts;
}