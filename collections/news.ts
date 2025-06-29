import type { CollectionConfig } from 'payload';

import { statusIsPublished } from './utils/queries';
import { generateSlug, isSlugChanged, validateImageUrl, validateSlug } from './utils/slug';

export const News: CollectionConfig = {
  slug: 'news',
  versions: {
    maxPerDoc: 2,
    drafts: true,
  },
  access: {
    read: ({ req }) => {
      if (req.user && req.user.collection === 'users') {
        return true;
      }

      return statusIsPublished;
    },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'publishedAt', '_status'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
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
        readOnly: true,
        description: 'Automatically generated from title after creation',
      },
      validate: (value: string) => validateSlug(value),
    },
    {
      name: 'coverImage',
      type: 'text',
      admin: {
        description: 'Use image from the web. Accepts only valid URLs.',
      },
      validate: (value: string) => validateImageUrl(value),
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
        date: {
          displayFormat: 'yyyy.MM.dd HH:mm',
        },
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ req, data, originalDoc }) => {
        const status = data._status;
        const prevStatus = originalDoc?._status;

        if (status === 'published') {
          if (!data.publishedAt) {
            data.publishedAt = new Date().toISOString();
          }
        } else if (status === 'draft' && prevStatus === 'published') {
          data.publishedAt = null;
        }

        if (req.user && !data.author) {
          const userName = req.user.name;
          data.author = userName || req.user.email || 'Unknown User';
        }

        if (
          data?.title
          && (!data.slug || data.slug.trim() === '' || isSlugChanged(data.title as string, data.slug as string))
        ) {
          data.slug = generateSlug(data.title as string);
        }

        return data;
      },
    ],
  },
};
