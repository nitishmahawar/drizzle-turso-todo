import { Hono } from "hono";
import { db } from "../db";
import { todos } from "../db/schema";
import { eq } from "drizzle-orm";

const app = new Hono();

app.get("/", async (c) => {
  const todos = await db.query.todos.findMany();

  return c.json(todos);
});

app.post("/", async (c) => {
  const { text } = await c.req.json();

  const todo = await db.insert(todos).values({ text }).returning();

  return c.json(todo, 201);
});

app.get("/:id", async (c) => {
  const id = c.req.param("id");

  const todo = await db.query.todos.findFirst({
    where: (todo, { eq }) => eq(todo.id, id),
  });

  if (!todo) c.json({ message: "Todo not found" }, 404);

  return c.json(todo);
});

app.patch("/:id", async (c) => {
  const id = c.req.param("id");
  const { text } = await c.req.json();

  const todo = await db
    .update(todos)
    .set({ text })
    .where(eq(todos.id, id))
    .returning();

  return c.json(todo);
});

app.delete("/:id", async (c) => {
  const id = c.req.param("id");

  const todo = await db.delete(todos).where(eq(todos.id, id)).returning();

  return c.json(todo);
});

export default app;
