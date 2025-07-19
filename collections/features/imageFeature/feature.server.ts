import { createNode, createServerFeature } from '@payloadcms/richtext-lexical';

import { ImageNode } from './nodes/ImageNode';

export const ImageFeature = createServerFeature({
  feature: {
    i18n: {
      en: {
        label: 'Insert Image from URL',
      },
    },
    nodes: [
      createNode({
        node: ImageNode,
      }),
    ],
    ClientFeature: '@/collections/features/imageFeature/feature.client#ImageClientFeature',
  },
  key: 'ImageFeature',
});
