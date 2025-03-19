import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { authorizationMiddleware } from '../middlewares/authorization';
import { errorHandler } from '../middlewares/errorHandler';
import { createPostInput, updatePostInput } from '@penlight/common-app';
const blogRouter = new Hono;
let prisma;
const getPrisma = (DATABASE_URL) => {
    if (!prisma) {
        prisma = new PrismaClient({ datasourceUrl: DATABASE_URL }).$extends(withAccelerate());
    }
    return prisma;
};
blogRouter.post('/create', authorizationMiddleware, async (c) => {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const body = await c.req.json();
    const userId = c.get("userId");
    const result = createPostInput.safeParse(body);
    if (!result.success) {
        c.status(400);
        return c.json({
            msg: "Error on user input credentials",
            error: result.error.format()
        });
    }
    const validatedBody = result.data;
    const post = await prisma.post.create({
        data: {
            title: validatedBody.title,
            content: validatedBody.content,
            authorId: userId,
            published: validatedBody.published ?? false
        }
    });
    c.status(200);
    return c.json({
        id: post.id
    });
});
blogRouter.delete('/delete/:id', authorizationMiddleware, async (c) => {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const postId = c.req.param("id");
    try {
        const prismaUser = await prisma.post.delete({
            where: { id: postId }
        });
        c.status(200);
        return c.json({
            deletedUser: prismaUser
        });
    }
    catch (err) {
        return c.json({ err: err });
    }
});
blogRouter.put('/edit/:id', authorizationMiddleware, async (c) => {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const body = await c.req.json();
    const userId = c.get("userId");
    const postId = c.req.param("id");
    const result = updatePostInput.safeParse(body);
    if (!result.success) {
        c.status(400);
        return c.json({
            msg: "Error on user input credentials",
            error: result.error.format()
        });
    }
    const validatedBody = result.data;
    const existingPost = await prisma.post.findUnique({
        where: {
            id: postId
        }
    });
    if (!existingPost) {
        c.status(404);
        return c.json({
            msg: "post does not exists"
        });
    }
    if (existingPost.authorId !== userId) {
        c.status(403);
        return c.text("Only the author can edit this post");
    }
    const updateData = {};
    if (body.title)
        updateData.title = validatedBody.title;
    if (body.content)
        updateData.content = validatedBody.content;
    if (body.published)
        updateData.published = validatedBody.published;
    if (Object.keys(updateData).length === 0) {
        c.status(200);
        return c.json({
            msg: "No changes provided",
            body: updateData
        });
    }
    await prisma.post.update({
        where: {
            id: postId
        },
        data: updateData
    });
    c.status(200);
    return c.text("post updated");
});
blogRouter.get('/post/:id', authorizationMiddleware, async (c) => {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const postId = c.req.param("id");
    const post = await prisma.post.findUnique({
        where: { id: postId },
        select: {
            id: true,
            title: true,
            content: true,
            published: true,
            createdAt: true,
            authorId: true,
            author: {
                select: { name: true }
            }
        }
    });
    if (!post) {
        c.status(404);
        return c.json({
            msg: "this post is not available"
        });
    }
    c.status(200);
    return c.json({
        post: post
    });
});
blogRouter.get('/bulk/post', authorizationMiddleware, async (c) => {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const userId = c.get("userId");
    const posts = await prisma.post.findMany({
        where: {
            authorId: userId
        },
        orderBy: { createdAt: "desc" }
    });
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });
    if (posts.length === 0) {
        c.status(404);
        return c.json({
            msg: "No posts available for this user"
        });
    }
    c.status(200);
    return c.json({
        posts: posts,
        user: user
    });
});
blogRouter.get('/home/posts', async (c) => {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const userId = c.get("userId");
    const totalPosts = await prisma.post.count();
    try {
        const randomPosts = await prisma.post.findMany({
            where: { published: true,
                NOT: {
                    authorId: userId
                }
            },
            orderBy: { createdAt: 'desc' },
            skip: Math.floor(Math.random() * totalPosts),
            take: 10,
            select: {
                id: true,
                title: true,
                content: true,
                published: true,
                createdAt: true,
                authorId: true,
                author: {
                    select: { name: true }
                }
            }
        });
        c.status(200);
        return c.json({
            posts: randomPosts
        });
    }
    catch (err) {
        c.status(403);
        return c.json({
            msg: "Not enough messages are present"
        });
    }
});
blogRouter.onError(errorHandler);
export default blogRouter;
