"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostInput = exports.createPostInput = exports.signinInput = exports.signupInput = void 0;
const zod_1 = require("zod");
exports.signupInput = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string()
        .min(8, "Password must have atleast 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one Uppercase character")
        .regex(/[a-z]/, "Password must contain at least one lowercase character")
        .regex(/[\W_]/, "Password must contain at least one special character"),
    name: zod_1.z.string().min(3, "Username must consist of at least three characters")
});
exports.signinInput = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string()
        .min(8, "Password must have atleast 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one Uppercase character")
        .regex(/[a-z]/, "Password must contain at least one lowercase character")
        .regex(/[\W_]/, "Password must contain at least one special character")
});
exports.createPostInput = zod_1.z.object({
    title: zod_1.z.string().min(1, "Cannot leave title field empty"),
    content: zod_1.z.string().refine((text) => text.split(/\s+/).length >= 100, { message: "Content should consist at least 100 Words" }),
    authorId: zod_1.z.string(),
    published: zod_1.z.boolean().default(false)
});
exports.updatePostInput = zod_1.z.object({
    title: zod_1.z.string().min(1, "Cannot leave title field empty").optional(),
    content: zod_1.z.string().refine((text) => text.split(/\s+/).length >= 100, { message: "Content should consist at least 100 Words" }).optional(),
    published: zod_1.z.boolean().default(false)
});
