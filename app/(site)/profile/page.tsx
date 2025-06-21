import { Image } from '@heroui/image';
import { Session } from 'next-auth';

import ProfileForm from '@/app/components/profileForm';
import { upsertUser } from '@/app/components/upsertUser';
import { auth } from '@/auth';
import db from '@/lib/prisma';

async function insertUser(session: Session) {
  const formData = new FormData();
  formData.append('username', session.user.name);
  formData.append('email', session.user.email);
  formData.append('fullname', '');
  await upsertUser(null, formData);
}

export default async function Profile() {
  const session = await auth();

  if (session?.user?.name && session.user.email) {
    let user = await db.discordUsers.findFirst({ where: { email: session.user.email } });

    if (!(user?.username && user?.email)) {
      await insertUser(session);
      user = await db.discordUsers.findFirst({ where: { email: session.user.email } });
    }

    return (
      <div className="flex justify-between px-10">
        <ProfileForm username={user.username} email={user.email} fullname={user.fullname} />
        <Image
          removeWrapper
          src={session.user.image as string}
          alt="discord-image"
          radius="full"
          className="hidden sm:block w-[200px] h-[200px] object-contain ml-6 "
        />
      </div>
    );
  }

  return <div>Nem vagy bejelentkezve.</div>;
}
