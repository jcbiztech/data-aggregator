import { pgTable, serial, text, timestamp, jsonb, integer, boolean, pgEnum } from 'drizzle-orm/pg-core';

export const workshops = pgTable('workshops', {
  workshopId: serial('workshop_id').primaryKey(),
  title: text('title'),
  summary: jsonb('summary'),
  workshopDate: timestamp('workshop_date')
});