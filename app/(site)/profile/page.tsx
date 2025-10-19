import { Image } from '@heroui/image';
import { DiscordUsers } from '@prisma/client';

import ProfileForm from '@/app/components/profileForm';
import { upsertUser } from '@/app/components/upsertUser';
import { auth } from '@/auth';
import db from '@/lib/prisma';

async function insertUser(user: DiscordUsers) {
  const formData = new FormData();
  formData.append('username', user.username);
  formData.append('email', user.email);
  formData.append('fullname', user.fullname);
  await upsertUser(null, formData);
}

async function isLocalHeroesServerMember(session) {
  const lhServerProfile = await fetch('https://discord.com/api/users/@me/guilds/444497157995888640/member', {
    headers: { Authorization: `Bearer ${session?.accessToken}` },
  });
  return lhServerProfile.status == 200 ? true : false;
}

export default async function Profile() {
  const session = await auth();
  let user = null;

  if (session?.user?.name && session.user.email) {
    user = await db.discordUsers.findFirst({ where: { email: session.user.email } });

    if (!user && (await isLocalHeroesServerMember(session))) {
      user = {
        username: session.user.name,
        email: session.user.email,
        fullname: '',
      };
      await insertUser(user as DiscordUsers);
    }
  }

  return (
    <div>
      <h1 className="text-4xl text-center py-4">Profil</h1>
      {user && (
        <div className="flex flex-col items-center sm:flex-row sm:justify-between px-10">
          <Image
            removeWrapper
            src={session.user.image as string}
            alt="discord-image"
            radius="full"
            className="w-[200px] h-[200px] object-contain mb-6 sm:mr-6 "
          />
          <ProfileForm username={user.username} email={user.email} fullname={user.fullname} />
        </div>
      )}
      {!user && session && (
        <div className="">
          <p className="italic text-center text-gray-500">Nem vagy tagja a Local Heroes Discord szervernek.</p>
        </div>
      )}
      {!user && !session && (
        <div className="">
          <p className="italic text-center text-gray-500">Nem vagy bejelentkezve.</p>
        </div>
      )}
    </div>
  );
}
