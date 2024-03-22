import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { v4 as uuidv4 } from "uuid";

export const todos = sqliteTable("todos", {
  id: text("id").notNull().primaryKey().$defaultFn(uuidv4),
  text: text("text").notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export type Todo = typeof todos.$inferSelect;
