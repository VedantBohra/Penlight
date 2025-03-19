import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign} from 'hono/jwt'
import {errorHandler} from '../middlewares/errorHandler'
import { signupInput , signinInput } from '@penlight/common-app'
import axios from 'axios'

const userRouter = new Hono<{
  Bindings : {
    DATABASE_URL : string ,
    SECRET_KEY : string
  }
  Variables : {
    userId : string
  }
}>

let prisma : PrismaClient

const getPrisma = (DATABASE_URL : string)=> {
    if(!prisma){
      prisma = new PrismaClient({datasourceUrl : DATABASE_URL}).$extends(withAccelerate()) as unknown as PrismaClient
    }
    return prisma
}

userRouter.post('/signup', async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL)
  
  const body = await c.req.json()
    
  const result = signupInput.safeParse(body)
  if(!result.success){
    c.status(400)
    return c.json({
      msg : "Error in the user credentials format",
      error : result.error.format()
    })
  }

  const validatedBody = result.data

  const user = await prisma.user.create({
    data : {
      email : validatedBody.email,
      password : validatedBody.password,
      name : validatedBody.name
    }
  })

  const token = await sign({id : user.id} , c.env.SECRET_KEY)
 
  c.status(200)
  return c.json({
    jwt : token
  })
  
})

userRouter.post('/signin', async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL)

  const body = await c.req.json()
  const result = signinInput.safeParse(body)

  if(!result.success){
    c.status(400)
    return c.json({
      msg : "Error in user credential format",
      error : result.error.format()
    })
  }

  const validatedBody = result.data

  const user = await prisma.user.findUnique({
    where : {
      email : validatedBody.email,
      password : validatedBody.password
    }
  })

  if(!user){
     c.status(404)
     return c.json({
      msg : "user not found"
    })
  }

  const token = await sign({id : user.id} , c.env.SECRET_KEY)
  
  c.status(200)
  return c.json({
    jwt : token,
    userId : user.id
  })
})

userRouter.get('/quote' , async (c) => {
  try {
    const response = await axios.get('https://zenquotes.io/api/random');
    return c.json(response.data[0]);
  } catch (error) {
    return c.json({ error: 'Failed to fetch quote' }, 500);
}
})

userRouter.get('/check-username', async(c) => {
  const prisma = getPrisma(c.env.DATABASE_URL)
  const name = c.req.query("name")

  if(!name){
    return c.json({
      msg : "username is required"
    })
  }
  
  const userExist = await prisma.user.findUnique({
    where : {name}
  })
  c.status(200)
  return c.json({
    exists : !!userExist
  })
})

userRouter.get('/check-email', async(c) => {
  const prisma = getPrisma(c.env.DATABASE_URL)
  const email = c.req.query("email")

  if(!email){
    return c.json({
      msg : "username is required"
    })
  }
  
  const emailExists = await prisma.user.findUnique({
    where : {email}
  })
  c.status(200)
  return c.json({
    exists : !!emailExists
  })
})

userRouter.onError(errorHandler)

export default userRouter