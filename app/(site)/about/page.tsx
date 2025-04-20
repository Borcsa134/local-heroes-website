import { Image } from '@heroui/image';
import { Metadata, ResolvingMetadata } from 'next';

import convertToOpenGraph from '@/app/utils/metadata';

interface Props {}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const openGraph = convertToOpenGraph((await parent).openGraph);

  return {
    title: 'Rólunk',
    openGraph: {
      ...openGraph,
      title: 'Rólunk',
    },
  };
}

export default function About() {
  return (
    <div>
      <h1 className="text-4xl text-center py-4">A körről pár szóban</h1>
      <div className="flex flex-row">
        <p className="pt-4 text-justify">
          A kör 1994-ben alakult a Budapesti Műszaki és Gazdaságtudományi Egyetem Villamosmérnöki karán. A kezdetekben
          néhány fővel rendelkező kör csak szerepjátékokkal foglalkozott, de mára már sokkal többet nyújt. A hét
          különböző napjain különféle programokra lehet csatlakozni, mint például a nyílt szerepjáték estek, Magic: The
          Gathering kártya estek (Magic Est). Az elmúlt évtizedben a kör létszáma jelentősen megnövekedett, közel 30
          aktív és megannyi külsős és öregtag alkotja.
        </p>
      </div>
      <div className="flex flex-row">
        <p className="pt-4 text-justify">
          Az egyetemi szorgalmi időszakban heti rendszerességgel tartunk nyílt szerepjáték esteket különféle világokban
          és rendszerekben. Ha érdekel a sci-fi vagy a fantasy világa, akkor biztosan találsz olyan csapatot, akikkel
          együtt játszhatsz. A kör tagjai rendszeresen játszanak a körön kívül is, és szívesen látják az újakat is.
          Discord szerverünkön kapcsolatba léphetsz a mesterekkel és a játékosokkal, és megtudhatod, hogy éppen milyen
          játékokat terveznek.
        </p>
        <Image removeWrapper src="/dnd.png" alt="lh-logo" className="hidden sm:block w-[150px] object-contain ml-6" />
      </div>
      <div className="flex flex-row">
        <Image removeWrapper src="/mtg.png" alt="lh-logo" className="hidden sm:block w-[150px] object-contain mr-6" />
        <p className="pt-4 text-justify">
          A Magic: The Gathering kártya esteken a kör tagjai rendszeresen játszanak egymással különféle formátumokban,
          legyen az Commander/EDH, Pauper vagy akár Artisan. A kör rendelkezik egy sajátos kártya kollekcióval, amelyet
          a tagok használhatnak. A kör tagjai szívesen tanítják meg a játékot azoknak, akik még nem ismerik, és szívesen
          segítenek a különböző paklik összeállításában. Havi rendszerességgel tartunk versenyeket, ahol szívesen látjuk
          a külsős játékosokat is. Ezekről az eseményekről a Discord szerverünkön értesülhetsz.
        </p>
      </div>
    </div>
  );
}
