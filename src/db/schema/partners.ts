import { pgTable, serial, text, timestamp, jsonb, integer, boolean, pgEnum } from 'drizzle-orm/pg-core';

import { events  } from "./events";
import { workshops  } from "./workshops"

// Partners
export const partners = pgTable('partners', {
  partnerId: serial('partner_id').primaryKey(),
  partnerName: text('partner_name'),
  eventId: integer('event_id').references(() => events.eventId),
  workshopId: integer('workshop_id').references(() => workshops.workshopId)
});