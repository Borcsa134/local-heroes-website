/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { getPayload } from 'payload';

import Breadcrumb from '@/app/components/breadCrumb';
import { LivePreview } from '@/app/components/livePreview';
import { RichText } from '@/app/components/richText';
import convertToOpenGraph from '@/app/utils/metadata';
import config from '@payload-config';

export async function generateMetadata({ params }, parent: ResolvingMetadata): Promise<Metadata> {
  const { slug } = await params;
  const event = await getData(slug);

  const openGraph = convertToOpenGraph((await parent).openGraph);

  return {
    title: event.title,
    openGraph: {
      ...openGraph,
      title: event.title,
    },
  };
}

async function getData(slug: string) {
  const payload = await getPayload({ config });
  const event = await payload
    .find({
      collection: 'events',
      where: { slug: { equals: slug } },
    })
    .then((res) => res.docs[0]);

  if (!event) {
    notFound();
  }

  return event;
}

export default async function Events({ params, searchParams }) {
  const { slug } = await params;
  const adminKey = (await searchParams)?.adminKey;

  const payload = await getPayload({ config });
  const isAdmin = adminKey === process.env.PAYLOAD_LIVE_PREVIEW_SECRET;

  const event = await payload
    .find({
      collection: 'events',
      where: { slug: { equals: slug } },
      overrideAccess: isAdmin,
      draft: isAdmin,
    })
    .then((res) => res.docs[0]);

  if (!event) {
    notFound();
  }

  const date = new Date(event.publishedAt);
  return (
    <div>
      {isAdmin && <LivePreview />}
      <Breadcrumb />
      <div
        className="flex flex-col w-full min-h-60 max-h-60 p-4 bg-content1 bg-cover bg-center rounded-xl"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(var(--starting-color)) 20%, rgba(var(--ending-color)) 100%), url(${event.coverImage})`,
        }}
      >
        <h1 className="text-left text-3xl sm:text-4xl pb-4">{event.title}</h1>
        <p className="text-left italic text-sm">
          {event.author} - {date.toLocaleDateString('hu-HU')}
        </p>
      </div>
      <RichText data={event.content} />
    </div>
  );
}
