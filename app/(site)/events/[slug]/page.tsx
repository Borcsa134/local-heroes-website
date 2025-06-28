/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { getPayload } from 'payload';

import Breadcrumb from '@/app/components/breadCrumb';
import { RichText } from '@/app/components/richText';
import convertToOpenGraph from '@/app/utils/metadata';
import config from '@payload-config';

export async function generateMetadata(props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params;
  const event = await getData(params);

  const openGraph = convertToOpenGraph((await parent).openGraph);

  return {
    title: event.title,
    openGraph: {
      ...openGraph,
      title: event.title,
    },
  };
}

async function getData(params) {
  const payload = await getPayload({ config });
  const newsObject = await payload.find({
    collection: 'events',
    where: { slug: { equals: params.slug } },
  });

  if (newsObject.docs.length === 0) {
    notFound();
  }

  return newsObject.docs[0];
}

export default async function Events(props) {
  const params = await props.params;
  const event = await getData(params);
  const date = new Date(event.publishedAt);
  return (
    <div>
      <Breadcrumb />
      <div
        className="flex flex-col w-full min-h-60 max-h-60 p-4"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(var(--starting-color)) 20%, rgba(var(--ending-color)) 100%), url(${event.coverImage && typeof event.coverImage == 'object' && event.coverImage.url})`,
          backgroundSize: 'cover',
          borderRadius: '6px',
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
