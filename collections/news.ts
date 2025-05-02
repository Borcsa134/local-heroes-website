import type { CollectionConfig } from 'payload';

export const News: CollectionConfig = {
  slug: 'news',
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
