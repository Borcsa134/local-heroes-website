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
  const post = await getData(params);
  return (
    <div>
      <h1 className="text-4xl text-center py-4">{post.title}</h1>
      <p className="text-center">{post.publishedAt}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} className="pt-4" />
    </div>
  );
}

export async function generateStaticParams() {
  const news = getDocumentSlugs('news');
  return news.map((slug) => ({ slug }));
}
