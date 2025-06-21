import { CollectionConfig } from 'payload';

import admin from './access/admin';
import editor from './access/editor';

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  access: {
    create: admin,
    read: editor,
    update: editor,
    delete: admin,
  },
  admin: {
    useAsTitle: 'email',
    hidden: ({ user }) => user?.role !== 'admin',
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      access: {
        update: ({ req: { user } }) => user?.role === 'admin',
      },
    },
  ],
};
