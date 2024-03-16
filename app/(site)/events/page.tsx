import { getDocuments } from 'outstatic/server';

import EventBadge from '@/components/eventBadge';

async function getData() {
  const events = getDocuments('events', ['title', 'content', 'slug', 'coverImage', 'publishedAt', 'discordChannel']);

  return events;
}

async function getRegularEvents() {
  const events = await getData();
  return events.filter((event) => event.slug.includes('allando'));
}

export default async function Events() {
  const regularEvents = await getRegularEvents();
  return (
    <div className="lg:w-[990px]">
      <h1 className="text-4xl text-center py-4">Állandó események</h1>
      <div className="flex flex-col md:flex-row justify-around">
        {regularEvents.map((event) => (
          <EventBadge key={event.slug} event={event} />
        ))}
      </div>
    </div>
  );
}
