import { Payload } from 'payload';

export default async function Seed(payload: Payload) {
  console.log('Payload initialized. Seeding default users...');

  const existingAdmin = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: 'admin@local.com',
      },
    },
  });

  if (existingAdmin.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@local.com',
        password: 'password',
        role: 'admin',
        name: 'Admin',
      },
    });
    console.log('Created default admin user');
  }

  const existingEditor = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: 'editor@local.com',
      },
    },
  });

  if (existingEditor.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: 'editor@local.com',
        password: 'password',
        role: 'editor',
        name: 'Editor',
      },
    });
    console.log('Created default editor user');
  }
}
