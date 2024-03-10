import NewsBadge from '@/components/newsBadge';
import Link from 'next/link';
import { getDocuments } from 'outstatic/server';

export default async function News() {
  const newsList = await getData();
  return (
    <div>
      <h1 className="text-4xl text-center py-4">Hírek</h1>
      <ul>
        {newsList.map((news) => (
          <li key={news.slug}>
            <Link href={'/news/' + news.slug} className="w-100">
              <NewsBadge {...news} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

async function getData() {
  const news = getDocuments('news', ['title', 'slug', 'coverImage', 'content']);

  return news;
}
