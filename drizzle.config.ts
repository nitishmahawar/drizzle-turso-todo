import { Config } from "drizzle-kit";

export default {
  driver: "turso",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN!,
  },
  schema: "./src/db/schema.ts",
  out: "./drizzle",
} satisfies Config;
