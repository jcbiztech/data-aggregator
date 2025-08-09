import { pgTable, serial, text, timestamp, jsonb, integer, boolean, pgEnum } from 'drizzle-orm/pg-core';

import { students } from "./students";
import { events  } from "./events";


export const eventSignups = pgTable('event_signups', {
  signupId: serial('signup_id').primaryKey(),
  studentId: integer('student_id').references(() => students.studentId),
  eventId: integer('event_id').references(() => events.eventId),
  signupTime: timestamp('signup_time').defaultNow(),
  attended: boolean('attended')
});