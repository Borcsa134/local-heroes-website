/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { getPayload } from 'payload';

import CalendarBadge from '@/app/components/calendarBadge';
import convertToOpenGraph from '@/app/utils/metadata';
import { statusIsPublished } from '@/collections/utils/queries';
import config from '@payload-config';

interface Props {}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const openGraph = convertToOpenGraph((await parent).openGraph);

  return {
    title: 'Események',
    openGraph: {
      ...openGraph,
      title: 'Események',
    },
  };
}

async function getData() {
  const payload = await getPayload({ config });
  const newsObject = await payload.find({
    collection: 'events',
    where: statusIsPublished,
    sort: '-publishedAt',
  });

  if (newsObject.docs.length === 0) {
    notFound();
  }

  return newsObject.docs;
}

export default async function Events() {
  const events = await getData();

  return (
    <div>
      <h1 className="text-4xl text-center py-4">Közelgő események</h1>
      <CalendarBadge events={events} />
    </div>
  );
}
