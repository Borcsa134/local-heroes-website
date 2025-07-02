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
  const news = await getData(slug);

  const openGraph = convertToOpenGraph((await parent).openGraph);

  return {
    title: news.title,
    openGraph: {
      ...openGraph,
      title: news.title,
    },
  };
}

async function getData(slug: string) {
  const payload = await getPayload({ config });
  const news = await payload
    .find({
      collection: 'news',
      where: { slug: { equals: slug } },
    })
    .then((res) => res.docs[0]);

  if (!news) {
    notFound();
  }

  return news;
}

export default async function News({ params, searchParams }) {
  const { slug } = await params;
  const adminKey = (await searchParams)?.adminKey;

  const payload = await getPayload({ config });
  const isAdmin = adminKey === process.env.PAYLOAD_LIVE_PREVIEW_SECRET;

  const news = await payload
    .find({
      collection: 'news',
      where: {
        slug: { equals: slug },
      },
      overrideAccess: isAdmin,
      draft: isAdmin,
    })
    .then((res) => res.docs[0]);

  if (!news) {
    notFound();
  }

  const date = new Date(news.publishedAt);

  return (
    <div>
      {isAdmin && <LivePreview />}
      <Breadcrumb />
      <h1 className="text-4xl text-center font-bold py-4">{news.title}</h1>
      <p className="text-center italic text-sm pb-4">
        {news.author} - {date.toLocaleDateString('hu-HU')}
      </p>
      <RichText data={news.content} />
    </div>
  );
}
