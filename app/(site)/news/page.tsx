import { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import { getDocuments } from 'outstatic/server';

import NewsBadge from '@/app/components/newsBadge';
import convertToOpenGraph from '@/app/utils/metadata';

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
  const news = getDocuments('news', ['title', 'slug', 'coverImage', 'publishedAt']);

  return news;
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
