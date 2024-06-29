import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign, verify } from 'hono/jwt';
import { getCookie, setCookie } from 'hono/cookie';
import { createMiddleware } from 'hono/factory';
import { cors } from 'hono/cors';

const app = new Hono<{
  Bindings:{
    DATABASE_URL: string;
    SECRET_KEY: string;
  },
  Variables:{
    userId: string
    userName: string
  }
}>();

app.use('/api/*', cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

const authenticate = () => {
  return createMiddleware(async (c, next) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
      const token = getCookie(c, 'cookieToken');
      if (!token) {
        return c.json({ msg: "Your cookie is not defined!!" });
      }
      const decodedJwt = await verify(token, c.env.SECRET_KEY);
      if (!decodedJwt || !decodedJwt.email) {
        return c.json({ success: false, msg: "User Authentication failed!!!!" });
      }
      const user = await prisma.user.findFirst({
        where: {
          email: decodedJwt.email
        }
      });
      if (!user) {
        return c.json({ success: false, msg: "Access Denied!!!!" });
      }
      c.set('userName', user.name);
      c.set('userId', user.id);
      await next();
    } catch (err) {
      console.log("Error you looking for", err);
    }
  });
};

app.use("/api/post/*", authenticate());

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.post('/api/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const { email, password, name } = await c.req.json();
    const mail = await prisma.user.findFirst({
      where: { email }
    });
    if (!mail) {
      await prisma.user.create({
        data: { email, password, name }
      });
      return c.json({ success: true, message: "User created successfully" });
    } else {
      return c.json({ success: false, msg: "Internal Server error" });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post('/api/login', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const { email, password } = await c.req.json();
    const user = await prisma.user.findUnique({
      where: { email }
    });
    if (!user || !user.password || !(user.password === password)) {
      return c.json({ success: false, message: "Invalid email or password" });
    }
    const token = await sign({ email }, c.env?.SECRET_KEY);
    setCookie(c, 'cookieToken', token, {
      httpOnly: true,
      sameSite: 'Lax',  
      path: '/',
      maxAge: 90000,
      secure: false 
    });
    return c.json({ success: true, message: 'Logged in successfully!!', token });
  } catch (err) {
    return c.json({ success: false, msg: "Internal Server error" });
  }
});

app.get('/api/post', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const allPosts = await prisma.post.findMany();
    return c.json({ success: true, msg: "Here are all your posts", allPosts });
  } catch (err) {
    console.log(err);
    return c.json({ success: false, msg: err });
  }
});

app.post('/api/post', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const { title, content } = await c.req.json();
    const userId = c.get('userId');
    const post = await prisma.post.create({
      data: { 
        title, 
        content,
        authorId: userId
       }
    });
    return c.json({ success: true, message: "Post created successfully!!", post });
  } catch (err) {
    return c.json({ success: false, msg: "Internal Server error" });
  }
});

app.put('/api/post/blog/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const id = c.req.param('id');
    const { title, content } = await c.req.json();
    const checkId = await prisma.post.findFirst({
      where: { authorId: c.get('userId') }
    });
    if (checkId) {
      const upPost = await prisma.post.update({
        where: { id },
        data: { title, content }
      });
      return c.json({ success: true, msg: "Post updated", upPost });
    } else {
      return c.json({ success: false, msg: `Post with ${id} doesn't exist in your posts.` });
    }
  } catch (err) {
    return c.json({ success: false, msg: "Internal Server error" });
  }
});

app.get('api/post/blog/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const id = c.req.param('id');
    const userId = c.get('userId');

    const userName = await prisma.user.findFirst({
      where:{
        id: userId
      }
    })
    
    const post = await prisma.post.findFirst({
      where: { id }
    });
    return c.json({ success: true, msg: "Post retrieved!", post, userId, userName});
    
  } catch (err) {
    console.log(err);
    return c.json({ success: false, msg: "Internal Server Error" });
  }
});

export default app;
