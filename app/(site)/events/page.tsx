/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { getPayload } from 'payload';

import CalendarBadge from '@/app/components/calendarBadge';
import EventBadge from '@/app/components/eventBadge';
import convertToOpenGraph from '@/app/utils/metadata';
import { Event } from '@/payload-types';
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
    where: { publishedAt: { not_equals: null } },
  });

  if (newsObject.docs.length === 0) {
    notFound();
  }

  return newsObject.docs;
}

async function getRegularEvents(events: Event[]) {
  return events.filter((event) => event.regularEvent === true);
}

async function getOtherEvents(events: Event[]) {
  return events.filter((event) => event.regularEvent === false);
}

export default async function Events() {
  const events = await getData();
  const regularEvents = await getRegularEvents(events);
  const otherEvents = await getOtherEvents(events);

  return (
    <div>
      <h1 className="text-4xl text-center py-4">Állandó események</h1>
      <div className="mb-4 flex flex-col md:flex-row justify-around">
        {regularEvents.map((event) => (
          <EventBadge key={event.slug} event={event} />
        ))}
      </div>
      <h1 className="text-4xl text-center py-4">Közelgő események</h1>
      <CalendarBadge events={otherEvents} />
    </div>
  );
}
