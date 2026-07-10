import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const contactRequestsTable = pgTable("contact_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  service: text("service").notNull(),
  message: text("message"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertContactRequestSchema = createInsertSchema(
  contactRequestsTable,
).omit({ id: true, createdAt: true });

export type InsertContactRequest = z.infer<typeof insertContactRequestSchema>;
export type ContactRequest = typeof contactRequestsTable.$inferSelect;
