import { OpenGraph, ResolvedOpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

export default function convertToOpenGraph(resolvedOpenGraph: ResolvedOpenGraph | null): OpenGraph {
  if (!resolvedOpenGraph) return {};
  return {
    title: resolvedOpenGraph.title,
    description: resolvedOpenGraph.description,
    url: resolvedOpenGraph.url || undefined,
    siteName: resolvedOpenGraph.siteName,
    images: resolvedOpenGraph.images,
    locale: resolvedOpenGraph.locale,
    type: 'website',
  };
}
