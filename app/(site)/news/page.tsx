import Link from 'next/link';
import { getDocuments } from 'outstatic/server';

import NewsBadge from '@/components/newsBadge';

export default async function News() {
  const newsList = await getData();
  return (
    <div className="lg:w-[990px]">
      <h1 className="text-4xl text-center py-4">Hírek</h1>
      <ul>
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

async function getData() {
  const news = getDocuments('news', ['title', 'slug', 'coverImage', 'publishedAt']);

  return news;
}
