import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { s3Storage } from '@payloadcms/storage-s3';
import { buildConfig } from 'payload';
import sharp from 'sharp';

import { Events } from './collections/events';
import { Media } from './collections/media';
import { News } from './collections/news';
import { Users } from './collections/Users/config';
import { DiscordUsers, PrismaMigrations } from './prisma/drizzle/schema';
import Seed from './utils/seed';

export default buildConfig({
  editor: lexicalEditor(),
  cors: '*',

  collections: [News, Events, Media, Users],

  admin: {
    user: Users.slug,
    autoLogin:
      process.env.PAYLOAD_ENABLE_AUTOLOGIN === 'true'
        ? {
            email: 'admin@local.com',
            password: 'password',
          }
        : false,
  },

  onInit: async (payload) => {
    if (process.env.PAYLOAD_ENABLE_AUTOLOGIN === 'true') {
      await Seed(payload);
    }
  },

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
