import { integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const DiscordUsers = pgTable('discord_users', {
  id: serial('id').notNull().primaryKey(),
  username: text('username').notNull(),
  fullname: text('fullname').notNull(),
  email: text('email').notNull().unique(),
});

export const PrismaMigrations = pgTable('_prisma_migrations', {
  id: varchar('id', { length: 36 }).notNull().primaryKey(),
  checksum: varchar('checksum', { length: 64 }).notNull(),
  finished_at: timestamp('finished_at', { withTimezone: true }),
  migration_name: varchar('migration_name', { length: 255 }).notNull(),
  logs: text('logs'),
  rolled_back_at: timestamp('rolled_back_at', { withTimezone: true }),
  started_at: timestamp('started_at', { withTimezone: true }).notNull().defaultNow(),
  applied_steps_count: integer('applied_steps_count').notNull().default(0),
});
