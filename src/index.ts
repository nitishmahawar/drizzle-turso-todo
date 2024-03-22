import { serve } from "@hono/node-server";
import { Hono } from "hono";
import todosApp from "./todos";

const app = new Hono();

app.get("/", (c) => {
  console.log(process.env.DATABASE_URL);
  return c.text("Hello Hono!");
});

app.route("/todos", todosApp);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
