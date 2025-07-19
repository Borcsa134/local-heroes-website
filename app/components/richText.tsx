import { DefaultNodeTypes } from '@payloadcms/richtext-lexical';
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { JSXConvertersFunction, RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react';
import { HTMLAttributes } from 'react';

import ImageComponent from '@/collections/features/imageFeature/nodes/ImageComponent';
import { SerializedImageNode } from '@/collections/features/imageFeature/nodes/ImageNode';

type NodeTypes = DefaultNodeTypes | SerializedImageNode;

type Props = {
  data: SerializedEditorState;
} & HTMLAttributes<HTMLDivElement>;

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  image: ({ node }) => {
    const { height, width, altText, src } = node;
    const _height = height;
    const _width = width;
    return (
      <span>
        <ImageComponent src={src} altText={altText} width="inherit" height="inherit" nodeKey="image" />
      </span>
    );
  },
});

export function RichText(props: Props) {
  const { className, ...rest } = props;

  return (
    <RichTextConverter
      converters={jsxConverters}
      {...rest}
      className={`prose dark:prose-invert max-w-full prose-h1:font-bold ${className ?? ''}`}
    />
  );
}
