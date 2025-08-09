import { pgTable, serial, text, timestamp, jsonb, integer, boolean, pgEnum } from 'drizzle-orm/pg-core';

// Platforms
export const platforms = pgTable('platforms', {
  platformId: serial('platform_id').primaryKey(),
  name: text('name'),
  metricData: jsonb('metric_data'),
  lastUpdated: timestamp('last_updated')
});