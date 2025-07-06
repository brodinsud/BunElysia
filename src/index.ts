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
.get("/customers/:id", ({params} : {
  params: {
    id : number
  }
}) => {
  const customers = [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Smith" },
      { id: 3, name: "Alice Johnson" }
  ];
  const customer = customers.find(customer => customer.id === Number(params.id));
  return customer ? customer : { error: "Customer not found" };
})
//http://localhost:3000/customers/query?name=Brodin&age=44
.get("/customers/query", ({query}) => {
  const name = query.name as string;
  const age = query.age ? parseInt(query.age as string, 10) : undefined;
  return {
    message: `Received query - Name: ${name}, Age: ${age !== undefined ? age : "not provided"}`
  }
})
.post("/customers/create", ({ body } :
{
  body: {
    name: string,
    age?: number
  }
}) => {
  const newCustomer = {
    id: Date.now(),
    name: body.name,
    age: body.age
  };
  return {
    message: "Customer created successfully",
    customer: newCustomer
  };
})
.put("/customers/update/:id", ({ params, body } : {
  params: { 
    id: number
  },
  body: {
    name?: string,//หมายถึงว่าอาจจะไม่มีชื่อก็ได้
    age?: number //หมายถึงว่าอาจจะไม่มีอายุก็ได้
  }
}) => {
  const name = body.name;
  const age = body.age;
  return {
    message: `Customer with ID ${params.id} updated successfully`,
    updatedFields: {
      name: name !== undefined ? name : "No change",
      age: age !== undefined ? age : "No change"
    }
  };
})
.delete("/customers/delete/:id", ({ params } : {
  params: {
    id: number
  }
}) => {
  return {
    message: `Customer with ID ${params.id} deleted successfully`
  };
})
.get("/customers", () => {
  const customers = [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Smith" },
      { id: 3, name: "Alice Johnson" }
  ];
  return {
    customers
  };
})
.listen(3000);


console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
