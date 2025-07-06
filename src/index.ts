import { Elysia } from "elysia";

const app = new Elysia()
.get("/", () => "Hello Elysia Framework!")
.get("/hello", () => {return {message: "Hello World!"}})
.get("/hello/:name", ({ params } : {
  params: { 
    name : string
  }
}) => { 
  return { message: `Hello ${params.name}!`} }
)
.get("/hello/:name/:age", ({ params } : {
  params: {
    name : string,
    age : string
  }
}) => {
  const name = params.name;
  const age = parseInt(params.age, 10);
  return { message: `Hello ${params.name}, you are ${params.age} years old
!` }
})
.listen(3000)


console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
