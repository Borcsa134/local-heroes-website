import { marked } from 'marked';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { getDocumentBySlug, getDocumentSlugs } from 'outstatic/server';

import Breadcrumb from '@/app/components/breadCrumb';
import convertToOpenGraph from '@/app/utils/metadata';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(params: Props, parent: ResolvingMetadata): Promise<Metadata> {
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

async function getData({ params }: Props) {
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

  const content = (await marked.parse(post.content || '')).replaceAll('\<a', '\<a target="_blank"');

  return {
    ...post,
    content,
  };
}

export default async function News(params: Props) {
  const news = await getData(params);
  const date = new Date(news.publishedAt);
  return (
    <div>
      <Breadcrumb />
      <h1 className="text-4xl text-center py-4">{news.title}</h1>
      <p className="text-center">{date.toLocaleDateString('hu-HU')}</p>
      <div dangerouslySetInnerHTML={{ __html: news.content }} className="pt-4 marked" />
    </div>
  );
}

export async function generateStaticParams() {
  const news = getDocumentSlugs('news');
  return news.map((slug) => ({ slug }));
}
