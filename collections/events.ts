import type { CollectionConfig } from 'payload';

export const Events: CollectionConfig = {
  slug: 'events',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'author',
      type: 'text',
    },
    {
      name: 'slug',
      type: 'text',
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'eventDate',
      type: 'date',
    },
    {
      name: 'regularEvent',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      type: 'richText',
      name: 'content',
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        readOnly: true,
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data.published) {
          if (!data.publishedAt) {
            data.publishedAt = new Date().toISOString();
          }
        } else {
          data.publishedAt = null;
        }

        return data;
      },
    ],
  },
};
