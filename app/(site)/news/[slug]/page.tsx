import { marked } from 'marked';
import { notFound } from 'next/navigation';
import { getDocumentBySlug, getDocumentSlugs } from 'outstatic/server';

interface Params {
  params: {
    slug: string;
  };
}

async function getData({ params }: Params) {
  const post = getDocumentBySlug('news', params.slug, [
    'title',
    'publishedAt',
    'slug',
    'author',
    'content',
    'coverImage',
  ]);

  if (!post) {
    notFound();
  }

  const content = await marked.parse(post.content || '');

  return {
    ...post,
    content,
  };
}

export default async function News(params: Params) {
  const news = await getData(params);
  const date = new Date(news.publishedAt);
  return (
    <div>
      <h1 className="text-4xl text-center py-4">{news.title}</h1>
      <p className="text-center">{date.toLocaleDateString('hu-HU')}</p>
      <div dangerouslySetInnerHTML={{ __html: news.content }} className="pt-4" />
    </div>
  );
}

export async function generateStaticParams() {
  const news = getDocumentSlugs('news');
  return news.map((slug) => ({ slug }));
}
