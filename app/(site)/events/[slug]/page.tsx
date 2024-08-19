import { marked } from 'marked';
import { notFound } from 'next/navigation';
import { getDocumentBySlug, getDocumentSlugs } from 'outstatic/server';

interface Params {
  params: {
    slug: string;
  };
}

async function getData({ params }: Params) {
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

export default async function Events(params: Params) {
  const event = await getData(params);
  const date = new Date(event.publishedAt);
  return (
    <div>
      <div
        className="flex flex-col w-100 min-h-60 max-h-60"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,1) 20%, rgba(255,255,255,0) 100%), url(${event.coverImage})`,
          backgroundSize: 'cover',
          borderRadius: '6px',
        }}
      >
        <h1 className="text-left text-3xl sm:text-4xl py-4">{event.title}</h1>
        <p className="text-left italic text-sm">
          {event.author!.name} - {date.toLocaleDateString('hu-HU')}
        </p>
      </div>
      <div dangerouslySetInnerHTML={{ __html: event.content }} className="pt-4" />
    </div>
  );
}

export async function generateStaticParams() {
  const event = getDocumentSlugs('news');
  return event.map((slug) => ({ slug }));
}
