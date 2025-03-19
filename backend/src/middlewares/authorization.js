import { verify } from 'hono/jwt';
export const authorizationMiddleware = async (c, next) => {
    const header = c.req.header("authorization") || "";
    if (!header.startsWith("Bearer ")) {
        c.status(401);
        return c.json({
            msg: "Invalid authorization token format"
        });
    }
    const token = header.split(" ")[1];
    try {
        const payload = await verify(token, c.env.SECRET_KEY);
        if (!payload.id) {
            c.status(403);
            return c.json({
                msg: "User does not exist"
            });
        }
        c.set("userId", payload.id);
        await next();
    }
    catch (err) {
        c.status(401);
        return c.json({
            msg: "Invalid token"
        });
    }
};
