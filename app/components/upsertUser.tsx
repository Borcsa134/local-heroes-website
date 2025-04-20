'use server';
import db from '@/lib/prisma';

export async function upsertUser(prevState, formData: FormData) {
  const _eslintIgnore = prevState;
  const data = Object.fromEntries(formData);

  await db.users.upsert({
    where: {
      email: data.email as string,
    },
    update: {
      username: data.username as string,
      fullname: data.fullname as string,
    },
    create: {
      email: data.email as string,
      username: data.username as string,
      fullname: data.fullname as string,
    },
  });
  return { success: true, formData: formData };
}
