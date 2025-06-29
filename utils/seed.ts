import { headers as getHeaders } from 'next/headers';
import { CollectionSlug, Payload } from 'payload';

import { news } from './data/news';
import { admin, editor } from './data/users';

async function createUser(payload: Payload, data) {
  const existingUser = await payload
    .find({
      collection: 'users',
      where: {
        email: {
          equals: data.email,
        },
      },
    })
    .then((res) => res.docs[0]);

  if (!existingUser) {
    await payload.create({
      collection: 'users',
      data: data,
    });
    console.log('=> Created default admin user.');
  }
}

async function createObject(payload: Payload, collection: CollectionSlug, data) {
  const existingObject = await payload
    .find({
      collection: collection,
      where: {
        title: {
          equals: data.title,
        },
      },
    })
    .then((res) => res.docs[0]);

  if (!existingObject) {
    await payload.create({
      collection: collection,
      data: data,
    });
    console.log(`=> Created ${collection} object.`);
  }
}

export default async function Seed(payload: Payload) {
  const headers = await getHeaders();
  const _ = await payload.auth({ headers });

  console.log('Payload initialized. Seeding default objects...');

  await createUser(payload, admin);
  await createUser(payload, editor);

  await createObject(payload, 'news', news);

  console.log('Payload data finished loading.');
}
