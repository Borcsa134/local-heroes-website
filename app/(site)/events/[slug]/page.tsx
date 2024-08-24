import { marked } from 'marked';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { getDocumentBySlug, getDocumentSlugs } from 'outstatic/server';

import Breadrumb from '@/app/components/breadCrumb';
import convertToOpenGraph from '@/app/utils/metadata';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(params: Props, parent: ResolvingMetadata): Promise<Metadata> {
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

async function getData({ params }: Props) {
  const post = getDocumentBySlug('events', params.slug, [
    'title',
    'content',
    'slug',
    'coverImage',
    'publishedAt',
    'discordChannel',
    'regularEvent',
    'author',
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

export default async function Events(params: Props) {
  const event = await getData(params);
  const date = new Date(event.publishedAt);
  return (
    <div>
      <Breadrumb />
      <div
        className="flex flex-col w-100 min-h-60 max-h-60 p-4"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(var(--starting-color)) 20%, rgba(var(--ending-color)) 100%), url(${event.coverImage})`,
          backgroundSize: 'cover',
          borderRadius: '6px',
        }}
      >
        <h1 className="text-left text-3xl sm:text-4xl pb-4">{event.title}</h1>
        <p className="text-left italic text-sm">
          {event.author!.name} - {date.toLocaleDateString('hu-HU')}
        </p>
      </div>
      <div dangerouslySetInnerHTML={{ __html: event.content }} className="pt-4 marked" />
    </div>
  );
}

export async function generateStaticParams() {
  const event = getDocumentSlugs('events');
  return event.map((slug) => ({ slug }));
}
