import {z} from 'zod'

export const signupInput = z.object({
    email : z.string().email(),
    password : z.string()
    .min(8 , "Password must have atleast 8 characters")
    .regex(/[A-Z]/ , "Password must contain at least one Uppercase character")
    .regex(/[a-z]/ , "Password must contain at least one lowercase character")
    .regex(/[\W_]/ , "Password must contain at least one special character"),
    name : z.string().min(3 , "Username must consist of at least three characters")
})

export type SignupInput = z.infer<typeof signupInput>

export const signinInput = z.object({
    email : z.string().email(),
    password : z.string()
    .min(8 , "Password must have atleast 8 characters")
    .regex(/[A-Z]/ , "Password must contain at least one Uppercase character")
    .regex(/[a-z]/ , "Password must contain at least one lowercase character")
    .regex(/[\W_]/ , "Password must contain at least one special character")    
})

export type SigninInput = z.infer<typeof signinInput>

export const createPostInput = z.object({
    title : z.string().min(1 , "Cannot leave title field empty"),
    content : z.string().refine((text) => text.split(/\s+/).length >= 100 , {message : "Content should consist at least 100 Words"}),
    authorId : z.string(),
    published : z.boolean().default(false)
})

export type CreatePostInput = z.infer<typeof createPostInput>

export const updatePostInput = z.object({
    title : z.string().min(1 , "Cannot leave title field empty").optional(),
    content : z.string().refine((text) => text.split(/\s+/).length >= 100 , {message : "Content should consist at least 100 Words"}).optional(),
    published : z.boolean().default(false)
})

export type UpdatePostInput = z.infer<typeof updatePostInput>