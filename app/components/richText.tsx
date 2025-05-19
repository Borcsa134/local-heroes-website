import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react';
import { HTMLAttributes } from 'react';

type Props = {
  data: SerializedEditorState;
} & HTMLAttributes<HTMLDivElement>;

export function RichText(props: Props) {
  const { className, ...rest } = props;

  return <RichTextConverter {...rest} className={`prose dark:prose-invert ${className}`} />;
}
