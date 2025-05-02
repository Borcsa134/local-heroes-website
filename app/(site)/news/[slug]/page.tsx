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
  const news = await getData(params);

  const openGraph = convertToOpenGraph((await parent).openGraph);

  return {
    title: news.title,
    openGraph: {
      ...openGraph,
      title: news.title,
    },
  };
}

async function getData(params) {
  const payload = await getPayload({ config });
  const newsObject = await payload.find({
    collection: 'news',
    where: { slug: { equals: params.slug } },
  });

  if (newsObject.docs.length === 0) {
    notFound();
  }

  return newsObject.docs[0];
}

export default async function News(props) {
  const params = await props.params;
  const news = await getData(params);
  const date = new Date(news.publishedAt);
  return (
    <div>
      <Breadcrumb />
      <h1 className="text-4xl text-center py-4">{news.title}</h1>
      <p className="text-center">{date.toLocaleDateString('hu-HU')}</p>
      <RichText data={news.content} />
    </div>
  );
}
