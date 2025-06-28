import { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPayload } from 'payload';

import NewsBadge from '@/app/components/newsBadge';
import convertToOpenGraph from '@/app/utils/metadata';
import { statusIsPublished } from '@/collections/utils/queries';
import config from '@payload-config';

interface Props {}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const openGraph = convertToOpenGraph((await parent).openGraph);

  return {
    title: 'Hírek',
    openGraph: {
      ...openGraph,
      title: 'Hírek',
    },
  };
}

async function getData() {
  const payload = await getPayload({ config });
  const newsObject = await payload.find({
    collection: 'news',
    where: statusIsPublished,
  });

  if (newsObject.docs.length === 0) {
    notFound();
  }

  return newsObject.docs;
}

export default async function News() {
  const newsList = await getData();
  return (
    <div className="lg:w-[990px]">
      <h1 className="text-4xl text-center py-4">Hírek</h1>
      <ul className="space-y-4">
        {newsList.map((news) => (
          <li key={news.slug}>
            <Link href={'/news/' + news.slug} className="w-100">
              <NewsBadge news={news} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
