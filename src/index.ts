import { Elysia } from "elysia";

const app = new Elysia()
.get("/", () => "Hello Elysia Framework!")
.get("/hello", () => {
  return {message: "Hello World!"}
})
.get("/greet/:name", ({ params:{name} }) => {
  return { message: `Hello, ${name}!` };
})
.get("/hello/:name/:age", ({ params: { name, age } }) => {
  return { message: `Hello, ${name}! You are ${age} years old.` };
})
.listen(3000);



console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
