import { Image } from '@heroui/image';

import ProfileForm from '@/app/components/profileForm';
import { auth } from '@/auth';
import db from '@/lib/prisma';

export default async function Profile() {
  const session = await auth();

  if (session?.user?.name && session.user.email) {
    const user = await db.discordUsers.findFirst({ where: { email: session.user.email } });
    if (user?.username && user?.email) {
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
    } else {
      return (
        <div className="flex justify-between px-10">
          <ProfileForm username={session.user.name} email={session.user.email} fullname="" />
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
  }
  return <div>Nem vagy bejelentkezve.</div>;
}
