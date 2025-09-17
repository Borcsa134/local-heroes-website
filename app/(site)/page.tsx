import Image from 'next/image';

import DiscordWidget from '@/app/components/discordWidget';

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl text-center py-4">Üdvözlünk megújult honlapunkon!</h1>
      <div className="flex flex-col md:flex-row items-center md:justify-around pt-4">
        <Image src="/images/lh30.png" alt="Hero image" width={400} height={400} className="mb-5 md:mb-0" />
        <DiscordWidget />
      </div>
    </div>
  );
}
