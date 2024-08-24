import { Metadata, ResolvingMetadata } from 'next';

import convertToOpenGraph from '@/app/utils/metadata';

interface Props {}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const openGraph = convertToOpenGraph((await parent).openGraph);

  return {
    title: 'Magic: The Gathering',
    openGraph: {
      ...openGraph,
      title: 'Magic: The Gathering',
    },
  };
}

export default function MagicTheGathering() {
  return (
    <div className="lg:w-[990px]">
      <h1 className="text-4xl text-center py-4">Magic: The Gathering</h1>
      <div className="">
        <p className="italic text-center text-gray-500">Oldal fejlesztés alatt, látogass vissza később!</p>
      </div>
    </div>
  );
}
