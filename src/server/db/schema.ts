// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `Incubato_${name}`);

export const users = createTable("user", {
  id: varchar("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  lastname: varchar("lastname", { length: 256 }),
  pic: varchar("lastname", { length: 256 }),
});

export const privateMeetings = createTable("privateMeetings", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  lastname: varchar("lastname", { length: 256 }),
  idea: varchar("idea", { length: 256 }),
  category: varchar("category", {
    enum: ["Discussing", "Consulting", "Inquiry"],
  }),
  subject: varchar("subject", { length: 256 }),
  urgency: boolean("urgency"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  authorId: varchar("author_id").references(() => users.id, {
    onDelete: "cascade",
  }),
});
export const privateMeetingsRelations = relations(
  privateMeetings,
  ({ one }) => ({
    author: one(users, {
      fields: [privateMeetings.authorId],
      references: [users.id],
    }),
  }),
);
