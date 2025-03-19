import { z } from 'zod';
export declare const signupInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name: string;
}, {
    email: string;
    password: string;
    name: string;
}>;
export type SignupInput = z.infer<typeof signupInput>;
export declare const signinInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type SigninInput = z.infer<typeof signinInput>;
export declare const createPostInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodEffects<z.ZodString, string, string>;
    authorId: z.ZodString;
    published: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    authorId: string;
    published: boolean;
}, {
    title: string;
    content: string;
    authorId: string;
    published?: boolean | undefined;
}>;
export type CreatePostInput = z.infer<typeof createPostInput>;
export declare const updatePostInput: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    published: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    published: boolean;
    title?: string | undefined;
    content?: string | undefined;
}, {
    title?: string | undefined;
    content?: string | undefined;
    published?: boolean | undefined;
}>;
export type UpdatePostInput = z.infer<typeof updatePostInput>;
