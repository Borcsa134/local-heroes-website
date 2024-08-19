import { OstDocument } from 'outstatic';
import { getDocuments } from 'outstatic/server';

import CalendarBadge from '@/components/calendarBadge';
import EventBadge from '@/components/eventBadge';

type Events = OstDocument<{
  [key: string]: unknown;
}>;

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
      <div className="flex flex-col md:flex-row justify-around">
        {regularEvents.map((event) => (
          <EventBadge key={event.slug} event={event} />
        ))}
      </div>
      <h1 className="text-4xl text-center py-4">Közelgő események</h1>
      <CalendarBadge events={otherEvents} />
    </div>
  );
}
