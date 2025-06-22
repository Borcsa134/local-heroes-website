import type { CollectionConfig } from 'payload';

import { generateSlug, validateSlug } from './utils/slug';

export const News: CollectionConfig = {
  slug: 'news',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'publishedAt', 'published'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'author',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Automatically generated after creation.',
      },
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: {
        description: 'Automatically generated from title if left blank.',
      },
      validate: (value: string) => validateSlug(value),
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      type: 'richText',
      name: 'content',
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
  hooks: {
    beforeChange: [
      ({ req, operation, data }) => {
        if (data.published) {
          if (!data.publishedAt) {
            data.publishedAt = new Date().toISOString();
          }
        } else {
          data.publishedAt = null;
        }

        if (operation === 'create' && req.user && !data.author) {
          const userName = req.user.name;
          data.author = userName || req.user.email || 'Unknown User';
        }

        return data;
      },
    ],
    beforeValidate: [
      ({ data }) => {
        if (data?.title && (!data.slug || data.slug.trim() === '')) {
          data.slug = generateSlug(data.title as string);
        }

        return data;
      },
    ],
  },
};
