'use client';

import { createClientFeature, toolbarFeatureButtonsGroupWithItems } from '@payloadcms/richtext-lexical/client';
import { $isNodeSelection } from '@payloadcms/richtext-lexical/lexical';

import { ImageIcon } from './nodes/ImageIcon';
import { $isImageNode, ImageNode } from './nodes/ImageNode';
import { ImagesPlugin, OPEN_IMAGE_MODAL_COMMAND } from './plugins/plugin';

export const ImageClientFeature = createClientFeature({
  nodes: [ImageNode],
  plugins: [{ Component: ImagesPlugin, position: 'normal' }],
  toolbarFixed: {
    groups: [
      toolbarFeatureButtonsGroupWithItems([
        {
          ChildComponent: ImageIcon,
          isActive: ({ selection }) => {
            if (!$isNodeSelection(selection) || !selection.getNodes().length) {
              return false;
            }

            const firstNode = selection.getNodes()[0];
            return $isImageNode(firstNode);
          },
          key: 'ImageNode',
          label: ({ i18n }) => {
            return i18n.t('lexical:ImageFeature:label');
          },
          onSelect: ({ editor }) => {
            editor.dispatchCommand(OPEN_IMAGE_MODAL_COMMAND, null);
          },
        },
      ]),
    ],
  },
});
