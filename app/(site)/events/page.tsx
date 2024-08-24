import { Metadata, ResolvingMetadata } from 'next';
import { OstDocument } from 'outstatic';
import { getDocuments } from 'outstatic/server';

import CalendarBadge from '@/app/components/calendarBadge';
import EventBadge from '@/app/components/eventBadge';
import convertToOpenGraph from '@/app/utils/metadata';

type Events = OstDocument<{
  [key: string]: unknown;
}>;

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
  const events = getDocuments('events', [
    'title',
    'content',
    'slug',
    'coverImage',
    'publishedAt',
    'discordChannel',
    'regularEvent',
    'eventDate',
  ]);

  return events;
}

async function getRegularEvents(events: Events[]) {
  return events.filter((event) => event.regularEvent === 'true');
}

async function getOtherEvents(events: Events[]) {
  return events.filter((event) => event.regularEvent === '' || event.regularEvent === 'false');
}

export default async function Events() {
  const events = await getData();
  const regularEvents = await getRegularEvents(events);
  const otherEvents = await getOtherEvents(events);

  return (
    <div className="lg:w-[990px]">
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
