import { pgTable, serial, text, timestamp, jsonb, integer, boolean, pgEnum } from 'drizzle-orm/pg-core';

export const members= pgTable("members", {
  studentId: serial("student_id").primaryKey(),
  id: text("id").notNull(), // Dynamo user ID
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email"), // ← only if available
  faculty: text("faculty"),
  major: text("major"),
  year: text("year"),
  studentNumber: text("student_number"),
  pronouns: text("pronouns"),
  education: text("education"),
  university: text("university"),
  highSchool: text("high_school"),
  heardFrom: text("heard_from"),
  topics: jsonb("topics"), // assumed to be array or JSON
  isAdmin: boolean("is_admin"),
  isInternational: boolean("is_international"),
  isPrevMember: boolean("is_prev_member"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});
