import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { s3Storage } from '@payloadcms/storage-s3';
import { buildConfig } from 'payload';
import sharp from 'sharp';

import { Events } from './collections/events';
import { Media } from './collections/media';
import { News } from './collections/news';
import { DiscordUsers, PrismaMigrations } from './prisma/drizzle/schema';

export default buildConfig({
  editor: lexicalEditor(),
  cors: '*',

  collections: [News, Events, Media],

  typescript: {},

  secret: process.env.PAYLOAD_SECRET || '',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
    beforeSchemaInit: [
      ({ schema }) => {
        return {
          ...schema,
          tables: {
            ...schema.tables,
            DiscordUsers,
            PrismaMigrations,
          },
        };
      },
    ],
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET,
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        },
        region: process.env.S3_REGION,
        endpoint: process.env.S3_ENDPOINT,
        forcePathStyle: true,
      },
    }),
  ],
});
