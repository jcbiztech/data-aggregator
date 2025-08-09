import { pgTable, serial, text, timestamp, jsonb, integer, boolean, pgEnum } from 'drizzle-orm/pg-core';

import { students } from "./students";
import { events  } from "./events";
import { workshops } from "./workshops"

export const formResponses = pgTable('form_responses', {
  formId: serial('form_id').primaryKey(),
  title: text('title'),
  subjectType: text('subject_type'), // Could add pgEnum if you want validation
  eventId: integer('event_id').references(() => events.eventId),
  workshopId: integer('workshop_id').references(() => workshops.workshopId),
  studentId: integer('student_id').references(() => students.studentId),
  submissionData: timestamp('submission_data').defaultNow()
});
